import React from "react";
import Image from "next/image";
import MVJLogo from "@/assets/mvj.webp";
import { navLinks } from "@/lib/constants";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-background text-white py-10 border-t border-[#43434370]">
      <div className="container mx-auto px-4 md:px-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Branding and About */}
        <div className="flex flex-col items-start gap-4">
          <Link href="/">
            <Image src={MVJLogo} alt="MVJ Logo" width={100} height={50} />
          </Link>
          <p className="text-sm text-gray-400 max-w-xs">
            VertechX is a premier tech fest that brings together the brightest
            minds in technology and innovation. Join us to explore, learn, and
            compete!
          </p>
          <div className="flex gap-4 text-xl text-primary">
            <Link href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF />
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter">
              <FaTwitter />
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram">
              <FaInstagram />
            </Link>
            <Link href="https://linkedin.com" aria-label="LinkedIn">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-primary">Quick Links</h4>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-gray-400 hover:text-primary transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-primary">Contact Us</h4>
          <p className="text-sm text-gray-400">
            MVJ College of Engineering,
            <br />
            Near ITPB, Whitefield,
            <br />
            Bangalore, Karnataka, India
          </p>
          <p className="text-sm text-gray-400">
            Email:{" "}
            <a
              href="mailto:info@vertechx.com"
              className="hover:text-primary transition"
            >
              info@vertechx.com
            </a>
          </p>
          <p className="text-sm text-gray-400">
            Phone:{" "}
            <a
              href="tel:+911234567890"
              className="hover:text-primary transition"
            >
              +91 12345 67890
            </a>
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col gap-2 max-w-xs">
          <h4 className="text-lg font-semibold text-primary">Stay Updated</h4>
          <p className="text-sm text-gray-400">
            Subscribe to our newsletter to get the latest updates about the
            event.
          </p>
          <form className="flex flex-col gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md bg-[#2b3648] border border-[#43434370] text-white focus:border-primary focus:ring-0"
            />
            <Button
              type="submit"
              className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-[#43434370] pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} VertechX. All Rights Reserved. Built
        with ❤️ by MVJ College of Engineering.
      </div>
    </footer>
  );
};

export default Footer;
