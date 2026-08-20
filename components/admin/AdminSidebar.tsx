"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  Users,
  Globe,
  LogOut,
  FileText,
  Briefcase,
  UserCheck,
  Building,
  Receipt,
  Settings,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Overview",      href: "/admin",              icon: LayoutDashboard },
    { name: "Inquiries",     href: "/admin/inquiries",    icon: Inbox },
    { name: "Projects",      href: "/admin/projects",     icon: FolderKanban },
    { name: "Invoices",      href: "/admin/invoices",     icon: Receipt },
    { name: "Banks",         href: "/admin/banks",        icon: Building },
    { name: "Job Postings",  href: "/admin/jobs",         icon: Briefcase },
    { name: "Applications",  href: "/admin/applications", icon: UserCheck },
    { name: "Blog Posts",    href: "/admin/blog",         icon: FileText },
    { name: "Team Members",  href: "/admin/team",         icon: Users },
    { name: "Site Settings", href: "/admin/settings",     icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#141b16] border-r border-white/10 flex flex-col h-screen sticky top-0 flex-shrink-0 z-30">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex flex-col items-center text-center">
        <Link href="/" className="mb-3">
          <Image
            src="/logo.png"
            alt="Fanoon Consultants"
            width={140}
            height={48}
            className="h-10 w-auto object-contain"
          />
        </Link>
        <span className="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">
          ADMIN CONSOLE
        </span>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-3 mb-2">
          Management
        </div>

        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[13.5px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white font-semibold shadow-md shadow-primary/20"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-white/50"}`} />
              {link.name}
            </Link>
          );
        })}

        <div className="pt-6 text-[10px] font-bold uppercase tracking-widest text-white/40 px-3 mb-2">
          Website Link
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[13.5px] font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all duration-200"
        >
          <Globe className="w-5 h-5 text-white/50" />
          View Live Website
        </Link>
      </nav>

      {/* Footer / Sign Out */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={async () => {
            try {
              await signOut();
            } finally {
              window.location.href = "/admin/login";
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-white/80 hover:text-red-400 text-[13px] font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
