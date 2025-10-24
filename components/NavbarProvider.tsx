"use client";

import Header from "./Header";

export default function NavbarProvider({ children }: {
  children: React.ReactNode
}) {

  return (
    <>
      <Header />
      {children}
    </>
  );
}