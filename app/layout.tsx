import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/Home/Topbar";
import Header from "@/components/Home/Header";
import Navbar from "@/components/Navbar/Navbar";

import "@fontsource/aileron";
import "@fontsource/aileron/700.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrintPalash - Transforming Your Vision into Vibrant Reality",
  description:
    "Quality printing services in Lagos, Nigeria. Where every print tells your story.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <Header />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
