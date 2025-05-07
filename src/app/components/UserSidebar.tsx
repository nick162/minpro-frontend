"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/user/setting", label: "Setting" },
  { href: "/user/profile", label: "Profile" },
];

export default function UserSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside
        className={cn(
          "fixed md:static top-0 left-0 w-64 h-full bg-white shadow-md transition-transform z-50",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="p-6 font-bold text-xl border-b">User Panel</div>
        <nav className="flex flex-col p-4 gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-gray-700 p-2 rounded hover:bg-gray-200",
                pathname.startsWith(item.href) && "bg-gray-300 font-semibold"
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
