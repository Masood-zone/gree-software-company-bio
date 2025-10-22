"use client";
import { useUserStore } from "@/stores/user-store";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EnrolledCoursesModal({ open, onOpenChange }: Props) {
  const user = useUserStore((s) => s.user);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["enrollments", user?.id],
    enabled: open && !!user?.id,
    queryFn: async () => {
      const res = await api.get(`/api/enrollments?userId=${user?.id}`);
      return res.data.enrollments as Array<{
        id: string;
        status: string;
        createdAt: string;
        course?: {
          id: string;
          name: string;
          amount?: number | string | null;
          currency?: string | null;
        } | null;
      }>;
    },
  });

  useEffect(() => {
    if (open && user?.id) refetch();
  }, [open, user?.id, refetch]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-secondary rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto">
        <div className="border-b py-4 px-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Enrollments</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          {!user ? (
            <p className="text-muted-foreground">
              Please sign in to view your courses.
            </p>
          ) : isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-destructive">Failed to load enrollments.</p>
          ) : !data || data.length === 0 ? (
            <p className="text-muted-foreground">
              You have no enrollments yet.
            </p>
          ) : (
            <div className="space-y-3">
              {data.map((en) => {
                const amt = en.course?.amount;
                const amountNum =
                  typeof amt === "string" ? Number(amt) : (amt ?? 0);
                return (
                  <div
                    key={en.id}
                    className="border border-border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold">
                        {en.course?.name ?? "Course"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Status: {en.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        GHS {amountNum?.toLocaleString?.() ?? amountNum}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(en.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
