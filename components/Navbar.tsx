"use client";

import { useState } from "react";
import Image from "next/image";
import MVJLogo from "@/assets/mvj.webp";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import { navLinks } from "@/utils/constants";
import { Button } from "./ui/button";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="h-24 border-b border-[#43434370] z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4 md:px-0">
        {/* Logo and Branding */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src={MVJLogo} alt="MVJ Logo" width={80} height={50} />
          </Link>

          <Link href="/" className="font-bold text-xl">
            <Image src={Logo} alt="Logo" width={100} height={50} />
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

        {/* Desktop Button */}
        <div className="hidden md:flex">
          <Button className="bg-primary">Register Now!</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-2xl"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-24 left-0 w-full bg-background shadow-lg md:hidden flex flex-col items-center py-4 z-50">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-2 text-lg hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
              >
                {link.name}
              </Link>
            ))}
            <Button className="bg-primary mt-4 w-10/12">Register Now!</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
