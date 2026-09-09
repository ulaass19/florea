"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import {
  useCart,
} from "@/context/CartContext";

const moods = [
  {
    title: "Seni Seviyorum",
    text: "Kırmızı güller, yoğun tonlar ve güçlü bir ifade.",
  },
  {
    title: "Özür Dilerim",
    text: "Daha sakin, zarif ve yumuşak bir seçim.",
  },
  {
    title: "İyi ki Doğdun",
    text: "Canlı renkler ve enerjik bir buket.",
  },
  {
    title: "İçimden Geldi",
    text: "Sebepsiz ama unutulmayacak bir jest.",
  },
];

function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
    Scroll ilerledikçe:
    0.00 → ürün küçük
    0.20 → ürün büyüyor
    0.35 → ilk metin gidiyor
    0.50 → ikinci metin geliyor
    0.70 → ikinci metin gidiyor
    0.82 → final geliyor
  */

  const flowerScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    [0.72, 0.92, 1.08, 1.18, 1.25]
  );

  const flowerY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [80, 0, -25]
  );

  const flowerRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-3, 0, 2]
  );

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.08]
  );

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [0.28, 0.42, 0.55]
  );

  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.28, 0.38],
    [0, 1, 1, 0]
  );

  const introY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.38],
    [60, 0, -60]
  );

  const detailOpacity = useTransform(
    scrollYProgress,
    [0.34, 0.46, 0.64, 0.73],
    [0, 1, 1, 0]
  );

  const detailX = useTransform(
    scrollYProgress,
    [0.34, 0.48, 0.73],
    [60, 0, -30]
  );

  const packagingOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.67, 0.76],
    [0, 1, 0]
  );

  const packagingX = useTransform(
    scrollYProgress,
    [0.55, 0.67, 0.76],
    [-70, 0, 40]
  );

  const finalOpacity = useTransform(
    scrollYProgress,
    [0.74, 0.86, 1],
    [0, 1, 1]
  );

  const finalY = useTransform(
    scrollYProgress,
    [0.74, 0.88],
    [60, 0]
  );

  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      ref={sectionRef}
      className="productShowcase"
    >
      <div className="productSticky">
        <motion.div
          className="showcaseBackground"
          style={{
            scale: backgroundScale,
            opacity: backgroundOpacity,
          }}
        />

        <div className="showcaseShade" />

        <div className="showcaseTop">
          <span>FLOREA SIGNATURE / 01</span>

          <span>SCROLL TO DISCOVER</span>
        </div>

        <motion.div
          className="showcaseFlower"
          style={{
            scale: flowerScale,
            y: flowerY,
            rotate: flowerRotate,
          }}
        >
          <div className="showcaseFlowerGlow" />

          <img
            src="https://images.unsplash.com/photo-1548094967-e25a127d1f6d?auto=format&fit=crop&w=1600&q=95"
            alt="Gece Yarısı kırmızı gül buketi"
          />
        </motion.div>

        <motion.div
          className="showcaseIntro"
          style={{
            opacity: introOpacity,
            y: introY,
          }}
        >
          <span className="showcaseStep">01</span>

          <p>FLOREA SIGNATURE</p>

          <h2>
            Gece
            <br />
            <em>Yarısı.</em>
          </h2>

          <div className="showcaseLine" />

          <p className="showcaseSmallText">
            Bazı şeyler gece daha kolay söylenir.
          </p>
        </motion.div>

        <motion.div
          className="showcaseDetail"
          style={{
            opacity: detailOpacity,
            x: detailX,
          }}
        >
          <span className="showcaseStep">02</span>

          <p>İÇİNDE</p>

          <h3>
            24
            <span> kırmızı gül</span>
          </h3>

          <p className="detailDescription">
            Tek tek seçilen güller.
            <br />
            Güçlü, zamansız ve doğrudan.
          </p>
        </motion.div>

        <motion.div
          className="showcasePackaging"
          style={{
            opacity: packagingOpacity,
            x: packagingX,
          }}
        >
          <span className="showcaseStep">03</span>

          <p>SON DOKUNUŞ</p>

          <h3>
            Siyah.
            <br />
            <em>Çünkü fazlasına gerek yok.</em>
          </h3>

          <p>
            Mat siyah premium ambalaj.
            <br />
            El işçiliği ile hazırlanır.
          </p>
        </motion.div>

        <motion.div
          className="showcaseFinal"
          style={{
            opacity: finalOpacity,
            y: finalY,
          }}
        >
          <p className="finalEyebrow">
            GECE YARISI / 24 KIRMIZI GÜL
          </p>

          <h2>
            Bir buket değil.
            <br />
            <em>Bir an gönder.</em>
          </h2>

          <div className="finalPurchase">
            <div>
              <small>BAŞLANGIÇ FİYATI</small>
              <strong>₺2.990</strong>
            </div>

            <button
              onClick={() => {
                window.location.href = "/product/gece-yarisi";
              }}
            >
              Hediye Et
              <span>↗</span>
            </button>
          </div>
        </motion.div>

        <div className="showcaseProgress">
          <motion.div
            className="showcaseProgressInner"
            style={{
              width: progressWidth,
            }}
          />
        </div>

        <div className="showcaseProgressLabels">
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
        </div>
      </div>
    </section>
  );
}


