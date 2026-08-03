/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { EnrollmentStatus } from "@prisma/client";
import { requireAuthenticatedUser } from "@/lib/auth/guards";

export const dynamic = "force-dynamic";

// GET /api/enrollments
export async function GET(req: Request) {
  const sessionUser = await requireAuthenticatedUser(req);
  if (!sessionUser) {
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }
  try {
    const { searchParams } = new URL(req.url);
    const take = Math.min(parseInt(searchParams.get("take") || "50", 10), 100);
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const status = searchParams.get("status") as EnrollmentStatus | null;
    const courseId = searchParams.get("courseId") || undefined;
    const requestedUserId = searchParams.get("userId") || undefined;
    const userId = sessionUser.role === "ADMIN" ? requestedUserId : sessionUser.id;

    const where: any = {};
    if (status) where.status = status;
    if (courseId) where.courseId = courseId;
    if (userId) where.userId = userId;

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
          course: {
            select: { id: true, name: true, amount: true, currency: true },
          },
          payments: true,
        },
      }),
      prisma.enrollment.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      enrollments: items,
      total,
      skip,
      take,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("/api/enrollments GET error", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/enrollments
export async function POST(req: Request) {
  const sessionUser = await requireAuthenticatedUser(req);
  if (!sessionUser) {
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }
  try {
    const body = await req.json();
    const userId: string | undefined = body?.userId;
    const courseId: string | undefined = body?.courseId;
    const cohort: string | undefined = body?.cohort?.trim() || undefined;
    const program: string = body?.program?.trim() ?? "Gree Software Academy";
    const notes: string | undefined = body?.notes?.trim();

    if (!userId || !courseId) {
      return NextResponse.json(
        { success: false, message: "userId and courseId are required" },
        { status: 400 }
      );
    }
    if (userId !== sessionUser.id && sessionUser.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "You can only create your own enrollment" },
        { status: 403, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Ensure user and course exist
    const [user, course] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.course.findUnique({ where: { id: courseId } }),
    ]);
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    if (!course)
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );

    // Guard duplicate by composite unique
    const existing = await prisma.enrollment.findFirst({
      where: { userId, courseId, cohort: cohort ?? null },
    });
    if (existing) {
      return NextResponse.json(
        {
          success: true,
          enrollment: existing,
          created: false,
          message: "Already enrolled",
        },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        cohort: cohort || null,
        program,
        notes: notes || null,
        status: EnrollmentStatus.PENDING,
      },
      include: {
        user: {
          select: { id: true, email: true, phone: true, fullName: true },
        },
        // course details can be fetched separately if needed
      },
    });

    return NextResponse.json(
      { success: true, enrollment, created: true },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("/api/enrollments POST error", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/enrollments?id=enrollmentId
export async function DELETE(req: Request) {
  const sessionUser = await requireAuthenticatedUser(req);
  if (!sessionUser) {
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }
  try {
    const url = new URL(req.url);
    let id = url.searchParams.get("id") || undefined;
    if (!id) {
      try {
        const body = await req.json();
        id = body?.id;
      } catch {
        // ignore
      }
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "id is required" },
        { status: 400 }
      );
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!enrollment) {
      return NextResponse.json(
        { success: false, message: "Enrollment not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }
    if (enrollment.userId !== sessionUser.id && sessionUser.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "You can only delete your own enrollment" },
        { status: 403, headers: { "Cache-Control": "no-store" } }
      );
    }

    const deleted = await prisma.enrollment.delete({ where: { id } });
    return NextResponse.json(
      { success: true, enrollment: deleted },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    // For completeness, Prisma errors (P2025 not found)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e = err as any;
    if (e?.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Enrollment not found" },
        { status: 404 }
      );
    }
    console.error("/api/enrollments DELETE error", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
