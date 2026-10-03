import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bi Buket Neşe — Çiçek & Balon",

  description:
    "Sevdiklerinize çiçek, buket ve balonlarla unutulmaz anlar gönderin.",

  icons: {
    icon: "/bi-buket-nese-logo.jpg",
    shortcut: "/bi-buket-nese-logo.jpg",
    apple: "/bi-buket-nese-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <CartProvider>
          <Navbar />

          {children}

          <Footer />

          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
