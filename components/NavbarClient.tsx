"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import MVJLogo from "@/assets/mvj.webp";
import Logo from "@/assets/logo.png";
import { navLinks } from "@/lib/constants";
import { Button } from "./ui/button";
import { FiMenu, FiX } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";

interface NavbarClientProps {
  initialSession: Session | null;
}

const NavbarClient = ({ initialSession }: NavbarClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: sessionData } = useSession();

  // Use the initial session from SSR, falling back to client-side session
  const session = sessionData ?? initialSession;

  const getInitials = (name?: string | null) => {
    if (!name) return "UN";
    return name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="h-24 border-b border-[#43434370] z-50 w-full">
      <div className="container mx-auto h-full flex items-center justify-between px-4 md:px-4 max-w-screen-xl">
        {/* Logo and Branding */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src={MVJLogo}
              alt="MVJ Logo"
              width={80}
              height={50}
              className="object-contain"
            />
            <Image
              src={Logo}
              alt="Logo"
              width={100}
              height={50}
              className="object-contain ml-4"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm hover:text-primary transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden md:flex items-center">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all w-10 h-10">
                  <AvatarImage
                    src={session.user?.image ?? undefined}
                    alt={session.user?.name || "User Avatar"}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {getInitials(session.user?.name)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{session.user?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="bg-primary hover:bg-secondary"
              onClick={() => signIn("google")}
            >
              Register Now!
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {session ? (
            <Avatar
              className="mr-4 w-10 h-10 cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <AvatarImage
                src={session.user?.image ?? undefined}
                alt={session.user?.name || "User Avatar"}
                className="object-cover"
              />
              <AvatarFallback>{getInitials(session.user?.name)}</AvatarFallback>
            </Avatar>
          ) : null}
          <button
            className="text-2xl"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="fixed top-24 left-0 w-full bg-background shadow-lg md:hidden flex flex-col items-center py-4 z-50 px-4">
            {session && (
              <div className="flex flex-col items-center mb-4">
                <Avatar className="w-16 h-16 mb-2">
                  <AvatarImage
                    src={session.user?.image ?? undefined}
                    alt={session.user?.name || "User Avatar"}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl">
                    {getInitials(session.user?.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{session.user?.name}</span>
                <span className="text-sm text-muted-foreground">
                  {session.user?.email}
                </span>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-2 text-lg hover:text-primary transition w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {session ? (
              <Button
                variant="destructive"
                className="mt-4 w-full"
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                className="bg-primary mt-4 w-full hover:bg-secondary"
                onClick={() => signIn("google")}
              >
                Register Now!
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarClient;
