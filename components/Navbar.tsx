"use client";

import {
  motion,
} from "framer-motion";

import {
  useCart,
} from "@/context/CartContext";

export default function Navbar() {
  const {
    itemCount,
    openCart,
  } = useCart();

  return (
    <header className="navbar">
      <div className="navbarInner">
        <motion.a
          href="/"
          className="navbarLogo"
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          aria-label="Bi Buket Neşe Ana Sayfa"
        >
          <div className="navbarLogoCircle">
            <img
              src="/bi-buket-nese-logo.jpg"
              alt="Bi Buket Neşe Çiçek ve Balon"
            />
          </div>
        </motion.a>

        <motion.nav
          className="navLinks"
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.12,
          }}
        >
          <a href="/urunler">
            Ürünler
          </a>

          <a href="/koleksiyonlar">
            Koleksiyonlar
          </a>

          <a href="/balonlar">
            Balonlar
          </a>

          <a href="/buketin-olustur">
            Buketini Oluştur
          </a>
        </motion.nav>

        <motion.div
          className="navActions"
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
        >
          <button
            type="button"
            className="navTextButton"
            onClick={() => {
              window.location.href =
                "/urunler?search=true";
            }}
          >
            Ara
          </button>

          <button
            type="button"
            className="cartButton"
            onClick={openCart}
          >
            Sepet

            <span>
              {itemCount}
            </span>
          </button>
        </motion.div>
      </div>
    </header>
  );
}