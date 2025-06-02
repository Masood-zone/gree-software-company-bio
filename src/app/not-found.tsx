import Image from "next/image";
import React from "react";
import GreeLogo from "../../public/gree-logo-black.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="bg-background py-24">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center max-w-3xl w-full mx-auto">
          <Link
            href="/"
            className="mb-8 sm:inline-flex flex-col items-center gap-2.5 text-2xl font-bold text-black dark:text-white md:text-3xl"
            aria-label="logo"
          >
            <Image
              src={GreeLogo}
              alt="Gree Software Company Logo"
              className="w-32 h-32 rounded-full object-cover"
            />
            <span>Gree Software Company</span>
          </Link>

          <p className="mb-4 text-sm font-semibold uppercase text-red-500 dark:text-red-400 md:text-base">
            That’s a 404
          </p>
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
            Page not found
          </h1>

          <p className="mb-8 max-w-screen-md text-center text-gray-500 dark:text-gray-400 md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>
          <div>
            <Button variant="default" size="lg" asChild>
              <Link href="/" className="w-full">
                Go home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
