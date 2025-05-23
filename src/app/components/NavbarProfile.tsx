"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession(); // status penting

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  if (status === "loading") {
    return null; // Atau tampilkan spinner/loading sementara
  }

  const role = session?.user?.role;

  const filteredNavLinks = navLinks.filter((link) => {
    if (role === "CUSTOMER") {
      return link.href.includes("Settings") || link.href.includes("Profile");
    }
    return true;
  });

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4 relative z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo-ehub.svg"
            alt="INDOEVENTHUB Logo"
            width={40}
            height={40}
          />
          <h1 className="text-xl font-bold text-blue-700 tracking-wide">
            <Link href="/"> INDOEVENTHUB </Link>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {filteredNavLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Button */}
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-3 bg-gray-50 rounded-lg shadow-md px-4 py-3">
          {filteredNavLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="block text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

// Semua menu
const navLinks = [{ label: "Dashboard", href: "/admin/dashboard" }];

export default AdminNavbar;
