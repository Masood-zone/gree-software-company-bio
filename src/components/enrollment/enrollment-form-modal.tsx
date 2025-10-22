"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEnrollCourse } from "@/services/enrollments/enrollments";
import { useUserStore } from "@/stores/user-store";
import type { Course } from "@/types/enrollment";
import PaymentModal from "./payment-modal";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

interface EnrollmentFormModalProps {
  course: Course;
  onBack: () => void;
}

export default function EnrollmentFormModal({
  course,
  onBack,
}: EnrollmentFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ notes?: string }>();

  const { mutate: enroll, isPending } = useEnrollCourse();
  const { user } = useUserStore();
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const onSubmit = (data: { notes?: string }) => {
    if (!user) {
      toast.error("User not found. Please register first.");
      return;
    }

    const enrollmentData = {
      userId: user.id,
      courseId: course.id,
      notes: data.notes || "",
    };

    enroll(enrollmentData, {
      onSuccess: (response) => {
        toast.success("Enrollment successful! Proceeding to payment...");
        setEnrollmentId(response.enrollment.id);
        setShowPayment(true);
      },
      onError: (error) => {
        toast.error(error.message || "Enrollment failed");
      },
    });
  };

  if (showPayment && enrollmentId) {
    return (
      <PaymentModal
        enrollmentId={enrollmentId}
        coursePrice={Math.max(0, Number(course.amount ?? 0))}
        onBack={() => setShowPayment(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-secondary rounded-lg max-w-md w-full">
        <div className="border-b border-border px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Enrollment Details</h2>
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            ←
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Course</label>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold">{course.name}</p>
              <p className="text-sm text-muted-foreground">
                GHS {course.amount}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Enrollee Name
            </label>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold">{user?.fullName}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Additional Notes (Optional)
            </label>
            <Textarea
              {...register("notes")}
              placeholder="Eg: I am a total beginner interested in web development"
              rows={3}
            />
            {errors.notes && (
              <p className="text-destructive text-sm mt-1">
                {errors.notes.message}
              </p>
            )}
          </div>

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
              "Continue to Payment"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
