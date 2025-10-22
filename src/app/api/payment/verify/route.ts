import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { z } from "zod";
import { paystackService } from "@/lib/paystack/paystack";
import { EnrollmentStatus, PaymentMethod, PaymentStatus } from "@prisma/client";
import { emailService } from "@/services/email/email-service";
import { smsService } from "@/services/sms/sms-service";

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
            user: { select: { email: true, fullName: true, phone: true } },
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
        course: {
          amount?: unknown;
          currency?: string | null;
          name?: string | null;
        } | null;
        user: {
          email: string | null;
          fullName: string | null;
          phone: string | null;
        } | null;
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

    // Send notifications only when transitioning to SUCCESS (avoid duplicates)
    if (
      newPaymentStatus === PaymentStatus.SUCCESS &&
      payment.status !== PaymentStatus.SUCCESS
    ) {
      try {
        const email = payment.enrollment.user?.email ?? null;
        const fullName = payment.enrollment.user?.fullName ?? undefined;
        const phone = payment.enrollment.user?.phone ?? null;
        const currency = updatedPayment.currency || payment.currency || "GHS";
        const courseName = payment.enrollment.course?.name || "your course";

        const paidMajor = (payment.amountMinor || 0) / 100;
        const agreedMajor = agreedFeeMinor / 100;
        const newTotalPaidMajor = newTotalPaid / 100;
        const remainingMajor = Math.max(agreedMajor - newTotalPaidMajor, 0);

        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #111827;">Payment Successful</h2>
            <p>Hello ${fullName || email || "there"},</p>
            <p>Your payment for <strong>${courseName}</strong> was successful.</p>
            <ul>
              <li>Amount paid: <strong>${currency} ${paidMajor.toLocaleString()}</strong></li>
              <li>Total paid so far: <strong>${currency} ${newTotalPaidMajor.toLocaleString()}</strong></li>
              <li>Total agreed fee: <strong>${currency} ${agreedMajor.toLocaleString()}</strong></li>
              <li>Remaining balance: <strong>${currency} ${remainingMajor.toLocaleString()}</strong></li>
            </ul>
            <p>${remainingMajor > 0 ? "You can complete your remaining balance anytime from your dashboard." : "Your enrollment is now fully paid. Thank you!"}</p>
            <p>— Gree Software Academy</p>
          </div>
        `;

        if (email) {
          await emailService
            .sendEmail({
              to: email,
              subject: "Gree Software Academy - Payment Successful",
              html,
              text: `Payment successful. Paid: ${currency} ${paidMajor}. Total: ${currency} ${newTotalPaidMajor}. Remaining: ${currency} ${remainingMajor}.`,
            })
            .catch(() => {});
        }

        if (phone) {
          const to = smsService.formatPhoneNumber(phone);
          const msg = `GSA Payment Successful: Paid ${currency} ${paidMajor}. Total ${newTotalPaidMajor}. Remaining ${remainingMajor}.`;
          await smsService.sendSMS({ to, message: msg }).catch(() => {});
        }
      } catch (notifyErr) {
        console.error("Payment notifications failed", notifyErr);
      }
    }

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
