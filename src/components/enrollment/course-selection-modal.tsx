"use client";
import { useState } from "react";
import { useCourses } from "@/services/enrollments/courses";
import { useUserStore } from "@/stores/user-store";
import EnrollmentFormModal from "./enrollment-form-modal";
import type { Course } from "@/types/enrollment";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CourseSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CourseSelectionModal({
  open,
  onOpenChange,
}: CourseSelectionModalProps) {
  const { data: courses, isLoading, error } = useCourses();
  const { user } = useUserStore();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);

  if (!open) return null;

  const handleEnrollClick = (course: Course) => {
    setSelectedCourse(course);
    setShowEnrollmentForm(true);
  };

  const handleBackToSelection = () => {
    setShowEnrollmentForm(false);
    setSelectedCourse(null);
  };

  if (showEnrollmentForm && selectedCourse) {
    return (
      <EnrollmentFormModal
        course={selectedCourse}
        onBack={handleBackToSelection}
        onClose={() => {
          onOpenChange(false);
          setShowEnrollmentForm(false);
          setSelectedCourse(null);
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-secondary rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-secondary border-b border-border p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Select a Course</h2>
            {user && (
              <p className="text-sm text-muted-foreground mt-1">
                Welcome, {user.fullName}
              </p>
            )}
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">
                Failed to load courses. Please try again.
              </p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : courses && courses.length > 0 ? (
            <div className="grid gap-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      GHS {course.priceMinor || 0}
                    </span>
                    <Button
                      onClick={() => handleEnrollClick(course)}
                      className="rounded-full"
                    >
                      Enroll Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No courses available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
