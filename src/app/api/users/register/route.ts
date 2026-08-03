import { auth } from "@/lib/auth";
import { emailService } from "@/services/email/email-service";
import { smsService } from "@/services/sms/sms-service";
import { checkAuthRateLimit, withNoStore } from "@/lib/auth/rate-limit";

export const dynamic = "force-dynamic";

type RegisterBody = {
  email?: string;
  phone?: string;
  fullName?: string;
  location?: string;
  password?: string;
};

export async function POST(request: Request) {
  let body: RegisterBody;
  try {
    body = (await request.json()) as RegisterBody;
  } catch {
    return withNoStore(Response.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    ));
  }

  const email = body.email?.trim().toLowerCase();
  const phone = body.phone?.trim();
  const fullName = body.fullName?.trim();
  const location = body.location?.trim();
  const password = body.password;

  if (!email || !phone || !fullName || !location || !password) {
    return withNoStore(Response.json(
      { success: false, message: "All registration fields are required" },
      { status: 400 }
    ));
  }
  if (password.length < 8 || password.length > 128) {
    return withNoStore(Response.json(
      { success: false, message: "Password must be 8 to 128 characters" },
      { status: 400 }
    ));
  }

  const rateLimit = checkAuthRateLimit({
    request,
    scope: "register",
    identifier: email,
    limit: 3,
    windowMs: 60 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return withNoStore(Response.json(
      { success: false, message: "Too many registration attempts. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      }
    ));
  }

  const response = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: fullName,
      phone,
      fullName,
      location,
    },
    headers: request.headers,
    asResponse: true,
  });

  if (response.ok) {
    const data = (await response.clone().json()) as {
      user?: { email?: string; phone?: string; fullName?: string | null };
    };
    const user = data.user;
    if (user?.email && user.phone) {
      const origin = new URL(request.url).origin;
      void Promise.allSettled([
        emailService.sendAccountCreatedEmail({
          userEmail: user.email,
          userName: user.fullName || undefined,
          signinUrl: `${origin}/`,
        }),
        smsService.sendSMS({
          to: smsService.formatPhoneNumber(user.phone),
          message: `Welcome to Gree Software Academy, ${user.fullName || "there"}! Enroll in a course and choose flexible payment options.`,
        }),
      ]).catch((error) => console.error("Welcome notifications failed", error));
    }
  }

  return withNoStore(response);
}
