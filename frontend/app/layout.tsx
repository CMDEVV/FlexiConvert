import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
890;
import TestSidebar from "@/components/TestSidebar";
import HomeContent from "@/components/HomeContent";
import Tss from "./detail/[id]/page";
import NewSidebar from "@/components/NewSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlexiConvert",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NewSidebar mainContent={children} />
        {/* <TestSidebar mainContent={children} /> */}
        {/* {children} */}
      </body>
    </html>
  );
}
