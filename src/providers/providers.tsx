"use client";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { getCurrentUser } from "@/services/users/users";
import { useUserStore } from "@/stores/user-store";

const queryClient = new QueryClient();
function SessionHydrator() {
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((user) => active && setUser(user))
      .catch(() => active && clearUser());
    return () => {
      active = false;
    };
  }, [clearUser, setUser]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionHydrator />
        {children}
        <Toaster position="top-center" />
      </QueryClientProvider>
    </>
  );
}
