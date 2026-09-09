"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import styles from "./create.module.css";

type FlowerOption = {
  id: string;
  name: string;
  shortName: string;
  price: number;
  image: string;
};

type WrapOption = {
  id: string;
  name: string;
  extraPrice: number;
};

type CardOption = {
  id: string;
  name: string;
  extraPrice: number;
};

const flowers: FlowerOption[] = [
  {
    id: "red-rose",
    name: "Kırmızı Gül",
    shortName: "Gül",
    price: 115,
    image:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "white-rose",
    name: "Beyaz Gül",
    shortName: "Beyaz Gül",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "pink-tulip",
    name: "Pembe Lale",
    shortName: "Lale",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "seasonal",
    name: "Mevsim Seçkisi",
    shortName: "Mevsim",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=90",
  },
];

const wraps: WrapOption[] = [
  { id: "cream", name: "Krem", extraPrice: 0 },
  { id: "kraft", name: "Kraft", extraPrice: 90 },
  { id: "black", name: "Gece Siyahı", extraPrice: 140 },
  { id: "pink", name: "Pudra", extraPrice: 120 },
];

const cards: CardOption[] = [
  { id: "classic", name: "Klasik Kart", extraPrice: 0 },
  { id: "linen", name: "Dokulu Kart", extraPrice: 70 },
  { id: "signature", name: "FLOREA Signature", extraPrice: 120 },
];

const counts = [9, 12, 18, 24, 36, 50];

