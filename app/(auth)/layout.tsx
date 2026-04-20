import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {Toaster} from 'sonner'
import Separator from "@/components/Separator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarM",
  description: "Generated using next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased bg-white/30 backdrop-blur-md border border-white/10 shadow-2xl z-50 rounded-2xl`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <Toaster />
        <Separator height="h-16" />
        <main className="min-h-[80vh]">
        {children}
        </main>
      </body>
    </html>
  );
}
