"use client";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useProcessPayment } from "@/services/payments/payments";
import type {
  PaymentInitRequest,
  PaymentInitResponse,
} from "@/types/enrollment";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/user-store";

interface PaymentModalProps {
  enrollmentId: string;
  coursePrice: number;
  onBack: () => void;
}

export default function PaymentModal({
  enrollmentId,
  coursePrice,
  onBack,
}: PaymentModalProps) {
  const { control, handleSubmit, watch } = useForm<{
    method: "CARD" | "MOBILE" | "BANK";
    type: "FULL" | "INSTALLMENT";
    installments?: 2;
  }>({
    defaultValues: {
      method: "CARD",
      type: "FULL",
    },
  });

  const { mutate: processPayment, isPending } = useProcessPayment();
  const user = useUserStore((s) => s.user);

  const paymentType = watch("type");
  const installmentDuration = watch("installments");

  const installmentAmount = useMemo(() => {
    if (paymentType === "FULL") return coursePrice;
    // Only 2-part installment: 50% now, 50% next month
    return Math.ceil(coursePrice / 2);
  }, [paymentType, coursePrice]);

  const onSubmit = () => {
    if (!user?.id) {
      toast.error("Please register or sign in before making a payment.");
      return;
    }
    const callbackUrl = `${window.location.origin}/gree-software-academy/checkout`;
    const paymentData: PaymentInitRequest = {
      enrollmentId,
      userId: user?.id || "",
      amountMajor: installmentAmount,
      callbackUrl,
    };

    toast.loading("Processing payment...");

    processPayment(paymentData, {
      onSuccess: (res: PaymentInitResponse) => {
        toast.dismiss();
        // Redirect to Paystack checkout page
        const url = res?.data?.authorization_url;
        if (url) {
          window.location.href = url;
        } else {
          toast.error("Failed to get checkout URL");
        }
      },
      onError: (error) => {
        toast.dismiss();
        toast.error(error.message || "Payment failed");
      },
    });
  };

  // Redirect flow: We don't show a success screen here; Paystack returns to callbackUrl

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-secondary rounded-lg w-full max-w-md h-[535px] overflow-hidden flex flex-col">
        <div className="border-b border-border p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Payment Details</h2>
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            ←
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 space-y-4 overflow-y-auto flex-1"
        >
          <div className="bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
            <p className="text-3xl font-bold">
              GHS {installmentAmount.toLocaleString()}
            </p>
            {paymentType === "INSTALLMENT" && (
              <p className="text-xs text-muted-foreground mt-1">
                {installmentDuration} monthly installments
              </p>
            )}
          </div>

          <div>
            <p className="block text-sm font-medium mb-2">Payment Method</p>
            <Controller
              name="method"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="gap-2"
                >
                  {(["CARD", "MOBILE", "BANK"] as const).map((method) => {
                    const id = `method-${method.toLowerCase()}`;
                    return (
                      <div
                        key={method}
                        className="flex items-center space-x-2 p-2 border border-border rounded-lg"
                      >
                        <RadioGroupItem value={method} id={id} />
                        <Label htmlFor={id} className="capitalize">
                          {method}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              )}
            />
          </div>

          <div>
            <p className="block text-sm font-medium mb-2">Payment Type</p>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="gap-2"
                >
                  {(["FULL", "INSTALLMENT"] as const).map((type) => {
                    const id = `type-${type.toLowerCase()}`;
                    return (
                      <div
                        key={type}
                        className="flex items-center space-x-2 p-2 border border-border rounded-lg"
                      >
                        <RadioGroupItem value={type} id={id} />
                        <Label htmlFor={id} className="capitalize">
                          {type}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              )}
            />
          </div>

          {paymentType === "INSTALLMENT" && (
            <div>
              <p className="block text-sm font-medium mb-2">
                Installment Duration
              </p>
              <Controller
                name="installments"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={"2"}
                    onValueChange={() => field.onChange(2)}
                    className="gap-2"
                  >
                    {([2] as const).map((duration) => {
                      const id = `inst-${duration}`;
                      return (
                        <div
                          key={duration}
                          className="flex items-center space-x-2 p-2 border border-border rounded-lg"
                        >
                          <RadioGroupItem value={String(duration)} id={id} />
                          <Label htmlFor={id} className="flex-1">
                            <span className="font-medium">
                              {duration} months
                            </span>
                          </Label>
                          <span className="ml-auto text-sm text-muted-foreground">
                            GHS {Math.ceil(coursePrice / 2).toLocaleString()}/mo
                          </span>
                        </div>
                      );
                    })}
                  </RadioGroup>
                )}
              />
            </div>
          )}

          <div className="sticky bottom-0 bg-white dark:bg-secondary pt-2 pb-1">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Processing...
                </>
              ) : (
                `Pay GHS ${installmentAmount.toLocaleString()}`
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
