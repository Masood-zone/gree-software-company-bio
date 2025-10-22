import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { randomBytes, scryptSync } from "crypto";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const take = Math.min(parseInt(searchParams.get("take") || "50", 10), 100);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          phone: true,
          fullName: true,
          location: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      success: true,
      users: items,
      total,
      skip,
      take,
    });
  } catch (err) {
    console.error("/api/users GET error", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/users
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const id: string | undefined = body?.id;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "id is required" },
        { status: 400 }
      );
    }

    // Allowed fields
    const fullName: string | undefined = body?.fullName?.trim();
    const emailRaw: string | undefined = body?.email?.trim();
    const phone: string | undefined = body?.phone?.trim();
    const location: string | undefined = body?.location?.trim();
    const passwordRaw: string | undefined = body?.password?.trim();

    const email = emailRaw ? emailRaw.toLowerCase() : undefined;

    if (
      !fullName &&
      !email &&
      !phone &&
      !location &&
      (!passwordRaw || passwordRaw.length === 0)
    ) {
      return NextResponse.json(
        { success: false, message: "No fields to update" },
        { status: 400 }
      );
    }

    // Ensure user exists
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Unique constraints on email/phone if they are changing
    if (email && email !== existing.email) {
      const emailTaken = await prisma.user.findFirst({
        where: { email, NOT: { id } },
      });
      if (emailTaken) {
        return NextResponse.json(
          { success: false, message: "Email already in use" },
          { status: 409 }
        );
      }
    }

    if (phone && phone !== existing.phone) {
      const phoneTaken = await prisma.user.findFirst({
        where: { phone, NOT: { id } },
      });
      if (phoneTaken) {
        return NextResponse.json(
          { success: false, message: "Phone already in use" },
          { status: 409 }
        );
      }
    }

    const data: Record<string, unknown> = {};
    if (typeof fullName === "string") data.fullName = fullName;
    if (typeof email === "string") data.email = email;
    if (typeof phone === "string") data.phone = phone;
    if (typeof location === "string") data.location = location;

    if (passwordRaw && passwordRaw.length > 0) {
      if (passwordRaw.length < 6) {
        return NextResponse.json(
          { success: false, message: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }
      const salt = randomBytes(16).toString("hex");
      const derivedKey = scryptSync(passwordRaw, salt, 64).toString("hex");
      const passwordHash = `${salt}:${derivedKey}`;
      data.password = passwordHash;
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        phone: true,
        fullName: true,
        location: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    console.error("/api/users PATCH error", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
