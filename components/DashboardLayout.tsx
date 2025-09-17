// components/DashboardLayout.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/dashboard/analytics" },
    { name: "Documents", path: "/dashboard/documents" },
    { name: "Notifications", path: "/dashboard/notifications" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <div className="p-4 font-bold text-xl">DemoOne</div>
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className={`p-3 rounded-md ${
                  pathname === item.path ? "bg-blue-100 text-blue-600" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="font-medium">John Doe</div>
          <div className="text-sm text-gray-500">Senior Administrator</div>
          <button className="mt-3 text-red-500">Logout</button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
