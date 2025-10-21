import { useQuery } from "@tanstack/react-query";
import type { Course } from "@/types/enrollment";
import api from "../api";

export const fetchCourses = async (): Promise<Course[]> => {
  const response = await api.get(`/api/courses`);
  return response.data.courses;
};

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
};
