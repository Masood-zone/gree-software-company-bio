import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { scryptSync, timingSafeEqual } from "crypto";

export const dynamic = "force-dynamic";

type LoginBody = {
  email?: string; // can be email or phone from client
  phone?: string; // optional explicit phone support
  password?: string;
};

type DbUser = {
  id: string;
  email: string;
  phone: string;
  fullName: string | null;
  location: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  password?: string | null;
};

function sanitizeUser(u: DbUser) {
  return {
    id: u.id,
    email: u.email,
    phone: u.phone,
    fullName: u.fullName ?? "",
    location: u.location ?? "",
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}

function verifyPassword(input: string, stored: string | null): boolean {
  if (!stored) return false;
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;
  const derived = scryptSync(input, salt, 64);
  const storedBuf = Buffer.from(hashHex, "hex");
  return (
    derived.length === storedBuf.length && timingSafeEqual(derived, storedBuf)
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginBody;
    const identifierRaw = body.email?.trim();
    const phoneRaw = body.phone?.trim();
    const password = body.password?.trim();

    if ((!identifierRaw && !phoneRaw) || !password) {
      return NextResponse.json(
        { success: false, message: "Email/phone and password are required" },
        { status: 400 }
      );
    }

    const identifier = identifierRaw?.toLowerCase();

    // Try email match first; then phone match (using either provided phone or identifier)
    let user = identifier
      ? await prisma.user.findUnique({ where: { email: identifier } })
      : null;

    if (!user) {
      const phoneToFind = phoneRaw || identifierRaw;
      if (phoneToFind) {
        user = await prisma.user.findFirst({ where: { phone: phoneToFind } });
      }
    }

    if (!user || !verifyPassword(password, user.password ?? null)) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const safeUser = sanitizeUser(user);
    return NextResponse.json({ success: true, user: safeUser });
  } catch (err) {
    console.error("/api/users/login error", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
