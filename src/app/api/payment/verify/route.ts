import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { z } from "zod";
import { paystackService } from "@/lib/paystack/paystack";
import { EnrollmentStatus, PaymentMethod, PaymentStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const verifySchema = z.object({
  reference: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reference } = verifySchema.parse(body);

    // Find existing payment by reference
    // Temporary cast to unknown to avoid Prisma type mismatch until migrations are applied
    const payment = (await prisma.payment.findUnique({
      where: { reference },
      include: {
        enrollment: {
          select: {
            id: true,
            agreedFeeMinor: true,
            feeCurrency: true,
            amountPaidMinor: true,
            course: true,
          },
        },
      },
    })) as unknown as {
      id: string;
      enrollmentId: string;
      amountMinor: number;
      currency: string;
      metadata: unknown;
      status: PaymentStatus;
      paystackAuth: string | null;
      enrollment: {
        id: string;
        agreedFeeMinor: number | null;
        feeCurrency: string | null;
        amountPaidMinor: number;
        course: { amount?: unknown; currency?: string | null } | null;
      };
    };

    if (!payment) {
      return NextResponse.json(
        { success: false, message: "Payment not found" },
        { status: 404 }
      );
    }

    // Verify with Paystack
    const verification = await paystackService.verifyTransaction(reference);
    const data = verification?.data;
    if (!verification?.status || !data) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: PaymentStatus.FAILED },
      });
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Map Paystack status to our PaymentStatus
    const newPaymentStatus: PaymentStatus =
      data.status === "success"
        ? PaymentStatus.SUCCESS
        : data.status === "failed"
          ? PaymentStatus.FAILED
          : PaymentStatus.PENDING;

    // Derive method from channel
    const method: PaymentMethod = (() => {
      const ch = (data.channel || "").toLowerCase();
      if (ch.includes("mobile")) return PaymentMethod.MOBILE_MONEY;
      if (ch.includes("bank")) return PaymentMethod.BANK_TRANSFER;
      if (ch.includes("card")) return PaymentMethod.OTHER; // or add CARD if you extend enum
      return PaymentMethod.OTHER;
    })();

    // Update payment
    const prevMeta = (payment.metadata ?? {}) as Record<string, unknown>;
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: newPaymentStatus,
        currency: data.currency || payment.currency,
        method,
        paystackTrxId: String(data.id),
        paystackAuth:
          data.authorization?.authorization_code || payment.paystackAuth,
        metadata: {
          ...prevMeta,
          verification: data,
        },
      },
    });

    // Update enrollment running totals and status
    const enrollmentId = payment.enrollmentId;
    const currentPaid = payment.enrollment.amountPaidMinor || 0;
    const agreedFeeMinor =
      typeof payment.enrollment.agreedFeeMinor === "number" &&
      payment.enrollment.agreedFeeMinor > 0
        ? payment.enrollment.agreedFeeMinor
        : payment.enrollment.course?.amount
          ? paystackService.convertToPesewas(
              Number(payment.enrollment.course.amount as unknown as number)
            )
          : payment.amountMinor || 0;

    const increment =
      newPaymentStatus === PaymentStatus.SUCCESS ? payment.amountMinor || 0 : 0;
    const newTotalPaid = currentPaid + increment;
    const fullyPaid = newTotalPaid >= agreedFeeMinor;

    await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        amountPaidMinor: newTotalPaid,
        agreedFeeMinor: payment.enrollment.agreedFeeMinor ?? agreedFeeMinor,
        feeCurrency:
          payment.enrollment.feeCurrency ??
          (payment.enrollment.course?.currency || updatedPayment.currency),
        status: fullyPaid
          ? EnrollmentStatus.PAID
          : EnrollmentStatus.PARTIALLY_PAID,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        paymentId: updatedPayment.id,
        status: updatedPayment.status,
        totalPaidMinor: newTotalPaid,
        agreedFeeMinor,
        enrollmentStatus: fullyPaid
          ? EnrollmentStatus.PAID
          : EnrollmentStatus.PARTIALLY_PAID,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }
    console.error("/api/payment/verify error", error);
    return NextResponse.json(
      { success: false, message: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
