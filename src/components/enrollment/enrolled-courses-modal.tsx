"use client";
import { useUserStore } from "@/stores/user-store";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { EnrollmentStatus } from "@/types/enrollment";
import { Badge } from "../ui/badge";
import {
  useProcessPayment,
  useVerifyPayment,
} from "@/services/payments/payments";
import { Button } from "../ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EnrolledCoursesModal({ open, onOpenChange }: Props) {
  const user = useUserStore((s) => s.user);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["enrollments", user?.id],
    enabled: open && !!user?.id,
    queryFn: async () => {
      const res = await api.get(`/api/enrollments?userId=${user?.id}`);
      return res.data.enrollments as Array<{
        id: string;
        status: string;
        createdAt: string;
        amountPaidMinor: number;
        agreedFeeMinor: number;
        payments?: Array<{
          id: string;
          reference: string;
          status: string;
          createdAt: string;
          updatedAt: string;
          metadata?: unknown;
        }>;
        course?: {
          id: string;
          name: string;
          amount?: number | string | null;
          currency?: string | null;
        } | null;
      }>;
    },
  });
  const {
    mutateAsync: payRemainingAmount,
    isPending,
    isError,
  } = useProcessPayment();
  const { mutateAsync: verifyPayment, isPending: isVerifying } =
    useVerifyPayment();

  useEffect(() => {
    if (open && user?.id) refetch();
  }, [open, user?.id, refetch]);

  const enrollmentStatus: EnrollmentStatus = {
    PENDING: "PENDING",
    AWAITING_VERIFICATION: "AWAITING_VERIFICATION",
    PARTIALLY_PAID: "PARTIALLY_PAID",
    PAID: "PAID",
    FAILED: "FAILED",
    CANCELLED: "CANCELLED",
  };

  const formatGHS = useMemo(
    () =>
      new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    []
  );

  const handlePayRemaining = async (en: {
    id: string;
    amountPaidMinor: number;
    agreedFeeMinor: number;
  }) => {
    if (!user?.id) return;
    const amountLeftMajor = Math.max(
      0,
      (en.agreedFeeMinor - en.amountPaidMinor) / 100
    );
    if (amountLeftMajor <= 0) return;
    try {
      setPayingId(en.id);
      const res = await payRemainingAmount({
        enrollmentId: en.id,
        userId: user.id,
        amountMajor: amountLeftMajor,
        callbackUrl: `${window.location.origin}/gree-software-academy/checkout?next=${encodeURIComponent("/")}`,
      });
      const url = res?.data?.authorization_url;
      if (url) {
        window.location.href = url;
      }
    } catch (e) {
      console.error("Failed to initialize payment:", e);
    } finally {
      setPayingId(null);
    }
  };

  const handleVerifyNow = async (en: {
    id: string;
    payments?: Array<{
      id: string;
      reference: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    }>;
  }) => {
    // Find the most recent INITIATED/PENDING payment reference for this enrollment
    const payments = en.payments ?? [];
    if (!payments.length) return;
    const sorted = [...payments].sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.createdAt).getTime()
    );
    const candidate =
      sorted.find((p) => p.status === "INITIATED" || p.status === "PENDING") ||
      sorted[0];
    if (!candidate?.reference) return;
    try {
      setVerifyingId(en.id);
      const res = await verifyPayment(candidate.reference);
      if (res?.success) {
        await refetch();
      }
    } catch (e) {
      console.error("Verification failed:", e);
    } finally {
      setVerifyingId(null);
    }
  };

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

        <div className="p-4 space-y-4">
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
                const amountPaid = en.amountPaidMinor / 100;
                const agreedFee = en.agreedFeeMinor / 100;
                const amountLeft = Math.max(0, agreedFee - amountPaid);
                const paidPct = Math.min(
                  100,
                  Math.max(0, (amountPaid / (agreedFee || 1)) * 100)
                );
                return (
                  <div
                    key={en.id}
                    className="w-full border border-border rounded-lg gap-4 flex items-start justify-between p-4"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="font-semibold truncate">
                        {en.course?.name ?? "Course"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Status:{" "}
                        <Badge
                          className={
                            en.status === "PAID"
                              ? "bg-green-600 text-white"
                              : en.status === "FAILED" ||
                                  en.status === "CANCELLED"
                                ? "bg-red-600 text-white"
                                : en.status === "PARTIALLY_PAID"
                                  ? "bg-blue-600 text-white"
                                  : "bg-yellow-600 text-white"
                          }
                        >
                          {
                            enrollmentStatus[
                              en.status as keyof EnrollmentStatus
                            ]
                          }
                        </Badge>
                      </p>
                      <p className="text-xs text-muted-foreground mt-3">
                        Enrolled on{" "}
                        {new Date(en.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Amount + Actions */}
                    <div className="min-w-[260px] flex-shrink-0">
                      <div className="text-right space-y-1">
                        <div className="grid grid-cols-2 gap-x-3 text-sm">
                          <span className="text-muted-foreground text-left">
                            Total fee
                          </span>
                          <span className="font-medium">
                            {formatGHS.format(agreedFee)}
                          </span>

                          <span className="text-muted-foreground text-left">
                            Paid
                          </span>
                          <span className="font-medium">
                            {formatGHS.format(amountPaid)}
                          </span>

                          <span className="text-muted-foreground text-left">
                            Remaining
                          </span>
                          <span className="font-semibold">
                            {formatGHS.format(amountLeft)}
                          </span>
                        </div>

                        {/* Progress */}
                        <div className="mt-2 h-2 w-full bg-muted rounded">
                          <div
                            className="h-2 bg-primary rounded"
                            style={{ width: `${paidPct}%` }}
                          />
                        </div>

                        {en.status === "AWAITING_VERIFICATION" && (
                          <div className="pt-2">
                            <Button
                              onClick={() => handleVerifyNow(en)}
                              disabled={isVerifying || verifyingId === en.id}
                              variant="secondary"
                              className="w-full"
                            >
                              {verifyingId === en.id
                                ? "Verifying…"
                                : "Verify payment now"}
                            </Button>
                          </div>
                        )}

                        {en.status !== "PAID" && amountLeft > 0 && (
                          <div className="pt-2">
                            <Button
                              onClick={() => handlePayRemaining(en)}
                              disabled={isPending || payingId === en.id}
                              className="w-full"
                            >
                              {payingId === en.id
                                ? "Redirecting to Paystack…"
                                : `Pay ${formatGHS.format(amountLeft)}`}
                            </Button>
                            {isError && payingId === en.id && (
                              <p className="text-xs text-destructive mt-1 text-left">
                                Could not start payment. Please try again.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
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
