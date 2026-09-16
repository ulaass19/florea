"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "905538440139";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsApp = () => {
    const whatsappMessage = `
Merhaba Bi Buket Neşe 🌸

${name ? `Adım: ${name}` : ""}

${message || "Sipariş ve ürünler hakkında bilgi almak istiyorum."}
    `.trim();

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="contactPage">
      <section className="contactHero">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <p>Bİ BUKET NEŞE / İLETİŞİM</p>

          <h1>
            Bir neşe
            <br />

            <em>uzakta değil.</em>
          </h1>

          <span>
            Sipariş, teslimat veya özel tasarım taleplerin için bize
            kolayca ulaşabilirsin.
          </span>
        </motion.div>
      </section>

      <section className="contactContainer">
        <div className="contactInfoSide">
          <motion.div
            className="contactSectionTitle"
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
            <p>BİZE ULAŞ</p>

            <h2>
              Ne sormak
              <br />

              <em>istersen sor.</em>
            </h2>

            <span>
              Siparişten önce ürün, fiyat, teslimat bölgesi veya özel
              isteklerin hakkında bizimle doğrudan iletişim kurabilirsin.
            </span>
          </motion.div>

          <div className="contactCards">
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="contactInfoCard"
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
                duration: 0.5,
              }}
            >
              <span>01</span>

              <div>
                <small>WHATSAPP</small>

                <h3>+90 553 844 01 39</h3>

                <p>
                  Sipariş ve teslimat için en hızlı iletişim kanalımız.
                </p>
              </div>

              <strong>→</strong>
            </motion.a>

            <motion.a
              href="tel:+905538440139"
              className="contactInfoCard"
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
                duration: 0.5,
                delay: 0.05,
              }}
            >
              <span>02</span>

              <div>
                <small>TELEFON</small>

                <h3>+90 553 844 01 39</h3>

                <p>
                  Uygun olduğumuz saatlerde doğrudan bizi arayabilirsin.
                </p>
              </div>

              <strong>→</strong>
            </motion.a>

            <motion.div
              className="contactInfoCard"
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
                duration: 0.5,
                delay: 0.1,
              }}
            >
              <span>03</span>

              <div>
                <small>INSTAGRAM</small>

                <h3>@bibuketnese</h3>

                <p>
                  Yeni buketlerimizi ve tasarımlarımızı sosyal medyadan takip
                  edebilirsin.
                </p>
              </div>

              <strong>↗</strong>
            </motion.div>
          </div>
        </div>

        <motion.aside
          className="contactMessageBox"
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
          }}
        >
          <p>HIZLI MESAJ</p>

          <h2>
            Bize bir
            <em> mesaj bırak.</em>
          </h2>

          <span className="contactMessageDescription">
            Mesajını yaz, seni doğrudan WhatsApp&apos;a yönlendirelim.
          </span>

          <label>
            <span>Adın</span>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Adını yaz"
            />
          </label>

          <label>
            <span>Mesajın</span>

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Nasıl yardımcı olabiliriz?"
              maxLength={500}
            />

            <small>{message.length}/500</small>
          </label>

          <button type="button" onClick={handleWhatsApp}>
            WhatsApp&apos;tan Gönder

            <span>→</span>
          </button>

          <small className="contactPrivacy">
            Bu form herhangi bir veri kaydetmez. Mesajın doğrudan WhatsApp
            üzerinden gönderilir.
          </small>
        </motion.aside>
      </section>

      <section className="contactQuickInfo">
        <div>
          <span>01</span>

          <strong>Sipariş</strong>

          <p>Ürününü seç ve WhatsApp üzerinden bize ilet.</p>
        </div>

        <div>
          <span>02</span>

          <strong>Teslimat</strong>

          <p>Adres, tarih ve teslimat saatini birlikte netleştirelim.</p>
        </div>

        <div>
          <span>03</span>

          <strong>Özel Tasarım</strong>

          <p>Aklındaki buketi veya balon konseptini bize anlat.</p>
        </div>
      </section>

      <section className="contactHours">
        <div className="contactHoursContent">
          <div>
            <p>İLETİŞİM SAATLERİ</p>

            <h2>
              Neşeye
              <em> ulaşmak kolay.</em>
            </h2>
          </div>

          <div className="contactHoursText">
            <p>
              Sipariş ve teslimat taleplerine mümkün olan en kısa sürede
              dönüş yapıyoruz.
            </p>

            <span>
              Yoğun özel günlerde yanıt süreleri normalden biraz daha uzun
              olabilir.
            </span>
          </div>
        </div>
      </section>

      <section className="contactBottomCTA">
        <motion.div
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
          <span>HAZIRSAN BAŞLAYALIM</span>

          <h2>
            Bir buket
            <em> seçelim mi?</em>
          </h2>

          <div>
            <a href="/urunler">
              Ürünleri Gör

              <span>→</span>
            </a>

            <a href="/buketin-olustur" className="secondary">
              Buketini Oluştur
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}