"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserRegistrationModal from "./user-registeration-modal";
import CourseSelectionModal from "./course-selection-modal";
import { useUserStore } from "@/stores/user-store";
import UserLoginModal from "./user-login-modal";

export default function Banner() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
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

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Gree Software Academy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your career with industry-leading software development
            courses. Learn from experts and build real-world projects.
          </p>
          <Button size="lg" onClick={handleJoinNow} className="rounded-full">
            Join Now
          </Button>
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

      <UserLoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        setShowRegistrationModal={setShowRegistrationModal}
        onSuccess={handleRegistrationSuccess}
      />
    </>
  );
}
