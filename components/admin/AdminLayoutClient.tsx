"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Bypasses Admin Sidebar and Header completely on the Login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0a0f0b] text-white flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Header */}
        <header className="h-16 border-b border-white/10 bg-[#141b16]/60 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[12px] font-semibold tracking-wider text-white/70 uppercase">
              System Online
            </span>
          </div>

          <div className="flex items-center gap-4 text-[13px] text-white/70">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30 text-[11px] font-bold uppercase tracking-wider">
              ADMIN ROLE
            </span>
            <span>admin@fanoon.com</span>
          </div>
        </header>

        {/* Page Main Content */}
        <main className="flex-1 w-full p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
