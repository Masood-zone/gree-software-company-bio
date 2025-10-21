import { useMutation } from "@tanstack/react-query";
import type { User } from "@/stores/user-store";
import api from "../api";

export interface RegisterUserData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
}

export const registerUser = async (data: RegisterUserData): Promise<User> => {
  const response = await api.post(`/api/users/register`, data);
  return response.data.user;
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
