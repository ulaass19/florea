"use client";

import {
  motion,
} from "framer-motion";

export default function AboutPage() {
  return (
    <main className="aboutPage">
      <section className="aboutHero">
        <motion.div
          className="aboutHeroContent"
          initial={{
            opacity: 0,
            y: 28,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
          }}
        >
          <p>
            Bİ BUKET NEŞE
          </p>

          <h1>
            Küçük bir jest,
            <br />

            <em>
              büyük bir neşe.
            </em>
          </h1>

          <span>
            Çiçekleri sadece
            göndermiyoruz;
            duygulara eşlik eden
            anılar hazırlıyoruz.
          </span>
        </motion.div>
      </section>

      <section className="aboutIntro">
        <motion.div
          className="aboutIntroTitle"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <p>
            BİZ KİMİZ?
          </p>

          <h2>
            Her buketin
            <br />

            <em>
              bir hikâyesi var.
            </em>
          </h2>
        </motion.div>

        <motion.div
          className="aboutIntroText"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
        >
          <p>
            Bi Buket Neşe,
            özel anları daha
            anlamlı hâle getirmek
            için çiçek ve balonu
            aynı duygunun içinde
            buluşturan butik bir
            markadır.
          </p>

          <p>
            Hazırladığımız her
            siparişte renk
            uyumundan paketlemeye,
            kart mesajından son
            dokunuşa kadar bütün
            detaylara özen
            gösteriyoruz.
          </p>

          <p>
            Çünkü bazen
            söylemek istediğin
            şey bir cümleden
            daha fazlasıdır.
            Bazen bir buket,
            bazen birkaç balon,
            bazen de sadece
            “aklımdasın”
            demektir.
          </p>
        </motion.div>
      </section>

      <section className="aboutImageSection">
        <motion.div
          className="aboutMainImage"
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1800&q=90"
            alt="Çiçek hazırlığı"
          />

          <div className="aboutImageOverlay" />

          <div className="aboutImageText">
            <span>
              Bİ BUKET NEŞE
            </span>

            <h2>
              Duyguyu
              <br />

              <em>
                sen seç.
              </em>
            </h2>

            <p>
              Gerisini biz
              özenle hazırlayalım.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="aboutValues">
        <div className="aboutValuesHeader">
          <p>
            BİZİM İÇİN ÖNEMLİ
          </p>

          <h2>
            Detaylarda
            <em> neşe var.</em>
          </h2>
        </div>

        <div className="aboutValuesGrid">
          {[
            {
              number: "01",
              title:
                "Özenli Hazırlık",
              text:
                "Her siparişi tek tek, seçilen detaylara göre hazırlıyoruz.",
            },
            {
              number: "02",
              title:
                "Kişiselleştirme",
              text:
                "Çiçek, paket, kart ve mesaj detaylarını sana göre şekillendiriyoruz.",
            },
            {
              number: "03",
              title:
                "Hızlı İletişim",
              text:
                "Sipariş detaylarını WhatsApp üzerinden hızlı ve doğrudan netleştiriyoruz.",
            },
            {
              number: "04",
              title:
                "Özel Anlar",
              text:
                "Doğum gününden içinden geldiği bir ana kadar her sebebe eşlik ediyoruz.",
            },
          ].map(
            (
              item,
              index
            ) => (
              <motion.article
                key={
                  item.number
                }
                className="aboutValueCard"
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  delay:
                    index *
                    0.06,
                }}
              >
                <span>
                  {
                    item.number
                  }
                </span>

                <h3>
                  {
                    item.title
                  }
                </h3>

                <p>
                  {
                    item.text
                  }
                </p>
              </motion.article>
            )
          )}
        </div>
      </section>

      <section className="aboutCTA">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <span>
            ŞİMDİ BİR NEŞE SEÇ
          </span>

          <h2>
            Birine
            <em> iyi gelsin.</em>
          </h2>

          <div className="aboutCTAButtons">
            <a href="/urunler">
              Ürünleri Keşfet

              <span>
                →
              </span>
            </a>

            <a
              href="/buketin-olustur"
              className="secondary"
            >
              Buketini Oluştur
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}