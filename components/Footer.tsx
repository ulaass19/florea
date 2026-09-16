"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "905538440139";

export default function Footer() {
  const handleWhatsApp = () => {
    const message =
      "Merhaba Bi Buket Neşe 🌸 Ürünler ve teslimat hakkında bilgi almak istiyorum.";

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <footer className="siteFooter">
      <div className="siteFooterTop">
        <motion.div
          className="siteFooterBrand"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <a href="/" className="siteFooterLogo">
            <div className="siteFooterLogoCircle">
              <img
                src="/bi-buket-nese-logo.jpg"
                alt="Bi Buket Neşe Çiçek ve Balon"
              />
            </div>
          </a>

          <p className="siteFooterEyebrow">
            Bİ BUKET NEŞE
          </p>

          <h2>
            Bir buket değil,
            <br />

            <em>bir neşe gönder.</em>
          </h2>

          <p className="siteFooterDescription">
            Çiçek, buket ve balonlarla özel anlarını daha anlamlı hale
            getiriyoruz.
          </p>

          <button
            type="button"
            className="siteFooterWhatsApp"
            onClick={handleWhatsApp}
          >
            WhatsApp&apos;tan Yaz

            <span>→</span>
          </button>
        </motion.div>

        <div className="siteFooterMenus">
          <div className="siteFooterMenu">
            <span>KEŞFET</span>

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
          </div>

          <div className="siteFooterMenu">
            <span>BİLGİ</span>

            <a href="/hakkimizda">
              Hakkımızda
            </a>

            <a href="/teslimat">
              Teslimat
            </a>

            <a href="/iletisim">
              İletişim
            </a>
          </div>

          <div className="siteFooterMenu">
            <span>İLETİŞİM</span>

            <a
              href="tel:+905538440139"
            >
              Telefon
            </a>

            <button
              type="button"
              onClick={handleWhatsApp}
            >
              WhatsApp
            </button>

            <span className="siteFooterSocial">
              @bibuketnese
            </span>
          </div>
        </div>
      </div>

      <div className="siteFooterDivider" />

      <div className="siteFooterBottom">
        <p>
          © {new Date().getFullYear()} Bi Buket Neşe. Tüm hakları saklıdır.
        </p>

        <div>
          <span>
            Çiçek &amp; Balon
          </span>

          <span className="siteFooterDot">
            •
          </span>

          <span>
            Siparişler WhatsApp üzerinden tamamlanır.
          </span>
        </div>
      </div>
    </footer>
  );
}