function CollectionSection() {
  return (
    <section
      className="collectionSection"
      id="collections"
    >
      <div className="collectionHeader">
        <div>
          <p className="sectionEyebrow">
            FLOREA KOLEKSİYONLARI
          </p>

          <h2>
            Bir çiçek seçme.
            <br />
            <span>Bir his seç.</span>
          </h2>
        </div>

        <p className="collectionIntro">
          Her koleksiyon farklı bir duygu için tasarlandı.
          Bazen yoğun, bazen sakin, bazen de sadece içinden geldiği için.
        </p>
      </div>

      <div className="collectionGrid">
        <motion.a
          href="/product/gece-yarisi"
          className="collectionCard collectionCardLarge"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="collectionCardImage collectionMidnight" />
          <div className="collectionCardOverlay" />

          <div className="collectionCardTop">
            <span>01</span>
            <span>FLOREA SIGNATURE</span>
          </div>

          <div className="collectionCardContent">
            <p>SENİ SEVİYORUM</p>

            <h3>
              Gece
              <br />
              <em>Yarısı.</em>
            </h3>

            <div className="collectionCardBottom">
              <span>Kırmızı Güller</span>
              <span className="collectionArrow">↗</span>
            </div>
          </div>
        </motion.a>

        <motion.a
          href="/product/sessiz-ozur"
          className="collectionCard"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="collectionCardImage collectionSorry" />
          <div className="collectionCardOverlay" />

          <div className="collectionCardTop">
            <span>02</span>
            <span>FLOREA EMOTION</span>
          </div>

          <div className="collectionCardContent">
            <p>ÖZÜR DİLERİM</p>

            <h3>
              Sessiz
              <br />
              <em>Özür.</em>
            </h3>

            <div className="collectionCardBottom">
              <span>Beyaz &amp; Pudra</span>
              <span className="collectionArrow">↗</span>
            </div>
          </div>
        </motion.a>

        <motion.a
          href="/product/ilk-gun"
          className="collectionCard"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="collectionCardImage collectionFirstDay" />
          <div className="collectionCardOverlay" />

          <div className="collectionCardTop">
            <span>03</span>
            <span>FLOREA MOMENTS</span>
          </div>

          <div className="collectionCardContent">
            <p>İYİ Kİ DOĞDUN</p>

            <h3>
              İlk
              <br />
              <em>Gün.</em>
            </h3>

            <div className="collectionCardBottom">
              <span>Mevsim Çiçekleri</span>
              <span className="collectionArrow">↗</span>
            </div>
          </div>
        </motion.a>
      </div>

      <div className="collectionFooter">
        <p>Yeni koleksiyonlar yakında.</p>

        <a href="#create">
          Kendi buketini oluştur →
        </a>
      </div>
    </section>
  );
}

