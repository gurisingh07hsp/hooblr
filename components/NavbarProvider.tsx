"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function NavbarProvider({ children }: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const hideNavbar = ["/dashboard"].includes(pathname);

  return (
    <>
      {!hideNavbar && <Header />}
      {children}
    </>
  );
}