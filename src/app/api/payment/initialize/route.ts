/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { z } from "zod";
import { paystackService } from "@/lib/paystack/paystack";
import { EnrollmentStatus, PaymentStatus, PaymentMethod } from "@prisma/client";

export const dynamic = "force-dynamic";

const initializePaymentSchema = z.object({
  enrollmentId: z.string().min(1),
  callbackUrl: z.string().url().optional(),
  amountMinor: z.number().int().positive().optional(),
  // Optional convenience: allow providing amount in major units (cedis)
  amountMajor: z.number().positive().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      enrollmentId,
      callbackUrl,
      amountMinor: amountMinorOverride,
      amountMajor,
    } = initializePaymentSchema.parse(body);

    // Load enrollment with user and course to determine amount and email
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      select: {
        id: true,
        userId: true,
        program: true,
        cohort: true,
        status: true,
        courseId: true,
        user: { select: { email: true } },
        payments: { select: { amountMinor: true, status: true } },
        agreedFeeMinor: true,
        feeCurrency: true,
        amountPaidMinor: true,
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { success: false, message: "Enrollment not found" },
        { status: 404 }
      );
    }

    // Fetch course to derive course-based pricing and currency
    const course = await prisma.course.findUnique({
      where: { id: enrollment.courseId },
    });
    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found for enrollment" },
        { status: 404 }
      );
    }

    if (enrollment.status === EnrollmentStatus.PAID) {
      return NextResponse.json(
        { success: false, message: "Enrollment already paid" },
        { status: 400 }
      );
    }

    const email = enrollment.user.email;
    if (!email) {
      return NextResponse.json(
        { success: false, message: "User email is required for payment" },
        { status: 400 }
      );
    }

    // Determine agreed fee for this enrollment: snapshot course.priceMinor unless already set on enrollment
    const agreedFeeMinor =
      typeof enrollment.agreedFeeMinor === "number" &&
      enrollment.agreedFeeMinor > 0
        ? enrollment.agreedFeeMinor
        : typeof course.priceMinor === "number" && course.priceMinor > 0
        ? course.priceMinor
        : amountMinorOverride;

    if (!agreedFeeMinor) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No course price configured. Provide amountMinor in request to initialize payment.",
        },
        { status: 400 }
      );
    }

    const currency = enrollment.feeCurrency || course.currency || "GHS";

    // Use provided amount to initialize this payment (installment or full)
    // Prefer amountMajor if provided, else amountMinorOverride; fallback to agreedFeeMinor
    let amountMinor = agreedFeeMinor;
    let conversionNote: string | undefined;

    if (typeof amountMajor === "number") {
      amountMinor = paystackService.convertToPesewas(amountMajor);
      conversionNote = "converted_from_major_units";
    } else if (typeof amountMinorOverride === "number") {
      // Heuristic: if provided amount looks like major units (e.g., 500 intended as GHS 500)
      // and multiplying by 100 aligns with or is below the agreed fee, convert to pesewas.
      const looksLikeMajor =
        amountMinorOverride < 10000 && // < GHS 100
        agreedFeeMinor >= 10000 && // course fee >= GHS 100
        amountMinorOverride * 100 <= agreedFeeMinor * 1.01; // within tolerance
      if (looksLikeMajor) {
        amountMinor = amountMinorOverride * 100;
        conversionNote = "heuristic_major_to_minor_conversion";
      } else {
        amountMinor = amountMinorOverride;
      }
    }

    // Calculate whether this is an installment (amount less than remaining balance)
    const alreadyPaidMinor = enrollment.amountPaidMinor || 0;
    const dueMinor = Math.max(agreedFeeMinor - alreadyPaidMinor, 0);
    const isInstallment = amountMinor < dueMinor;

    // Generate a unique reference
    const reference = paystackService.generateReference("GSA");

    // Initialize Paystack transaction; Paystack expects minor units (pesewas) for GHS
    const initRes = await paystackService.initializeTransaction({
      email,
      amount: amountMinor,
      reference,
      callback_url: callbackUrl,
      metadata: {
        enrollmentId: enrollment.id,
        userId: enrollment.userId,
        courseId: enrollment.courseId,
        program: enrollment.program,
        cohort: enrollment.cohort,
        currency,
      },
    });

    // Create payment record with INITIATED/PENDING status and store Paystack details in metadata
    const payment = await prisma.payment.create({
      data: {
        enrollmentId: enrollment.id,
        reference,
        amountMinor,
        currency,
        // Use MOBILE_MONEY as method for Ghana; refine on verify using channel
        method: PaymentMethod.MOBILE_MONEY,
        status: PaymentStatus.INITIATED,
        isInstallment,
        metadata: {
          access_code: initRes.data.access_code,
          authorization_url: initRes.data.authorization_url,
          installment: {
            isInstallment,
            agreedFeeMinor,
            alreadyPaidMinor,
            dueMinor,
          },
          request: {
            amountMajor: amountMajor ?? null,
            amountMinorProvided: amountMinorOverride ?? null,
            conversion: conversionNote ?? "none",
          },
        },
      },
    });

    // Move enrollment to awaiting verification so we know a transaction is in-flight
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        status: EnrollmentStatus.AWAITING_VERIFICATION,
        agreedFeeMinor: enrollment.agreedFeeMinor ?? agreedFeeMinor,
        feeCurrency: enrollment.feeCurrency ?? currency,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        authorization_url: initRes.data.authorization_url,
        access_code: initRes.data.access_code,
        reference,
        paymentId: payment.id,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }
    console.error("/api/payment/initialize error", error);
    return NextResponse.json(
      { success: false, message: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
