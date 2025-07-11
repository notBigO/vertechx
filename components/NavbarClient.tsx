"use client";

import { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: sessionData } = useSession();
  const session = sessionData ?? initialSession;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

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
    <nav className="w-full z-50 transition-all duration-300  bg-black">
      <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4 max-w-screen-xl">
        <div className="w-full flex items-center justify-between h-24">
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="w-[80px] h-[50px] relative">
              <Image
                src={MVJLogo}
                alt="MVJ Logo"
                className="object-contain"
                fill
                sizes="80px"
                priority
              />
            </div>
            <div className="w-[100px] h-[50px] relative ml-4">
              <Image
                src={Logo}
                alt="Logo"
                className="object-contain"
                fill
                sizes="100px"
                priority
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10 md:mr-20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium hover:text-primary transition whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center flex-shrink-0">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all w-10 h-10 flex-shrink-0">
                    <AvatarImage
                      src={session.user?.image || undefined}
                      referrerPolicy="no-referrer"
                      alt={session.user?.name || "User Avatar"}
                    />
                    <AvatarFallback className="text-sm">
                      {getInitials(session.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {session.user?.name}
                      </span>
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
                className="bg-primary hover:bg-secondary whitespace-nowrap text-base"
                onClick={() => signIn("google")}
              >
                Login to Register
              </Button>
            )}
          </div>

          <div className="md:hidden flex items-center flex-shrink-0">
            <button
              className={`text-2xl transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45" : ""
              }`}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <div
          className={`
            w-full md:hidden absolute top-24 left-0 overflow-hidden transition-all duration-300 ease-in-out z-40
            ${
              isMenuOpen
                ? "max-h-[1000px] opacity-100 visible"
                : "max-h-0 opacity-0 invisible"
            }
          `}
        >
          <div className="flex flex-col items-center py-4 space-y-4 bg-background">
            {session && (
              <div className="flex flex-col items-center mb-4">
                <Avatar className="w-16 h-16 mb-2">
                  <AvatarImage
                    src={session.user?.image || undefined}
                    referrerPolicy="no-referrer"
                    alt={session.user?.name || "User Avatar"}
                  />
                  <AvatarFallback className="text-2xl">
                    {getInitials(session.user?.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-base">
                  {session.user?.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {session.user?.email}
                </span>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-2 text-base font-medium hover:text-primary transition w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {session ? (
              <Button
                variant="destructive"
                className="mt-4 w-full text-base"
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                className="bg-primary mt-4 w-full hover:bg-secondary text-base"
                onClick={() => signIn("google")}
              >
                Login to Register
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarClient;
