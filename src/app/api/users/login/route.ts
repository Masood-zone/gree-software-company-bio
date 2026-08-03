import { auth } from "@/lib/auth";
import { checkAuthRateLimit, withNoStore } from "@/lib/auth/rate-limit";

export const dynamic = "force-dynamic";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return withNoStore(Response.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    ));
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password;
  if (!email || !password) {
    return withNoStore(Response.json(
      { success: false, message: "Email and password are required" },
      { status: 400 }
    ));
  }

  const rateLimit = checkAuthRateLimit({
    request,
    scope: "login",
    identifier: email,
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return withNoStore(Response.json(
      { success: false, message: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      }
    ));
  }

  const response = await auth.api.signInEmail({
    body: { email, password, rememberMe: true },
    headers: request.headers,
    asResponse: true,
  });
  return withNoStore(response);
}
