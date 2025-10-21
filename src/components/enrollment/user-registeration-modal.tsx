"use client";
import { useForm } from "react-hook-form";
import { useRegisterUser } from "@/services/users/users";
import { useUserStore } from "@/stores/user-store";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "../ui/input";

interface UserRegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function UserRegistrationModal({
  open,
  onOpenChange,
  onSuccess,
}: UserRegistrationModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    fullName: string;
    email: string;
    phone: string;
    location: string;
  }>();

  const { mutate: registerUserMutation, isPending } = useRegisterUser();
  const { setUser } = useUserStore();

  const onSubmit = (data: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  }) => {
    registerUserMutation(data, {
      onSuccess: (user) => {
        setUser(user);
        toast.success(`Welcome to Gree Software Academy, ${user.fullName}!`);
        onOpenChange(false);
        onSuccess();
      },
      onError: (error) => {
        toast.error(error.message || "Registration failed");
      },
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-secondary rounded-lg max-w-md w-full">
        <div className="border-b py-4 px-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Join Gree Software Academy</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Create your account to get started
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name *
            </label>
            <Input
              {...register("fullName", { required: "Full name is required" })}
              type="text"
              placeholder="Kwaku Mensah"
            />
            {errors.fullName && (
              <p className="text-destructive text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="mensah@example.com"
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone *</label>
            <Input
              {...register("phone", { required: "Phone is required" })}
              type="tel"
              placeholder="0554476905"
            />
            {errors.phone && (
              <p className="text-destructive text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <Input
              {...register("location", { required: "Location is required" })}
              type="text"
              placeholder="Assin Fosu"
            />
            {errors.location && (
              <p className="text-destructive text-sm mt-1">
                {errors.location.message}
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
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