export default function CreateBouquetPage() {
  const { addItem, openCart, itemCount } = useCart();

  const [selectedFlower, setSelectedFlower] = useState(flowers[0]);
  const [count, setCount] = useState(18);
  const [selectedWrap, setSelectedWrap] = useState(wraps[0]);
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [message, setMessage] = useState("");

  const totalPrice = useMemo(
    () =>
      selectedFlower.price * count +
      selectedWrap.extraPrice +
      selectedCard.extraPrice,
    [selectedFlower, count, selectedWrap, selectedCard]
  );

  const bouquetScale = 0.86 + Math.min(count / 150, 0.34);

  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <a href="/" className={styles.logo}>
          FLOREA
        </a>

        <div className={styles.navMeta}>
          <span>CUSTOM STUDIO</span>
          <span>/</span>
          <span>BUKETİNİ YARAT</span>
        </div>

        <button type="button" onClick={openCart} className={styles.cartButton}>
          Sepet
          <span>{itemCount}</span>
        </button>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p>FLOREA / CUSTOM</p>

          <h1>
            Hazır olanı seçme.
            <br />
            <em>Kendin yarat.</em>
          </h1>

          <p className={styles.heroDescription}>
            Çiçekten ambalaja, karttan mesajına kadar her detay sana ait.
            Buketini oluştur, gerisini bize bırak.
          </p>
        </div>

        <div className={styles.heroIndex}>
          <span>01</span>
          <span>05</span>
        </div>
      </section>

      <section className={styles.builder}>
        <div className={styles.visualColumn}>
          <div className={styles.visualSticky}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFlower.id}
                className={styles.visualImage}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                style={{
                  backgroundImage: `
                    linear-gradient(
                      180deg,
                      rgba(14, 9, 8, 0.05),
                      rgba(14, 9, 8, 0.48)
                    ),
                    url("${selectedFlower.image}")
                  `,
                }}
              >
                <motion.div
                  className={styles.bouquetFrame}
                  animate={{ scale: bouquetScale }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                />

                <div className={styles.visualTop}>
                  <span>FLOREA / LIVE PREVIEW</span>
                  <span>{String(count).padStart(2, "0")} STEMS</span>
                </div>

                <div className={styles.visualBottom}>
                  <div>
                    <small>SENİN BUKETİN</small>
                    <h2>{selectedFlower.name}</h2>
                  </div>

                  <div className={styles.visualSpecs}>
                    <span>{selectedWrap.name}</span>
                    <span>{selectedCard.name}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.controlsColumn}>
          <BuilderSection
            number="01"
            eyebrow="ÇİÇEK"
            title="Neyle başlamak istiyorsun?"
          >
            <div className={styles.flowerGrid}>
              {flowers.map((flower) => (
                <button
                  key={flower.id}
                  type="button"
                  className={
                    selectedFlower.id === flower.id
                      ? `${styles.flowerOption} ${styles.active}`
                      : styles.flowerOption
                  }
                  onClick={() => setSelectedFlower(flower)}
                >
                  <span
                    className={styles.flowerThumb}
                    style={{
                      backgroundImage: `url("${flower.image}")`,
                    }}
                  />

                  <span className={styles.flowerInfo}>
                    <strong>{flower.name}</strong>
                    <small>₺{flower.price} / adet</small>
                  </span>

                  <span className={styles.optionMark}>
                    {selectedFlower.id === flower.id ? "●" : "○"}
                  </span>
                </button>
              ))}
            </div>
          </BuilderSection>

          <BuilderSection
            number="02"
            eyebrow="ADET"
            title="Ne kadar söylemek istiyorsun?"
          >
            <div className={styles.countGrid}>
              {counts.map((itemCountOption) => (
                <button
                  key={itemCountOption}
                  type="button"
                  onClick={() => setCount(itemCountOption)}
                  className={
                    count === itemCountOption
                      ? `${styles.countOption} ${styles.active}`
                      : styles.countOption
                  }
                >
                  <strong>{itemCountOption}</strong>
                  <span>adet</span>
                  <small>
                    ₺
                    {(
                      selectedFlower.price * itemCountOption
                    ).toLocaleString("tr-TR")}
                  </small>
                </button>
              ))}
            </div>
          </BuilderSection>

          <BuilderSection
            number="03"
            eyebrow="AMBALAJ"
            title="Nasıl sunulsun?"
          >
            <div className={styles.choiceGrid}>
              {wraps.map((wrap) => (
                <button
                  key={wrap.id}
                  type="button"
                  onClick={() => setSelectedWrap(wrap)}
                  className={
                    selectedWrap.id === wrap.id
                      ? `${styles.choiceOption} ${styles.active}`
                      : styles.choiceOption
                  }
                >
                  <span>{wrap.name}</span>

                  <small>
                    {wrap.extraPrice === 0
                      ? "Dahil"
                      : `+₺${wrap.extraPrice.toLocaleString("tr-TR")}`}
                  </small>
                </button>
              ))}
            </div>
          </BuilderSection>

          <BuilderSection
            number="04"
            eyebrow="KART"
            title="Mesajının tonunu seç."
          >
            <div className={styles.choiceGrid}>
              {cards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setSelectedCard(card)}
                  className={
                    selectedCard.id === card.id
                      ? `${styles.choiceOption} ${styles.active}`
                      : styles.choiceOption
                  }
                >
                  <span>{card.name}</span>

                  <small>
                    {card.extraPrice === 0
                      ? "Dahil"
                      : `+₺${card.extraPrice.toLocaleString("tr-TR")}`}
                  </small>
                </button>
              ))}
            </div>
          </BuilderSection>

          <BuilderSection
            number="05"
            eyebrow="MESAJ"
            title="Son sözü sen söyle."
          >
            <label className={styles.messageField}>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={140}
                placeholder="Seni ilk gördüğüm gün gibi..."
              />

              <span>{message.length}/140</span>
            </label>
          </BuilderSection>

          <div className={styles.purchase}>
            <div className={styles.purchaseSummary}>
              <div>
                <small>FLOREA CUSTOM</small>

                <strong>
                  {count} {selectedFlower.shortName}
                </strong>

                <p>
                  {selectedWrap.name} · {selectedCard.name}
                </p>
              </div>

              <div className={styles.price}>
                <span>TOPLAM</span>
                <strong>₺{totalPrice.toLocaleString("tr-TR")}</strong>
              </div>
            </div>

            <button
              type="button"
              className={styles.addButton}
              onClick={() => {
                addItem({
                  productId: `custom-${selectedFlower.id}`,
                  name: "Senin Buketin",
                  image: selectedFlower.image,
                  flowerName: selectedFlower.shortName,
                  size: count,
                  wrap: selectedWrap.name,
                  card: selectedCard.name,
                  message,
                  unitPrice: totalPrice,
                });

                openCart();
              }}
            >
              <span>Bu Buketi Sepete Ekle</span>
              <span>↗</span>
            </button>

            <p className={styles.purchaseNote}>
              Buketin siparişten sonra FLOREA ekibi tarafından hazırlanır.
              Teslimat bilgileri checkout adımında seçilir.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function BuilderSection({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.builderSection}>
      <div className={styles.sectionHeading}>
        <span>{number}</span>

        <div>
          <small>{eyebrow}</small>
          <h2>{title}</h2>
        </div>
      </div>

      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}
