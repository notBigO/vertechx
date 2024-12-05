import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk, Birthstone } from "next/font/google";
import "./globals.css";
import Logo from "@/assets/favicon.png";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/Progressbar";
import AuthProvider from "@/components/AuthProvider";

import NavbarServer from "@/components/NavbarServer";
import { Metadata } from "next";
import MegaEventNavbar from "@/components/MegaNavbar";

export const display = localFont({
  src: "../assets/fonts/Thunder-VF.ttf",
  variable: "--font-display",
  display: "swap",
});

export const hero = Birthstone({
  weight: ["400"],
  subsets: ["latin"],
});

export const space = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>VertechX 2024</title>
        <link rel="icon" href={Logo.src} type="image/x-icon" sizes="any" />
        <link rel="icon" href={Logo.src} type="image/png" sizes="32x32" />
        <link rel="icon" href={Logo.src} type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href={Logo.src} sizes="180x180" />
        <link rel="shortcut icon" href={Logo.src} type="image/x-icon" />
      </head>
      <body
        className={`${GeistSans.className} antialiased bg-background text-white`}
      >
        <AuthProvider>
          <ProgressBar />
          <NavbarServer />
          {children}

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
