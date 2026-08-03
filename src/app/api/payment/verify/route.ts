import {
  EnrollmentStatus,
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAuthenticatedUser } from "@/lib/auth/guards";
import { prisma } from "@/lib/database/prisma";
import { paystackService } from "@/lib/paystack/paystack";
import {
  majorToMinor,
  normalizeCurrency,
  paymentReferenceSchema,
  providerPaymentMatchesExpected,
} from "@/lib/security/payment-integrity";
import { emailService } from "@/services/email/email-service";
import { smsService } from "@/services/sms/sms-service";

export const dynamic = "force-dynamic";

const verifySchema = z
  .object({ reference: paymentReferenceSchema })
  .strict();

const paystackVerifyResponseSchema = z.object({
  status: z.literal(true),
  data: z.object({
    id: z.union([z.number().int().nonnegative(), z.string().min(1)]),
    status: z.string().trim().min(1),
    reference: paymentReferenceSchema,
    amount: z.number().int().positive(),
    currency: z.string().trim().min(3).max(3),
    channel: z.string().trim().max(50).optional().default(""),
    paid_at: z.string().datetime({ offset: true }).nullable().optional(),
  }),
});

class PaymentIntegrityError extends Error {}

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function paymentMethodForChannel(channel: string): PaymentMethod {
  const normalized = channel.toLowerCase();
  if (normalized.includes("mobile")) return PaymentMethod.MOBILE_MONEY;
  if (normalized.includes("bank")) return PaymentMethod.BANK_TRANSFER;
  return PaymentMethod.OTHER;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] || character
  );
}

