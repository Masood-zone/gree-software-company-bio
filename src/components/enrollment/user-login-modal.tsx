"use client";
import { useLoginUser } from "@/services/users/users";
import { useUserStore } from "@/stores/user-store";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface UserLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setShowRegistrationModal?: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function UserLoginModal({
  open,
  onOpenChange,
  setShowRegistrationModal,
  onSuccess,
}: UserLoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: loginUserMutation, isPending } = useLoginUser();
  const { setUser } = useUserStore();

  const onSubmit = (data: { email: string; password: string }) => {
    loginUserMutation(data, {
      onSuccess: (user) => {
        toast.success(`Welcome back, ${user.fullName}!`);
        setUser(user);
        onOpenChange(false);
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message || "Login failed");
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
            <h2 className="text-2xl font-bold">User Login</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Please enter your credentials to log in.
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
        {/* User Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 space-y-4 py-4">
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
            <label className="block text-sm font-medium mb-2">Password *</label>
            <div className="relative">
              <Input
                {...register("password", { required: "Password is required" })}
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
                Logging In...
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </form>
        {/* User Login - Modal Redirection */}
        <div className="px-6 pb-2">
          <span>Don&apos;t have an account? </span>
          <button
            onClick={() => {
              onOpenChange(false);
              setShowRegistrationModal?.(true);
            }}
            className="hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
