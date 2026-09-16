"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

const WHATSAPP_NUMBER =
  "905538440139";

const flowerOptions = [
  {
    id: "kirmizi-gul",
    name: "Kırmızı Gül",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: "beyaz-gul",
    name: "Beyaz Gül",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: "pembe-gul",
    name: "Pembe Gül",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: "lilyum",
    name: "Lilyum",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=90",
  },
];

const wrapOptions = [
  {
    id: "krem",
    name: "Krem",
    extra: 0,
  },
  {
    id: "kraft",
    name: "Kraft",
    extra: 0,
  },
  {
    id: "pembe",
    name: "Pudra Pembe",
    extra: 50,
  },
  {
    id: "siyah",
    name: "Siyah",
    extra: 50,
  },
];

const cardOptions = [
  {
    id: "minimal",
    name: "Minimal Kart",
    extra: 0,
  },
  {
    id: "romantik",
    name: "Romantik Kart",
    extra: 40,
  },
  {
    id: "ozel",
    name: "Özel Tasarım Kart",
    extra: 70,
  },
];

const quantities = [
  9,
  12,
  15,
  21,
  25,
  31,
];

export default function CreateBouquetPage() {
  const [
    selectedFlower,
    setSelectedFlower,
  ] = useState(
    flowerOptions[0]
  );

  const [
    quantity,
    setQuantity,
  ] = useState(12);

  const [
    selectedWrap,
    setSelectedWrap,
  ] = useState(
    wrapOptions[0]
  );

  const [
    selectedCard,
    setSelectedCard,
  ] = useState(
    cardOptions[0]
  );

  const [
    note,
    setNote,
  ] = useState("");

  const [
    receiverName,
    setReceiverName,
  ] = useState("");

  const totalPrice =
    useMemo(() => {
      return (
        selectedFlower.price *
          quantity +
        selectedWrap.extra +
        selectedCard.extra
      );
    }, [
      selectedFlower,
      quantity,
      selectedWrap,
      selectedCard,
    ]);

  const handleWhatsApp =
    () => {
      const message = `
Merhaba Bi Buket Neşe 🌸

Kendi buketimi oluşturdum ve sipariş vermek istiyorum.

🌷 Çiçek:
${selectedFlower.name}

🔢 Adet:
${quantity}

🎁 Paket:
${selectedWrap.name}

💌 Kart:
${selectedCard.name}

👤 Gönderilecek kişi:
${
  receiverName ||
  "Belirtilmedi"
}

✍️ Kart mesajı:
${
  note ||
  "Belirtilmedi"
}

💰 Tahmini toplam:
₺${totalPrice.toLocaleString(
        "tr-TR"
      )}

Teslimat ve ödeme bilgilerini iletebilir misiniz?
      `.trim();

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          message
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    };

  return (
    <main className="createBouquetPage">
      <section className="createBouquetHeader">
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
          <p>
            Bİ BUKET NEŞE
          </p>

          <h1>
            Buketini Oluştur
          </h1>

          <span>
            Çiçeğini seç,
            detaylarını belirle
            ve sana özel buketini
            oluştur.
          </span>
        </motion.div>
      </section>

      <section className="createBouquetContainer">
        <div className="createBouquetBuilder">
          <section className="createStep">
            <div className="createStepTitle">
              <span>
                01
              </span>

              <div>
                <h2>
                  Çiçeğini seç
                </h2>

                <p>
                  Buketin ana
                  çiçeğini belirle.
                </p>
              </div>
            </div>

            <div className="createFlowerGrid">
              {flowerOptions.map(
                (
                  flower
                ) => (
                  <button
                    key={
                      flower.id
                    }
                    className={
                      selectedFlower.id ===
                      flower.id
                        ? "createFlowerCard active"
                        : "createFlowerCard"
                    }
                    onClick={() =>
                      setSelectedFlower(
                        flower
                      )
                    }
                  >
                    <div>
                      <img
                        src={
                          flower.image
                        }
                        alt={
                          flower.name
                        }
                      />
                    </div>

                    <section>
                      <strong>
                        {
                          flower.name
                        }
                      </strong>

                      <span>
                        ₺
                        {
                          flower.price
                        }{" "}
                        / adet
                      </span>
                    </section>
                  </button>
                )
              )}
            </div>
          </section>

          <section className="createStep">
            <div className="createStepTitle">
              <span>
                02
              </span>

              <div>
                <h2>
                  Kaç adet?
                </h2>

                <p>
                  Buket büyüklüğünü
                  belirle.
                </p>
              </div>
            </div>

            <div className="createQuantityGrid">
              {quantities.map(
                (
                  amount
                ) => (
                  <button
                    key={
                      amount
                    }
                    className={
                      quantity ===
                      amount
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setQuantity(
                        amount
                      )
                    }
                  >
                    <strong>
                      {amount}
                    </strong>

                    <span>
                      adet
                    </span>
                  </button>
                )
              )}
            </div>
          </section>

          <section className="createStep">
            <div className="createStepTitle">
              <span>
                03
              </span>

              <div>
                <h2>
                  Paket seçimi
                </h2>

                <p>
                  Buketin karakterini
                  tamamla.
                </p>
              </div>
            </div>

            <div className="createSimpleOptions">
              {wrapOptions.map(
                (
                  wrap
                ) => (
                  <button
                    key={
                      wrap.id
                    }
                    className={
                      selectedWrap.id ===
                      wrap.id
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedWrap(
                        wrap
                      )
                    }
                  >
                    <span>
                      {
                        wrap.name
                      }
                    </span>

                    <small>
                      {wrap.extra ===
                      0
                        ? "Ücretsiz"
                        : `+₺${wrap.extra}`}
                    </small>
                  </button>
                )
              )}
            </div>
          </section>

          <section className="createStep">
            <div className="createStepTitle">
              <span>
                04
              </span>

              <div>
                <h2>
                  Kartını seç
                </h2>

                <p>
                  Mesajına uygun
                  kart stilini
                  belirle.
                </p>
              </div>
            </div>

            <div className="createSimpleOptions">
              {cardOptions.map(
                (
                  card
                ) => (
                  <button
                    key={
                      card.id
                    }
                    className={
                      selectedCard.id ===
                      card.id
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedCard(
                        card
                      )
                    }
                  >
                    <span>
                      {
                        card.name
                      }
                    </span>

                    <small>
                      {card.extra ===
                      0
                        ? "Ücretsiz"
                        : `+₺${card.extra}`}
                    </small>
                  </button>
                )
              )}
            </div>
          </section>

          <section className="createStep">
            <div className="createStepTitle">
              <span>
                05
              </span>

              <div>
                <h2>
                  Son dokunuş
                </h2>

                <p>
                  İsim ve kart
                  mesajını ekle.
                </p>
              </div>
            </div>

            <div className="createInputs">
              <label>
                <span>
                  Gönderilecek kişi
                </span>

                <input
                  value={
                    receiverName
                  }
                  onChange={(
                    e
                  ) =>
                    setReceiverName(
                      e.target
                        .value
                    )
                  }
                  placeholder="Örn. Ayşe"
                />
              </label>

              <label>
                <span>
                  Kart mesajı
                </span>

                <textarea
                  value={
                    note
                  }
                  onChange={(
                    e
                  ) =>
                    setNote(
                      e.target
                        .value
                    )
                  }
                  maxLength={
                    180
                  }
                  placeholder="Mesajını yaz..."
                />

                <small>
                  {
                    note.length
                  }
                  /180
                </small>
              </label>
            </div>
          </section>
        </div>

        <aside className="createBouquetSummary">
          <div className="createSummaryImage">
            <img
              src={
                selectedFlower.image
              }
              alt={
                selectedFlower.name
              }
            />

            <span>
              SENİN BUKETİN
            </span>
          </div>

          <div className="createSummaryContent">
            <p>
              Bİ BUKET NEŞE
            </p>

            <h2>
              {
                selectedFlower.name
              }
              <br />

              <em>
                Buketi
              </em>
            </h2>

            <div className="createSummaryDetails">
              <div>
                <span>
                  Çiçek
                </span>

                <strong>
                  {
                    selectedFlower.name
                  }
                </strong>
              </div>

              <div>
                <span>
                  Adet
                </span>

                <strong>
                  {
                    quantity
                  }
                </strong>
              </div>

              <div>
                <span>
                  Paket
                </span>

                <strong>
                  {
                    selectedWrap.name
                  }
                </strong>
              </div>

              <div>
                <span>
                  Kart
                </span>

                <strong>
                  {
                    selectedCard.name
                  }
                </strong>
              </div>
            </div>

            <div className="createSummaryPrice">
              <span>
                Tahmini Toplam
              </span>

              <strong>
                ₺
                {totalPrice.toLocaleString(
                  "tr-TR"
                )}
              </strong>
            </div>

            <button
              type="button"
              className="createWhatsAppButton"
              onClick={
                handleWhatsApp
              }
            >
              WhatsApp&apos;tan
              Sipariş Ver

              <span>
                →
              </span>
            </button>

            <small className="createSummaryNote">
              Teslimat zamanı,
              adres ve IBAN
              bilgileri WhatsApp
              üzerinden
              netleştirilir.
            </small>
          </div>
        </aside>
      </section>
    </main>
  );
}