export async function POST(request: Request) {
  try {
    const currentUser = await requireAuthenticatedUser(request);
    if (!currentUser) {
      return json({ success: false, message: "Authentication required" }, 401);
    }

    const { reference } = verifySchema.parse(await request.json());
    const payment = await prisma.payment.findFirst({
      where: {
        reference,
        enrollment: { userId: currentUser.id },
      },
      include: {
        enrollment: {
          select: {
            id: true,
            userId: true,
            agreedFeeMinor: true,
            feeCurrency: true,
            amountPaidMinor: true,
            status: true,
            course: {
              select: { amount: true, currency: true, name: true },
            },
            user: {
              select: { email: true, fullName: true, phone: true },
            },
          },
        },
      },
    });

    // Do not disclose whether a reference belongs to another user.
    if (!payment) {
      return json({ success: false, message: "Payment not found" }, 404);
    }

    const configuredFeeMinor = payment.enrollment.course.amount
      ? majorToMinor(Number(payment.enrollment.course.amount))
      : undefined;
    const agreedFeeMinor =
      payment.enrollment.agreedFeeMinor ?? configuredFeeMinor;

    if (!agreedFeeMinor || agreedFeeMinor <= 0) {
      throw new PaymentIntegrityError("Enrollment fee is not configured");
    }

    if (payment.status === PaymentStatus.SUCCESS) {
      return json({
        success: true,
        data: {
          paymentId: payment.id,
          status: payment.status,
          totalPaidMinor: payment.enrollment.amountPaidMinor,
          agreedFeeMinor,
          enrollmentStatus: payment.enrollment.status,
          alreadyVerified: true,
        },
      });
    }

    if (payment.status === PaymentStatus.REFUNDED) {
      return json(
        { success: false, message: "Refunded payments cannot be re-verified" },
        409
      );
    }

    const verificationResult = paystackVerifyResponseSchema.safeParse(
      await paystackService.verifyTransaction(reference)
    );
    if (!verificationResult.success) {
      throw new Error("Paystack returned an invalid verification response");
    }
    const providerPayment = verificationResult.data.data;
    const expectedCurrency = normalizeCurrency(payment.currency);

    if (
      !providerPaymentMatchesExpected({
        providerReference: providerPayment.reference,
        providerAmountMinor: providerPayment.amount,
        providerCurrency: providerPayment.currency,
        expectedReference: payment.reference,
        expectedAmountMinor: payment.amountMinor,
        expectedCurrency,
      })
    ) {
      throw new PaymentIntegrityError(
        "Payment provider details do not match this payment"
      );
    }

    const providerStatus = providerPayment.status.toLowerCase();
    const method = paymentMethodForChannel(providerPayment.channel);
    const verifiedAt = new Date().toISOString();
    const sanitizedMetadata = {
      expectedAmountMinor: payment.amountMinor,
      expectedCurrency,
      verification: {
        status: providerStatus,
        amountMinor: providerPayment.amount,
        currency: expectedCurrency,
        channel: providerPayment.channel || "unknown",
        paidAt: providerPayment.paid_at ?? null,
        verifiedAt,
      },
    };

    if (providerStatus !== "success") {
      const status =
        providerStatus === "failed"
          ? PaymentStatus.FAILED
          : PaymentStatus.PENDING;

      await prisma.payment.updateMany({
        where: {
          id: payment.id,
          status: { notIn: [PaymentStatus.SUCCESS, PaymentStatus.REFUNDED] },
        },
        data: { status, method, metadata: sanitizedMetadata },
      });

      return json(
        {
          success: false,
          message:
            status === PaymentStatus.FAILED
              ? "Payment failed"
              : "Payment is still pending",
          data: { paymentId: payment.id, status },
        },
        status === PaymentStatus.FAILED ? 400 : 202
      );
    }

    const result = await prisma.$transaction(async (transaction) => {
      const transitioned = await transaction.payment.updateMany({
        where: {
          id: payment.id,
          status: { notIn: [PaymentStatus.SUCCESS, PaymentStatus.REFUNDED] },
        },
        data: {
          status: PaymentStatus.SUCCESS,
          currency: expectedCurrency,
          method,
          paystackTrxId: String(providerPayment.id),
          // Do not persist Paystack authorization details or the full payload.
          paystackAuth: null,
          metadata: sanitizedMetadata,
        },
      });

      if (transitioned.count === 1) {
        const maxPaidBeforeThisPayment = agreedFeeMinor - payment.amountMinor;
        if (maxPaidBeforeThisPayment < 0) {
          throw new PaymentIntegrityError(
            "Payment exceeds the enrollment fee"
          );
        }

        const credited = await transaction.enrollment.updateMany({
          where: {
            id: payment.enrollmentId,
            userId: currentUser.id,
            amountPaidMinor: { lte: maxPaidBeforeThisPayment },
          },
          data: {
            amountPaidMinor: { increment: payment.amountMinor },
            agreedFeeMinor,
            feeCurrency: expectedCurrency,
          },
        });

        if (credited.count !== 1) {
          throw new PaymentIntegrityError(
            "Payment would exceed the remaining balance"
          );
        }
      }

      const enrollment = await transaction.enrollment.findUniqueOrThrow({
        where: { id: payment.enrollmentId },
        select: { amountPaidMinor: true },
      });
      const enrollmentStatus =
        enrollment.amountPaidMinor >= agreedFeeMinor
          ? EnrollmentStatus.PAID
          : EnrollmentStatus.PARTIALLY_PAID;

      await transaction.enrollment.update({
        where: { id: payment.enrollmentId },
        data: { status: enrollmentStatus },
      });

      return {
        transitioned: transitioned.count === 1,
        totalPaidMinor: enrollment.amountPaidMinor,
        enrollmentStatus,
      };
    });

    if (result.transitioned) {
      try {
        const email = payment.enrollment.user.email;
        const fullName = payment.enrollment.user.fullName;
        const phone = payment.enrollment.user.phone;
        const courseName = payment.enrollment.course.name || "your course";
        const paidMajor = payment.amountMinor / 100;
        const agreedMajor = agreedFeeMinor / 100;
        const totalPaidMajor = result.totalPaidMinor / 100;
        const remainingMajor = Math.max(agreedMajor - totalPaidMajor, 0);

        if (email) {
          await emailService
            .sendEmail({
              to: email,
              subject: "Gree Software Academy - Payment Successful",
              html: `<h2>Payment Successful</h2><p>Hello ${escapeHtml(fullName || email)},</p><p>Your payment for <strong>${escapeHtml(courseName)}</strong> was successful.</p><p>Paid: ${expectedCurrency} ${paidMajor.toFixed(2)}<br>Total paid: ${expectedCurrency} ${totalPaidMajor.toFixed(2)}<br>Remaining: ${expectedCurrency} ${remainingMajor.toFixed(2)}</p>`,
              text: `Payment successful. Paid: ${expectedCurrency} ${paidMajor.toFixed(2)}. Total: ${expectedCurrency} ${totalPaidMajor.toFixed(2)}. Remaining: ${expectedCurrency} ${remainingMajor.toFixed(2)}.`,
            })
            .catch(() => {});
        }

        if (phone) {
          await smsService
            .sendSMS({
              to: smsService.formatPhoneNumber(phone),
              message: `GSA Payment Successful: Paid ${expectedCurrency} ${paidMajor.toFixed(2)}. Total ${totalPaidMajor.toFixed(2)}. Remaining ${remainingMajor.toFixed(2)}.`,
            })
            .catch(() => {});
        }

        const adminEmails = [
          process.env.ADMIN_EMAIL_1,
          process.env.ADMIN_EMAIL_2,
        ].filter((value): value is string => Boolean(value));
        await Promise.all(
          adminEmails.map((adminEmail) =>
            emailService
              .sendPaymentSuccessfulSummaryEmail({
                adminEmail,
                purchaserName: fullName,
                purchaserEmail: email,
                purchaserPhone: phone,
                courseName,
                currency: expectedCurrency,
                paidMajor,
                totalPaidMajor,
                agreedMajor,
                remainingMajor,
                method: method.toString(),
                reference,
                paidAt: providerPayment.paid_at ?? verifiedAt,
              })
              .catch(() => {})
          )
        );
      } catch (notificationError) {
        console.error("Payment notifications failed", notificationError);
      }
    }

    return json({
      success: true,
      data: {
        paymentId: payment.id,
        status: PaymentStatus.SUCCESS,
        totalPaidMinor: result.totalPaidMinor,
        agreedFeeMinor,
        enrollmentStatus: result.enrollmentStatus,
        alreadyVerified: !result.transitioned,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof SyntaxError) {
      return json(
        { success: false, message: "Invalid verification request" },
        400
      );
    }

    if (error instanceof PaymentIntegrityError) {
      return json({ success: false, message: error.message }, 409);
    }

    console.error("/api/payment/verify error", error);
    return json(
      { success: false, message: "Failed to verify payment" },
      502
    );
  }
}
