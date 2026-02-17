import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter, BioRhyme } from "next/font/google";
import TopBar from "@/components/Home/Topbar";
import Header from "@/components/Home/Header";
import Navbar from "@/components/Navbar/Navbar";

import "@fontsource/aileron";
import "@fontsource/aileron/700.css";
import WhatsAppButton from "@/components/Chat-with-us/WhatsappButton";

const inter = Inter({ subsets: ["latin"] });

const biorhyme = BioRhyme({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700", "800"],
  variable: "--font-biorhyme",
});


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
        <WhatsAppButton />
        <main>{children}</main>
      </body>
    </html>
  );
}
