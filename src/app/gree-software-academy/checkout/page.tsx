"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyPayment } from "@/services/payments/payments";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || "";
  const next = searchParams.get("next") || "/";
  const router = useRouter();
  const { mutateAsync: verifyPayment } = useVerifyPayment();
  const [status, setStatus] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const run = async () => {
      if (!reference) return;
      setStatus("verifying");
      try {
        const res = await verifyPayment(reference);
        if (res?.success) {
          setStatus("success");
          setMessage("Payment verified successfully. You can close this page.");
          // Auto-redirect after a short delay
          const t = setTimeout(() => router.replace(next), 2000);
          return () => clearTimeout(t);
        } else {
          setStatus("error");
          setMessage(
            "Payment not verified. If you were charged, please contact support."
          );
        }
      } catch {
        setStatus("error");
        setMessage("Verification failed. Please try again.");
      }
    };
    // Awaiting params: `reference` comes from Paystack callback
    run();
  }, [reference, verifyPayment]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-secondary border border-border rounded-xl p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Payment Checkout</h1>
        {status === "idle" && (
          <p className="text-muted-foreground">
            Waiting for payment reference...
          </p>
        )}
        {status === "verifying" && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-muted-foreground">Verifying your payment...</p>
          </div>
        )}
        {status === "success" && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            <p>{message}</p>
          </div>
        )}
        {status === "error" && (
          <div className="flex flex-col items-center gap-3">
            <XCircle className="h-6 w-6 text-red-500" />
            <p className="text-destructive">{message}</p>
          </div>
        )}
        {reference && (
          <p className="text-xs text-muted-foreground mt-4 break-all">
            Ref: {reference}
          </p>
        )}
      </div>
    </div>
  );
}
