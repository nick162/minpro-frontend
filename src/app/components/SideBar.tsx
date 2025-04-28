"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // optional helper untuk styling active link

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/profile", label: "profile" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/tickets", label: "Tickets" },
  { href: "/admin/transactions", label: "Transactions" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6 font-bold text-xl">Admin Panel</div>
      <nav className="flex flex-col p-4 gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-gray-700 p-2 rounded hover:bg-gray-200",
              pathname.startsWith(item.href) && "bg-gray-300 font-semibold"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
