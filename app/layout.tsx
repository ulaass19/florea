import type {
  Metadata,
} from "next";

import "./globals.css";

import {
  CartProvider,
} from "@/context/CartContext";

import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata =
  {
    title:
      "Florea — Çiçekten Daha Fazlası",

    description:
      "Duygularınızı çiçeklere dönüştüren premium çiçek deneyimi.",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <CartProvider>
          {children}

          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}