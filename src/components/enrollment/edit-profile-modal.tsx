"use client";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/stores/user-store";
import { useUpdateUserProfile } from "@/services/users/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileModal({
  open,
  onOpenChange,
}: EditProfileModalProps) {
  const { user, setUser } = useUserStore();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{
    fullName: string;
    email: string;
    phone: string;
    location: string;
    password?: string;
  }>({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      password: "",
    },
  });
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (open) {
      reset({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        location: user?.location || "",
        password: "",
      });
    }
  }, [open, user, reset]);

  if (!open) return null;
  if (!user) return null;

  const onSubmit = (data: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    password?: string;
  }) => {
    updateProfile(
      {
        id: user.id,
        ...data,
        password: data.password?.trim() ? data.password : undefined,
      },
      {
        onSuccess: (updated) => {
          setUser(updated);
          toast.success("Profile updated successfully");
          onOpenChange(false);
        },
        onError: (err: unknown) => {
          const message =
            typeof err === "object" && err && "message" in err
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (err as any).message
              : "Failed to update profile";
          toast.error(message);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-secondary rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="border-b py-4 px-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Update your account details
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
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
            <label className="block text-sm font-medium mb-2">Email</label>
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
            <label className="block text-sm font-medium mb-2">Phone</label>
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
            <label className="block text-sm font-medium mb-2">Location</label>
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
            <label className="block text-sm font-medium mb-2">
              New Password (optional)
            </label>
            <div className="relative">
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                Saving Changes...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
