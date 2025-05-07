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
import { FC, useMemo } from "react";
import { ModeToggle } from "./ToogleDarkMode";

const Navbar: FC = () => {
  const router = useRouter();
  const session = useSession();
  const role = session.data?.user?.role;

  const navLinks = useMemo(() => {
    if (role === "EVENT_ORGANIZER") {
      return [{ href: "/admin/profile", label: "Setting" }];
    } else if (role === "CUSTOMER") {
      return [{ href: "/user/profile", label: "Setting" }];
    }
    return [];
  }, [role]);

  const logout = () => {
    signOut();
    router.push("/login");
  };

  return (
    <nav className="container m-auto p-4 left-0 right-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo-ehub.svg"
            alt="INDOEVENTHUB Logo"
            width={40}
            height={40}
          />
          <h1 className="text-xl font-bold text-blue-700 tracking-wide">
            <Link href="/">INDOEVENTHUB</Link>
          </h1>
        </div>

        <ModeToggle />

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
