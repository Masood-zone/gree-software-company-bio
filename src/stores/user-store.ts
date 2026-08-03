import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  location: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));
