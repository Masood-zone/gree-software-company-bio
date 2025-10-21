import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EnrollmentData, EnrollmentResponse } from "@/types/enrollment";
import api from "../api";

export const enrollCourse = async (
  data: EnrollmentData
): Promise<EnrollmentResponse> => {
  const response = await api.post("/api/enrollments", data);
  return response.data;
};

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
};
