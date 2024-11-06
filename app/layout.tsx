import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/Progressbar";
import AuthProvider from "@/components/AuthProvider";

// export const metadata: Metadata = {
//   title: "VertechX",
// };

export const display = localFont({
  src: "../assets/fonts/Thunder-VF.ttf",
  variable: "--font-display",
  display: "swap",
});

export const space = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} antialiased bg-background text-white`}
      >
        <AuthProvider>
          <ProgressBar />
          <Navbar />
          {children}

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
