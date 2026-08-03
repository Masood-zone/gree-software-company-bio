"use client";
import { useForm } from "react-hook-form";
import { useRegisterUser } from "@/services/users/users";
import { useUserStore } from "@/stores/user-store";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { useState } from "react";

interface UserRegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setShowLoginModal: (open: boolean) => void;
  onSuccess: () => void;
}

export default function UserRegistrationModal({
  open,
  onOpenChange,
  setShowLoginModal,
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
    password: string;
    location: string;
  }>();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: registerUserMutation, isPending } = useRegisterUser();
  const { setUser } = useUserStore();

  const onSubmit = (data: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    password: string;
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
        {/* Header */}
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
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 space-y-4">
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

          <div>
            <label className="block text-sm font-medium mb-2">Password *</label>
            <div className="relative">
              <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-sm mt-1">
                {errors.password.message}
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

        {/* User Login - Modal Redirection */}
        <div className="px-6 py-4">
          <span>Already have an account? </span>
          <button
            onClick={() => {
              onOpenChange(false);
              setShowLoginModal(true);
            }}
            className="hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
