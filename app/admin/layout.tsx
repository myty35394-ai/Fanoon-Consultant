import React from "react";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Admin Dashboard | Fanoon Consultants",
  description: "Internal admin dashboard for Fanoon Consultants",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
