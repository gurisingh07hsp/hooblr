"use client"
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function usePreviousRoute() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    // store the last route when path changes
    return () => {
      prevPath.current = pathname;
    };
  }, [pathname]);

  return prevPath.current;
}
