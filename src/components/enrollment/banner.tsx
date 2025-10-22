"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import UserRegistrationModal from "./user-registeration-modal";
import CourseSelectionModal from "./course-selection-modal";
import { useUserStore } from "@/stores/user-store";
import UserLoginModal from "./user-login-modal";
import EnrolledCoursesModal from "./enrolled-courses-modal";
import ResourcesModal from "./resources-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Banner() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEnrolledModal, setShowEnrolledModal] = useState(false);
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const { user } = useUserStore();

  const handleJoinNow = () => {
    if (user) {
      // User already registered, go directly to course selection
      setShowCourseModal(true);
    } else {
      // Show registration modal first
      setShowRegistrationModal(true);
    }
  };

  const handleRegistrationSuccess = () => {
    // After successful registration, open course selection
    setShowCourseModal(true);
  };

  // Listen for global join action from the Embed modal
  // When triggered, open the registration modal
  useEffect(() => {
    const handler = () => setShowRegistrationModal(true);
    window.addEventListener("gree:open-registration", handler);
    return () => window.removeEventListener("gree:open-registration", handler);
  }, []);

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10 relative">
        {/* Section */}
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Gree Software Academy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your career with industry-leading software development
            courses. Learn from experts and build real-world projects.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button size="lg" onClick={handleJoinNow} className="rounded-full">
              Join Now
            </Button>
            {user && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowEnrolledModal(true)}
                  className="rounded-full"
                >
                  Enrolled Courses
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowResourcesModal(true)}
                  className="rounded-full"
                >
                  Resources
                </Button>
              </>
            )}
          </div>
        </div>
        {/* User Avatar */}
        <div className="absolute top-4 right-4">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:bg-muted-foreground/10 rounded-md p-2">
                <div className="flex items-center justify-between space-x-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {user.fullName
                      ? user.fullName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  {/* Text */}
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{user.email}</span>
                    <span className="text-sm font-medium">{user.fullName}</span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Courses</DropdownMenuItem>
                <Button
                  onClick={() => {
                    useUserStore.getState().clearUser();
                  }}
                  variant="destructive"
                  className="w-full"
                  size="sm"
                >
                  Log out
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </section>

      <UserRegistrationModal
        open={showRegistrationModal}
        onOpenChange={setShowRegistrationModal}
        setShowLoginModal={setShowLoginModal}
        onSuccess={handleRegistrationSuccess}
      />

      <CourseSelectionModal
        open={showCourseModal}
        onOpenChange={setShowCourseModal}
      />

      <EnrolledCoursesModal
        open={showEnrolledModal}
        onOpenChange={setShowEnrolledModal}
      />

      <ResourcesModal
        open={showResourcesModal}
        onOpenChange={setShowResourcesModal}
      />

      <UserLoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        setShowRegistrationModal={setShowRegistrationModal}
        onSuccess={handleRegistrationSuccess}
      />
    </>
  );
}
