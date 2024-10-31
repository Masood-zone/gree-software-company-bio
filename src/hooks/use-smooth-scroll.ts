"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useSmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";

    // Scroll to top on route change
    window.scrollTo({ top: 0 });

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, [pathname]);
}
