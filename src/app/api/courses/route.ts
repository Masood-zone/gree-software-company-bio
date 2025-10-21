import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

// GET /api/courses
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const take = Math.min(parseInt(searchParams.get("take") || "50", 10), 100);
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const activeParam = searchParams.get("active");
    const search = searchParams.get("search")?.trim();

    const where: Prisma.CourseWhereInput = {};
    if (activeParam === "true") where.active = true;
    if (activeParam === "false") where.active = false;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      courses: items,
      total,
      skip,
      take,
    });
  } catch (err) {
    console.error("/api/courses GET error", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/courses
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name: string | undefined = body?.name?.trim();
    const description: string | undefined = body?.description?.trim();
    const priceMinor: number | undefined =
      typeof body?.priceMinor === "number" ? body.priceMinor : undefined;
    const currency: string | undefined = body?.currency?.trim();
    const active: boolean | undefined =
      typeof body?.active === "boolean" ? body.active : undefined;

    if (!name) {
      return NextResponse.json(
        { success: false, message: "name is required" },
        { status: 400 }
      );
    }

    // Enforce unique name
    const existing = await prisma.course.findUnique({ where: { name } });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Course with this name already exists",
          course: existing,
        },
        { status: 409 }
      );
    }

    const course = await prisma.course.create({
      data: {
        name,
        description: description || null,
        priceMinor: typeof priceMinor === "number" ? priceMinor : null,
        currency: currency || undefined, // default applies if undefined
        active: typeof active === "boolean" ? active : undefined,
      },
    });

    return NextResponse.json({ success: true, course }, { status: 201 });
  } catch (err) {
    console.error("/api/courses POST error", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/courses?id=courseId
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    let id = url.searchParams.get("id") || undefined;
    if (!id) {
      // Fallback: some clients send id in body for DELETE
      try {
        const body = await req.json();
        id = body?.id;
      } catch {
        // ignore if no body
      }
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "id is required" },
        { status: 400 }
      );
    }

    const deleted = await prisma.course.delete({ where: { id } });
    return NextResponse.json({ success: true, course: deleted });
  } catch (err: unknown) {
    // Handle Prisma known errors
    if (err && typeof err === "object" && "code" in err) {
      const e = err as Prisma.PrismaClientKnownRequestError;
      if (e.code === "P2025") {
        return NextResponse.json(
          { success: false, message: "Course not found" },
          { status: 404 }
        );
      }
      if (e.code === "P2003") {
        // Foreign key constraint failed (likely enrollments exist)
        return NextResponse.json(
          {
            success: false,
            message:
              "Cannot delete course because related enrollments exist. Remove enrollments first or deactivate the course.",
          },
          { status: 409 }
        );
      }
    }
    console.error("/api/courses DELETE error", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
