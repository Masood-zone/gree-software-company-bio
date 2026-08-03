import "server-only";

import { auth } from "@/lib/auth";

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: string;
};

export async function requireAuthenticatedUser(
  request: Request
): Promise<AuthenticatedUser | null> {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    role: session.user.role || "USER",
  };
}

export async function requireAdmin(
  request: Request
): Promise<AuthenticatedUser | null> {
  const user = await requireAuthenticatedUser(request);
  return user?.role === "ADMIN" ? user : null;
}
