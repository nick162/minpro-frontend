"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { ModeToggle } from "./ToogleDarkMode";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const Navbar: FC = () => {
  const router = useRouter();
  const session = useSession();

  const logout = () => {
    signOut();
    router.push("/login");
  };

  return (
    <nav className="fixed container m-auto p-4 z-100 left-0 right-0">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="logo-event">
          <Link href="/">
            <Image
              src="/assets/header/logo.svg"
              width={80}
              height={45}
              alt="logo"
              priority
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-indigo-600 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Dark Mode Toggle */}
        <ModeToggle />

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-3">
          {session.data?.user ? (
            <Button
              variant="outline"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="bg-orange-500 hover:bg-gray-500"
              >
                <Link href="/register">Sign Up</Link>
              </Button>
              <Button
                variant="outline"
                className="bg-orange-400 hover:bg-gray-500"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2">
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-indigo-600 transition w-full"
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {session.data?.user ? (
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-500 font-semibold"
                >
                  Logout
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link href="/login" className="w-full">
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/register" className="w-full">
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
