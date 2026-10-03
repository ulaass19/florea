"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
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

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  /*
   * Mobil menü açıkken body scroll'unu kapat.
   */
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /*
   * ESC ile menüyü kapat.
   */
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape"
      ) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSearch = () => {
    closeMobileMenu();

    window.location.href =
      "/urunler?search=true";
  };

  const handleCart = () => {
    closeMobileMenu();
    openCart();
  };

  return (
    <>
      <header
        className={`navbar ${
          mobileMenuOpen
            ? "mobileMenuIsOpen"
            : ""
        }`}
      >
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
            onClick={
              closeMobileMenu
            }
          >
            <div className="navbarLogoCircle">
              <img
                src="/bi-buket-nese-logo.jpg"
                alt="Bi Buket Neşe Çiçek ve Balon"
              />
            </div>
          </motion.a>

          {/* DESKTOP MENU */}
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

            <a href="/create-balloon">
              Balonunu Oluştur
            </a>
          </motion.nav>

          {/* DESKTOP ACTIONS */}
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
              onClick={
                handleSearch
              }
            >
              Ara
            </button>

            <button
              type="button"
              className="cartButton"
              onClick={
                handleCart
              }
            >
              Sepet

              <span>
                {itemCount}
              </span>
            </button>

            {/* MOBILE HAMBURGER */}
            <button
              type="button"
              className={`mobileMenuButton ${
                mobileMenuOpen
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setMobileMenuOpen(
                  (current) =>
                    !current,
                )
              }
              aria-label={
                mobileMenuOpen
                  ? "Menüyü kapat"
                  : "Menüyü aç"
              }
              aria-expanded={
                mobileMenuOpen
              }
            >
              <span />
              <span />
            </button>
          </motion.div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobileNavOverlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <motion.div
              className="mobileNavPanel"
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.35,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              <nav className="mobileNavLinks">
                <motion.a
                  href="/urunler"
                  onClick={
                    closeMobileMenu
                  }
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.05,
                  }}
                >
                  <span>
                    01
                  </span>

                  Ürünler

                  <strong>
                    →
                  </strong>
                </motion.a>

                <motion.a
                  href="/koleksiyonlar"
                  onClick={
                    closeMobileMenu
                  }
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.1,
                  }}
                >
                  <span>
                    02
                  </span>

                  Koleksiyonlar

                  <strong>
                    →
                  </strong>
                </motion.a>

                <motion.a
                  href="/balonlar"
                  onClick={
                    closeMobileMenu
                  }
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.15,
                  }}
                >
                  <span>
                    03
                  </span>

                  Balonlar

                  <strong>
                    →
                  </strong>
                </motion.a>

                <motion.a
                  href="/create-balloon"
                  onClick={
                    closeMobileMenu
                  }
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className="mobileCreateBalloon"
                >
                  <span>
                    04
                  </span>

                  Balonunu Oluştur

                  <strong>
                    ↗
                  </strong>
                </motion.a>
              </nav>

              <div className="mobileNavBottom">
                <button
                  type="button"
                  onClick={
                    handleSearch
                  }
                >
                  <small>
                    ARA
                  </small>

                  <span>
                    Ürün ara
                  </span>

                  <strong>
                    →
                  </strong>
                </button>

                <button
                  type="button"
                  onClick={
                    handleCart
                  }
                >
                  <small>
                    SEPET
                  </small>

                  <span>
                    Sepeti Gör
                  </span>

                  <strong className="mobileCartCount">
                    {itemCount}
                  </strong>
                </button>
              </div>

              <div className="mobileNavFooter">
                <span>
                  Bİ BUKET NEŞE
                </span>

                <span>
                  ÇİÇEK & BALON
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
