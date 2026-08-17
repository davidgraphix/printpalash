"use client";

import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "@/lib/site";

const CHAT_LINK = whatsappLink(
  "Hello PrintPalash, I am interested in your printing services. Please tell me more about your products and pricing."
);

export default function WhatsAppButton() {
  return (
    <a
      href={CHAT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with PrintPalash on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 sm:px-5 sm:py-3 sm:text-base"
    >
      <FaWhatsapp aria-hidden className="text-xl sm:text-2xl" />
      <span className="hidden sm:inline">Chat with us</span>
      <span className="sm:hidden">Chat</span>
    </a>
  );
}
