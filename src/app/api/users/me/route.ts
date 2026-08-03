import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { requireAuthenticatedUser } from "@/lib/auth/guards";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const sessionUser = await requireAuthenticatedUser(request);
  if (!sessionUser) {
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      id: true,
      email: true,
      phone: true,
      fullName: true,
      location: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { success: true, user },
    { headers: { "Cache-Control": "no-store" } }
  );
}
