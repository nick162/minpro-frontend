"use client";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ToogleDarkMode";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  return (
    <nav className=" container m-auto p-4 right-0 left-0">
      <div className="flex justify-between items-center">
        <div className="logo-event ">
          <Image
            className="cursor-pointer"
            src="/assets/header/logo.svg"
            width={80}
            height={45}
            alt="logo"
            priority
          />
        </div>

        <div className="hidden md:flex justify-between items-center p-2 gap-6 font-semibold">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-indigo-600 transition"
              >
                {link.label}
              </Link>
            );
          })}

          {/* <Link href="/">EventPro</Link>
          <Link href="/service">Service</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link> */}
        </div>
        <ModeToggle />
        <div className="button hidden md:flex justify-between gap-3">
          <Button
            name="btn-signup"
            variant={"outline"}
            className="cursor-pointer bg-orange-500 hover:bg-gray-500  transition"
          >
            Sign Up
          </Button>
          <Button
            name="btn-signin"
            variant={"outline"}
            className="cursor-pointer bg-orange-400 hover:bg-gray-500 transition"
          >
            Sign In
          </Button>
        </div>

        {/*Mobile Menu */}
        <div className="button md:hidden flex justify-between gap-3">
          <Button
            name="btn-signup"
            variant={"outline"}
            className="cursor-pointer hover:text-indigo-500 bg  transition"
          >
            Sign Up
          </Button>
          <Button
            name="btn-signin"
            variant={"outline"}
            className="cursor-pointer hover:text-indigo-500 transition"
          >
            Sign In
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden">
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2">
            <DropdownMenuSeparator />
            {navLinks.map((link) => {
              return (
                <DropdownMenuItem key={link.href}>
                  {" "}
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-indigo-600 transition"
                  >
                    {link.label}
                  </Link>{" "}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <Button onClick={() => sendGAEvent("cara Jago ngoding", "blog", "EE")}>TEST</Button> */}
      </div>
    </nav>
  );
};

export default Navbar;