function CreateTeaser() {
  return (
    <section
      className="createTeaser"
      id="create"
    >
      <div className="createTeaserImage">
        <div className="createTeaserOverlay" />

        <motion.div
          className="createTeaserContent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85 }}
        >
          <p>SENİN ÇİÇEĞİN</p>

          <h2>
            Hazır bir buket seçme.
            <br />
            <span>Onu kendin yarat.</span>
          </h2>

          <p className="createTeaserDescription">
            Çiçek sayısından ambalaja, karttan mesajına kadar
            her detayı kendin belirle.
          </p>

          <a
            href="/product/gece-yarisi"
            className="createTeaserButton"
          >
            Buketini Oluştur
            <span>↗</span>
          </a>
        </motion.div>

        <div className="createTeaserBottom">
          <span>FLOREA CUSTOM</span>
          <span>SENİN HİKÂYEN</span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {
    itemCount,
    openCart,
  } = useCart();

  return (
    <main className="site">
      {/* HERO */}
      <section className="hero">
        <div className="heroImage" />
        <div className="heroOverlay" />

        <header className="navbar">
          <motion.a
            href="#"
            className="logo"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            FLOREA
          </motion.a>

          <motion.nav
            className="navLinks"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
          >
            <a href="#collections">
              Koleksiyonlar
            </a>

            <a href="#moods">
              Duygular
            </a>

            <a href="#create">
              Buketini Oluştur
            </a>
          </motion.nav>

          <motion.div
            className="navActions"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
            }}
          >
            <button>Ara</button>

            <button
              className="cartButton"
              onClick={openCart}
            >
              Sepet
              <span>{itemCount}</span>
            </button>
          </motion.div>
        </header>

        <div className="heroContent">
          <motion.p
            className="heroEyebrow"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
          >
            ÇİÇEKTEN DAHA FAZLASI
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.45,
            }}
          >
            Çiçek göndermiyorsun.
            <br />

            <span>
              Bir şey söylüyorsun.
            </span>
          </motion.h1>

          <motion.p
            className="heroDescription"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.65,
            }}
          >
            Bazı duygular kelimelerden daha fazlasını hak eder.
            <br />
            Onları senin için çiçeğe dönüştürüyoruz.
          </motion.p>

          <motion.div
            className="heroButtons"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.8,
            }}
          >
            <a
              href="#moods"
              className="primaryButton"
            >
              Duygunu Seç
              <span>↗</span>
            </a>

            <a
              href="#create"
              className="secondaryButton"
            >
              Buketini Oluştur
            </a>
          </motion.div>
        </div>

        <motion.div
          className="heroBottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1.2,
          }}
        >
          <div className="scrollIndicator">
            <span />
            Keşfetmek için kaydır
          </div>

          <div className="heroProduct">
            <span>01</span>

            <div>
              <small>ÖNE ÇIKAN</small>
              <strong>Gece Yarısı</strong>
            </div>
          </div>
        </motion.div>
      </section>

      {/* INTRO */}
      <section
        className="introSection"
        id="collection"
      >
        <p className="sectionEyebrow">
          FLOREA SEÇKİSİ
        </p>

        <h2>
          Her çiçeğin
          <br />
          <span>
            anlatacak bir şeyi var.
          </span>
        </h2>

        <p className="introText">
          Aşk, özür, kutlama ya da sadece içinden geldiği için.
          Florea&apos;da önce duygunu seçersin,
          sonra çiçeğini.
        </p>
      </section>

      {/* COLLECTIONS */}
      <CollectionSection />

      {/* MOODS */}
      <section
        className="moodSection"
        id="moods"
      >
        <div className="moodSticky">
          <div className="moodLeft">
            <p className="sectionEyebrow">
              BUGÜN NE SÖYLEMEK İSTİYORSUN?
            </p>

            <h2>
              Duygunu seç.
              <br />

              <span>
                Gerisini çiçekler anlatsın.
              </span>
            </h2>

            <p className="moodDescription">
              Klasik kategoriler yerine,
              hissettiğin şeyden başla.
              Florea senin için doğru buketi bulsun.
            </p>
          </div>

          <div className="moodVisual">
            <div className="moodFlower" />

            <div className="moodVisualText">
              <small>
                FLOREA SIGNATURE
              </small>

              <strong>
                Bir his. Bir buket. Bir an.
              </strong>
            </div>
          </div>
        </div>

        <div className="moodCards">
          {moods.map((item, index) => (
            <motion.article
              key={item.title}
              className="moodCard"
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
            >
              <span className="moodNumber">
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              <div>
                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>
              </div>

              <button>
                Keşfet ↗
              </button>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ASIL APPLE TARZI SCROLL ALANI */}
      <ProductShowcase />

      <CreateTeaser />

      {/* STORY */}
      <section className="storySection">
        <div className="storyImage" />
        <div className="storyOverlay" />

        <div className="storyContent">
          <p>FLOREA / 02</p>

          <h2>
            Bazı anlar
            <br />

            <span>
              unutulmak için fazla güzel.
            </span>
          </h2>

          <p className="storyText">
            Her buket yalnızca çiçeklerden oluşmaz.
            Bazen bir özür, bazen bir başlangıç,
            bazen de uzun zamandır söylenemeyen tek bir cümledir.
          </p>

          <a href="#create">
            Kendi buketini yarat →
          </a>
        </div>
      </section>
    </main>
  );
}