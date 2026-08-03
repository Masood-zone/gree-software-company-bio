import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import {
  requireAdmin,
  requireAuthenticatedUser,
} from "@/lib/auth/guards";
import { auth } from "@/lib/auth";
import { hashPassword } from "@/lib/auth/password";

export const dynamic = "force-dynamic";

const publicUserSelect = {
  id: true,
  email: true,
  phone: true,
  fullName: true,
  location: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json(
      { success: false, message: "Administrator access required" },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const take = Math.min(Math.max(Number(searchParams.get("take")) || 50, 1), 100);
    const skip = Math.max(Number(searchParams.get("skip")) || 0, 0);
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
        select: publicUserSelect,
      }),
      prisma.user.count(),
    ]);
    return NextResponse.json(
      { success: true, users, total, skip, take },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("/api/users GET error", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const sessionUser = await requireAuthenticatedUser(request);
  if (!sessionUser) {
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const requestedId = typeof body?.id === "string" ? body.id : sessionUser.id;
    if (requestedId !== sessionUser.id && sessionUser.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "You can only update your own profile" },
        { status: 403 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { id: requestedId } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const fullName = typeof body?.fullName === "string" ? body.fullName.trim() : undefined;
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : undefined;
    const phone = typeof body?.phone === "string" ? body.phone.trim() : undefined;
    const location = typeof body?.location === "string" ? body.location.trim() : undefined;
    const password = typeof body?.password === "string" && body.password ? body.password : undefined;
    const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : undefined;
    const changesCredentials = Boolean(password || (email && email !== existing.email));

    if (changesCredentials) {
      if (!currentPassword) {
        return NextResponse.json(
          { success: false, message: "Current password is required for email or password changes" },
          { status: 400 }
        );
      }
      try {
        await auth.api.verifyPassword({
          body: { password: currentPassword },
          headers: request.headers,
        });
      } catch {
        return NextResponse.json(
          { success: false, message: "Current password is incorrect" },
          { status: 401 }
        );
      }
    }

    if (password && (password.length < 8 || password.length > 128)) {
      return NextResponse.json(
        { success: false, message: "Password must be 8 to 128 characters" },
        { status: 400 }
      );
    }

    if (email && email !== existing.email) {
      const duplicate = await prisma.user.findUnique({ where: { email } });
      if (duplicate) {
        return NextResponse.json(
          { success: false, message: "Email already in use" },
          { status: 409 }
        );
      }
    }

    const user = await prisma.$transaction(async (tx) => {
      const updated = await tx.user.update({
        where: { id: requestedId },
        data: {
          ...(fullName ? { fullName, name: fullName } : {}),
          ...(email ? { email } : {}),
          ...(phone ? { phone } : {}),
          ...(location ? { location } : {}),
        },
        select: publicUserSelect,
      });
      if (password) {
        await tx.account.updateMany({
          where: { userId: requestedId, providerId: "credential" },
          data: { password: await hashPassword(password) },
        });
      }
      return updated;
    });

    return NextResponse.json(
      { success: true, user },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("/api/users PATCH error", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
