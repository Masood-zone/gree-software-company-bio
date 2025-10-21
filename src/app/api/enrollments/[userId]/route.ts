import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { EnrollmentStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

// GET /api/enrollments/[userId]?take=50&skip=0&status=PAID&courseId=
export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await params;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId is required" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const take = Math.min(parseInt(searchParams.get("take") || "50", 10), 100);
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const status = searchParams.get("status") as EnrollmentStatus | null;
    const courseId = searchParams.get("courseId") || undefined;

    // Optional: ensure user exists for clearer 404
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const where: Record<string, unknown> = { userId };
    if (status) where.status = status;
    if (courseId) where.courseId = courseId;

    const [items, total] = await Promise.all([
      prisma.enrollment.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { id: true, email: true, phone: true, fullName: true },
          },
          payments: true,
        },
      }),
      prisma.enrollment.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      userId,
      enrollments: items,
      total,
      skip,
      take,
    });
  } catch (err) {
    console.error("/api/enrollments/[userId GET error", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
