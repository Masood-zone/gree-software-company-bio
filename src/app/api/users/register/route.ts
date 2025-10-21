import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";

export const dynamic = "force-dynamic";

type RegisterBody = {
  email?: string;
  phone?: string;
  fullName?: string;
  location?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegisterBody;
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const fullName = body.fullName?.trim();
    const location = body.location?.trim();

    if (!email || !phone) {
      return NextResponse.json(
        { success: false, message: "Email and phone are required" },
        { status: 400 }
      );
    }

    // Try to find by email first
    let user = await prisma.user.findUnique({ where: { email } });

    // If not found by email, try by phone
    if (!user) {
      user = await prisma.user.findFirst({ where: { phone } });
    }

    // Create if not existing
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          phone,
          fullName: fullName || null,
          location: location || null,
        },
      });
      return NextResponse.json({ success: true, user, created: true });
    }
    // Existing user
    const alreadyExists = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });
    if (alreadyExists) {
      // Already exists with either email or phone should be more specific
      return NextResponse.json(
        {
          success: false,
          message: `User already exists with this ${
            alreadyExists.email === email ? "email" : "phone"
          }`,
        },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: true, user, created: false });
  } catch (err: unknown) {
    console.error("/api/users/register error", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
