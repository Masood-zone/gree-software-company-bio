import { EnrollmentStatus, PaymentMethod, PaymentStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAuthenticatedUser } from "@/lib/auth/guards";
import { prisma } from "@/lib/database/prisma";
import { paystackService } from "@/lib/paystack/paystack";
import {
  majorToMinor,
  normalizeCurrency,
  resolvePaymentCallbackUrl,
} from "@/lib/security/payment-integrity";

export const dynamic = "force-dynamic";

const initializePaymentSchema = z
  .object({
    enrollmentId: z.string().trim().min(1).max(100),
    amountMajor: z.number().finite().positive().max(1_000_000).optional(),
    callbackUrl: z.string().url().max(2_048).optional(),
    // Accepted during the client migration, but never trusted for ownership.
    userId: z.string().trim().min(1).max(100).optional(),
  })
  .strict();

const paystackInitializeResponseSchema = z.object({
  status: z.literal(true),
  data: z.object({
    authorization_url: z.string().url(),
    reference: z.string().min(1),
  }),
});

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  try {
    const currentUser = await requireAuthenticatedUser(request);
    if (!currentUser) {
      return json({ success: false, message: "Authentication required" }, 401);
    }

    const input = initializePaymentSchema.parse(await request.json());
    const callbackUrl = resolvePaymentCallbackUrl(
      request.url,
      input.callbackUrl
    );

    const enrollment = await prisma.enrollment.findFirst({
      where: { id: input.enrollmentId, userId: currentUser.id },
      select: {
        id: true,
        userId: true,
        program: true,
        cohort: true,
        courseId: true,
        status: true,
        agreedFeeMinor: true,
        feeCurrency: true,
        amountPaidMinor: true,
        user: { select: { email: true } },
        course: {
          select: { amount: true, currency: true, active: true },
        },
      },
    });

    // A scoped lookup avoids revealing another user's enrollment identifiers.
    if (!enrollment) {
      return json({ success: false, message: "Enrollment not found" }, 404);
    }

    if (enrollment.status === EnrollmentStatus.PAID) {
      return json({ success: false, message: "Enrollment already paid" }, 409);
    }

    if (!enrollment.course.active) {
      return json({ success: false, message: "Course is not active" }, 409);
    }

    const configuredFeeMinor = enrollment.course.amount
      ? majorToMinor(Number(enrollment.course.amount))
      : undefined;
    const agreedFeeMinor = enrollment.agreedFeeMinor ?? configuredFeeMinor;

    if (!agreedFeeMinor || agreedFeeMinor <= 0) {
      return json(
        { success: false, message: "Course price is not configured" },
        409
      );
    }

    const currency = normalizeCurrency(
      enrollment.feeCurrency ?? enrollment.course.currency
    );
    const dueMinor = agreedFeeMinor - enrollment.amountPaidMinor;
    if (dueMinor <= 0) {
      return json({ success: false, message: "Enrollment already paid" }, 409);
    }

    const amountMinor = input.amountMajor
      ? majorToMinor(input.amountMajor)
      : dueMinor;
    if (amountMinor > dueMinor) {
      return json(
        { success: false, message: "Payment exceeds the remaining balance" },
        400
      );
    }

    const reference = paystackService.generateReference("GSA");
    const providerResult = paystackInitializeResponseSchema.safeParse(
      await paystackService.initializeTransaction({
        email: enrollment.user.email,
        amount: amountMinor,
        currency,
        reference,
        callback_url: callbackUrl,
        metadata: {
          enrollmentId: enrollment.id,
          courseId: enrollment.courseId,
        },
      })
    );
    if (!providerResult.success) {
      throw new Error("Paystack returned an invalid initialization response");
    }
    const providerResponse = providerResult.data;

    if (providerResponse.data.reference !== reference) {
      throw new Error("Paystack returned a different payment reference");
    }

    const payment = await prisma.$transaction(async (transaction) => {
      const createdPayment = await transaction.payment.create({
        data: {
          enrollmentId: enrollment.id,
          reference,
          amountMinor,
          currency,
          method: PaymentMethod.MOBILE_MONEY,
          status: PaymentStatus.INITIATED,
          isInstallment: amountMinor < dueMinor,
          metadata: {
            initializedAt: new Date().toISOString(),
            expectedAmountMinor: amountMinor,
            expectedCurrency: currency,
          },
        },
        select: { id: true },
      });

      await transaction.enrollment.update({
        where: { id: enrollment.id },
        data: {
          status: EnrollmentStatus.AWAITING_VERIFICATION,
          agreedFeeMinor,
          feeCurrency: currency,
        },
      });

      return createdPayment;
    });

    return json({
      success: true,
      data: {
        authorization_url: providerResponse.data.authorization_url,
        reference,
        paymentId: payment.id,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof SyntaxError) {
      return json({ success: false, message: "Invalid payment request" }, 400);
    }

    if (
      error instanceof Error &&
      (error.message === "Callback URL is not allowed" ||
        error.message.includes("Payment amount") ||
        error.message === "Invalid payment currency")
    ) {
      return json({ success: false, message: error.message }, 400);
    }

    console.error("/api/payment/initialize error", error);
    return json(
      { success: false, message: "Failed to initialize payment" },
      502
    );
  }
}
