import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { randomBytes, scryptSync } from "crypto";
import { emailService } from "@/services/email/email-service";
import { smsService } from "@/services/sms/sms-service";

export const dynamic = "force-dynamic";

type RegisterBody = {
  email?: string;
  phone?: string;
  fullName?: string;
  location?: string;
  password?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegisterBody;
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const fullName = body.fullName?.trim();
    const location = body.location?.trim();
    const passwordRaw = body.password?.trim();

    if (!email || !phone) {
      return NextResponse.json(
        { success: false, message: "Email and phone are required" },
        { status: 400 }
      );
    }
    if (!passwordRaw || passwordRaw.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }
    // Check existence by email or phone
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists with this email or phone",
        },
        { status: 409 }
      );
    }

    // Hash password with Node's scrypt (salt:hash format)
    const salt = randomBytes(16).toString("hex");
    const derivedKey = scryptSync(passwordRaw, salt, 64).toString("hex");
    const passwordHash = `${salt}:${derivedKey}`;

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        fullName: fullName || null,
        location: location || null,
        password: passwordHash,
      },
    });

    // Fire-and-forget notifications (do not block response)
    (async () => {
      try {
        const origin =
          req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "";
        const signinUrl = origin ? `${origin}/` : "/";

        // Use the AccountCreatedEmail component via the email service
        await emailService
          .sendAccountCreatedEmail({
            userEmail: user.email,
            userName: user.fullName || undefined,
            signinUrl,
          })
          .catch(() => {});

        // SMS welcome note
        const phoneFormatted = smsService.formatPhoneNumber(user.phone);
        const sms = `Welcome to Gree Software Academy, ${user.fullName || "there"}! Enroll in a course and choose flexible payment options. Learn more at our site.`;
        await smsService
          .sendSMS({ to: phoneFormatted, message: sms })
          .catch(() => {});
      } catch (e) {
        console.error("Welcome notifications failed", e);
      }
    })();

    return NextResponse.json({ success: true, user, created: true });
  } catch (err: unknown) {
    console.error("/api/users/register error", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
