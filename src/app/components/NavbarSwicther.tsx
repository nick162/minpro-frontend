// app/components/NavbarSwitcher.tsx
"use client";

import { usePathname } from "next/navigation";

import Navbar from "./Navbar";
import AdminNavbar from "./NavbarProfile";

export default function NavbarSwitcher() {
  const pathname = usePathname();

  const isAdminPage =
    pathname.startsWith("/admin") || pathname.startsWith("/user");

  return isAdminPage ? <AdminNavbar /> : <Navbar />;
}
