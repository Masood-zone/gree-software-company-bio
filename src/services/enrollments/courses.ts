/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import type { Course } from "@/types/enrollment";
import api from "../api";

export const fetchCourses = async (): Promise<Course[]> => {
  const res = await api.get(`/api/courses?active=true`);
  const raw: any[] = res.data.courses ?? [];
  const courses: Course[] = raw.map((c) => ({
    ...c,
    amount:
      c?.amount != null && typeof c.amount !== "number"
        ? Number(c.amount)
        : (c?.amount ?? null),
  }));
  return courses;
};

export const useCourses = () => {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
};
