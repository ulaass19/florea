"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useCart,
} from "@/context/CartContext";

type BalloonOption = {
  id: string;
  name: string;
  shortName: string;
  price: number;
  image: string;
};

type ColorOption = {
  id: string;
  name: string;
  hex: string;
};

type HeliumOption = {
  id: string;
  name: string;
  description: string;
  extraPrice: number;
};

type CardOption = {
  id: string;
  name: string;
  extraPrice: number;
};

const balloons: BalloonOption[] = [
  {
    id: "classic",
    name: "Klasik Balon",
    shortName: "Klasik",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "heart",
    name: "Kalp Balon",
    shortName: "Kalp",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "premium",
    name: "Premium Balon",
    shortName: "Premium",
    price: 125,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "celebration",
    name: "Kutlama Seçkisi",
    shortName: "Kutlama",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=90",
  },
];

const colors: ColorOption[] = [
  {
    id: "burgundy",
    name: "Bordo",
    hex: "#713746",
  },
  {
    id: "powder",
    name: "Pudra",
    hex: "#E9BFC4",
  },
  {
    id: "cream",
    name: "Krem",
    hex: "#EEE4D4",
  },
  {
    id: "white",
    name: "Beyaz",
    hex: "#F8F7F4",
  },
  {
    id: "black",
    name: "Siyah",
    hex: "#1F1F1F",
  },
  {
    id: "gold",
    name: "Gold",
    hex: "#C9A35B",
  },
];

const heliumOptions: HeliumOption[] = [
  {
    id: "helium",
    name: "Helyumlu",
    description:
      "Balonlar havada süzülür.",
    extraPrice: 35,
  },
  {
    id: "normal",
    name: "Helyumsuz",
    description:
      "Standart hava dolumu.",
    extraPrice: 0,
  },
];

const cards: CardOption[] = [
  {
    id: "classic",
    name: "Klasik Kart",
    extraPrice: 0,
  },
  {
    id: "linen",
    name: "Dokulu Kart",
    extraPrice: 70,
  },
  {
    id: "signature",
    name: "FLOREA Signature",
    extraPrice: 120,
  },
];

const counts = [
  5,
  7,
  10,
  15,
  20,
  30,
];

export default function CreateBalloonPage() {
  const {
    addItem,
    openCart,
  } = useCart();

  const [
    selectedBalloon,
    setSelectedBalloon,
  ] = useState(
    balloons[0],
  );

  const [
    count,
    setCount,
  ] = useState(10);

  const [
    selectedColor,
    setSelectedColor,
  ] = useState(
    colors[0],
  );

  const [
    selectedHelium,
    setSelectedHelium,
  ] = useState(
    heliumOptions[0],
  );

  const [
    selectedCard,
    setSelectedCard,
  ] = useState(
    cards[0],
  );

  const [
    message,
    setMessage,
  ] = useState("");

  const totalPrice =
    useMemo(() => {
      return (
        selectedBalloon.price *
          count +
        selectedHelium.extraPrice *
          count +
        selectedCard.extraPrice
      );
    }, [
      selectedBalloon,
      count,
      selectedHelium,
      selectedCard,
    ]);

  const bouquetScale =
    0.86 +
    Math.min(
      count / 100,
      0.3,
    );

  return (
    <main
      style={{
        background:
          "#f7f3ef",
        color:
          "#351f28",
        minHeight:
          "100vh",
      }}
    >

      {/* HERO */}

      <section className="customHero">
        <motion.div
          className="heroCopy"
          initial={{
            opacity: 0,
            y: 25,
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
            FLOREA / BALLOON
            CUSTOM
          </p>

          <h1>
            Hazır olanı seçme.
            <br />

            <em>
              Kendi neşeni yarat.
            </em>
          </h1>

          <p className="heroDescription">
            Balondan renge,
            adetten mesajına
            kadar her detay
            sana ait. Kendi
            balon buketini
            oluştur, gerisini
            bize bırak.
          </p>
        </motion.div>

        <div className="heroIndex">
          <span>
            01
          </span>

          <span>
            06
          </span>
        </div>
      </section>

      {/* BUILDER */}

      <section className="builder">
        {/* SOL ÖNİZLEME */}

        <div className="visualColumn">
          <div className="visualSticky">
            <AnimatePresence
              mode="wait"
            >
              <motion.div
                key={
                  selectedBalloon.id
                }
                className="visualImage"
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.45,
                }}
                style={{
                  backgroundImage: `
                    linear-gradient(
                      180deg,
                      rgba(14,9,8,0.03),
                      rgba(14,9,8,0.55)
                    ),
                    url("${selectedBalloon.image}")
                  `,
                }}
              >
                <motion.div
                  className="bouquetCircle"
                  animate={{
                    scale:
                      bouquetScale,
                    borderColor:
                      selectedColor.hex,
                  }}
                  transition={{
                    type:
                      "spring",
                    stiffness:
                      120,
                    damping:
                      18,
                  }}
                />

                <div className="visualTop">
                  <span>
                    FLOREA / LIVE
                    PREVIEW
                  </span>

                  <span>
                    {String(
                      count,
                    ).padStart(
                      2,
                      "0",
                    )}{" "}
                    BALLOONS
                  </span>
                </div>

                <div className="visualBottom">
                  <div>
                    <small>
                      SENİN
                      BUKETİN
                    </small>

                    <h2>
                      {
                        selectedBalloon.name
                      }
                    </h2>
                  </div>

                  <div className="visualSpecs">
                    <span>
                      {
                        selectedColor.name
                      }
                    </span>

                    <span>
                      {
                        selectedHelium.name
                      }
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* SAĞ KONTROLLER */}

        <div className="controlsColumn">
          {/* 01 */}

          <BuilderSection
            number="01"
            eyebrow="BALON"
            title="Neyle başlamak istiyorsun?"
          >
            <div className="balloonGrid">
              {balloons.map(
                (
                  balloon,
                ) => (
                  <button
                    key={
                      balloon.id
                    }
                    type="button"
                    className={
                      selectedBalloon.id ===
                      balloon.id
                        ? "balloonOption active"
                        : "balloonOption"
                    }
                    onClick={() =>
                      setSelectedBalloon(
                        balloon,
                      )
                    }
                  >
                    <span
                      className="balloonThumb"
                      style={{
                        backgroundImage:
                          `url("${balloon.image}")`,
                      }}
                    />

                    <span className="balloonInfo">
                      <strong>
                        {
                          balloon.name
                        }
                      </strong>

                      <small>
                        ₺
                        {
                          balloon.price
                        }{" "}
                        / adet
                      </small>
                    </span>

                    <span className="optionMark">
                      {selectedBalloon.id ===
                      balloon.id
                        ? "●"
                        : "○"}
                    </span>
                  </button>
                ),
              )}
            </div>
          </BuilderSection>

          {/* 02 */}

          <BuilderSection
            number="02"
            eyebrow="ADET"
            title="Buketinde kaç balon olsun?"
          >
            <div className="countGrid">
              {counts.map(
                (
                  item,
                ) => (
                  <button
                    key={
                      item
                    }
                    type="button"
                    onClick={() =>
                      setCount(
                        item,
                      )
                    }
                    className={
                      count ===
                      item
                        ? "countOption active"
                        : "countOption"
                    }
                  >
                    <strong>
                      {
                        item
                      }
                    </strong>

                    <span>
                      adet
                    </span>

                    <small>
                      ₺
                      {(
                        selectedBalloon.price *
                        item
                      ).toLocaleString(
                        "tr-TR",
                      )}
                    </small>
                  </button>
                ),
              )}
            </div>
          </BuilderSection>

          {/* 03 */}

          <BuilderSection
            number="03"
            eyebrow="RENK"
            title="Buketinin rengini seç."
          >
            <div className="colorGrid">
              {colors.map(
                (
                  color,
                ) => (
                  <button
                    key={
                      color.id
                    }
                    type="button"
                    onClick={() =>
                      setSelectedColor(
                        color,
                      )
                    }
                    className={
                      selectedColor.id ===
                      color.id
                        ? "colorOption active"
                        : "colorOption"
                    }
                  >
                    <span
                      className="colorCircle"
                      style={{
                        background:
                          color.hex,
                      }}
                    />

                    <span>
                      {
                        color.name
                      }
                    </span>

                    <small>
                      {selectedColor.id ===
                      color.id
                        ? "●"
                        : "○"}
                    </small>
                  </button>
                ),
              )}
            </div>
          </BuilderSection>

          {/* 04 */}

          <BuilderSection
            number="04"
            eyebrow="DOLUM"
            title="Nasıl hazırlansın?"
          >
            <div className="choiceGrid">
              {heliumOptions.map(
                (
                  option,
                ) => (
                  <button
                    key={
                      option.id
                    }
                    type="button"
                    onClick={() =>
                      setSelectedHelium(
                        option,
                      )
                    }
                    className={
                      selectedHelium.id ===
                      option.id
                        ? "choiceOption active"
                        : "choiceOption"
                    }
                  >
                    <div>
                      <strong>
                        {
                          option.name
                        }
                      </strong>

                      <p>
                        {
                          option.description
                        }
                      </p>
                    </div>

                    <small>
                      {option.extraPrice ===
                      0
                        ? "Dahil"
                        : `+₺${option.extraPrice} / adet`}
                    </small>
                  </button>
                ),
              )}
            </div>
          </BuilderSection>

          {/* 05 */}

          <BuilderSection
            number="05"
            eyebrow="KART"
            title="Mesajının tonunu seç."
          >
            <div className="choiceGrid">
              {cards.map(
                (
                  card,
                ) => (
                  <button
                    key={
                      card.id
                    }
                    type="button"
                    onClick={() =>
                      setSelectedCard(
                        card,
                      )
                    }
                    className={
                      selectedCard.id ===
                      card.id
                        ? "choiceOption active"
                        : "choiceOption"
                    }
                  >
                    <strong>
                      {
                        card.name
                      }
                    </strong>

                    <small>
                      {card.extraPrice ===
                      0
                        ? "Dahil"
                        : `+₺${card.extraPrice.toLocaleString(
                            "tr-TR",
                          )}`}
                    </small>
                  </button>
                ),
              )}
            </div>
          </BuilderSection>

          {/* 06 */}

          <BuilderSection
            number="06"
            eyebrow="MESAJ"
            title="Son sözü sen söyle."
          >
            <label className="messageField">
              <textarea
                value={
                  message
                }
                onChange={(
                  event,
                ) =>
                  setMessage(
                    event.target
                      .value,
                  )
                }
                maxLength={
                  140
                }
                placeholder="İyi ki varsın..."
              />

              <span>
                {
                  message.length
                }
                /140
              </span>
            </label>
          </BuilderSection>

          {/* SATIN AL */}

          <div className="purchase">
            <div className="purchaseSummary">
              <div>
                <small>
                  FLOREA CUSTOM
                </small>

                <strong>
                  {count}{" "}
                  {
                    selectedBalloon.shortName
                  }{" "}
                  Balon
                </strong>

                <p>
                  {
                    selectedColor.name
                  }{" "}
                  ·{" "}
                  {
                    selectedHelium.name
                  }{" "}
                  ·{" "}
                  {
                    selectedCard.name
                  }
                </p>
              </div>

              <div className="price">
                <span>
                  TOPLAM
                </span>

                <strong>
                  ₺
                  {totalPrice.toLocaleString(
                    "tr-TR",
                  )}
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="addButton"
              onClick={() => {
                /*
                 * CartContext'teki
                 * item tipin balon
                 * alanlarını destekliyorsa
                 * aşağıdaki yapıyı
                 * doğrudan kullanabiliriz.
                 */

                addItem({
                  productId:
                    `custom-balloon-${selectedBalloon.id}`,
                  name:
                    "Senin Balon Buketin",
                  image:
                    selectedBalloon.image,

                  // Mevcut CartContext
                  // flowerName istediği
                  // için şimdilik burada
                  // balon adını taşıyoruz.
                  flowerName:
                    selectedBalloon.shortName,

                  size:
                    count,

                  wrap:
                    `${selectedColor.name} / ${selectedHelium.name}`,

                  card:
                    selectedCard.name,

                  message,

                  unitPrice:
                    totalPrice,
                });

                openCart();
              }}
            >
              <span>
                Bu Buketi
                Sepete Ekle
              </span>

              <span>
                ↗
              </span>
            </button>

            <p className="purchaseNote">
              Balon buketin
              siparişten sonra
              FLOREA ekibi
              tarafından
              hazırlanır.
              Teslimat bilgileri
              checkout adımında
              seçilir.
            </p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        .customHero {
          min-height: 470px;

          padding:
            95px
            7vw
            70px;

          display: flex;
          justify-content:
            space-between;
          align-items:
            flex-end;

          border-bottom:
            1px solid
            rgba(
              53,
              31,
              40,
              0.14
            );
        }

        .heroCopy > p:first-child {
          margin:
            0 0 28px;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
        }

        .heroCopy h1 {
          margin: 0;

          max-width: 800px;

          font-family:
            Georgia,
            serif;

          font-size:
            clamp(
              50px,
              6.2vw,
              105px
            );

          line-height: 0.94;
          font-weight: 400;
          letter-spacing:
            -0.055em;
        }

        .heroCopy h1 em {
          font-weight: 400;
          color: #9d6d78;
        }

        .heroDescription {
          max-width: 460px;

          margin:
            38px 0 0;

          font-size: 14px;
          line-height: 1.8;
          color:
            rgba(
              53,
              31,
              40,
              0.65
            );
        }

        .heroIndex {
          display: flex;
          gap: 15px;

          padding-bottom: 8px;

          font-size: 11px;
          letter-spacing: 0.15em;
        }

        .heroIndex span:first-child {
          font-weight: 700;
        }

        .heroIndex span:last-child {
          opacity: 0.35;
        }

        .builder {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(500px, 0.9fr);

          max-width: 1600px;
          margin: 0 auto;
        }

        .visualColumn {
          padding:
            70px
            4vw
            100px;

          border-right:
            1px solid
            rgba(
              53,
              31,
              40,
              0.12
            );
        }

        .visualSticky {
          position: sticky;
          top: 30px;
        }

        .visualImage {
          position: relative;

          min-height: 720px;

          overflow: hidden;

          background-size: cover;
          background-position:
            center;

          border-radius: 2px;
        }

        .visualImage::after {
          content: "";

          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              180deg,
              rgba(
                0,
                0,
                0,
                0.03
              ),
              transparent
                40%,
              rgba(
                0,
                0,
                0,
                0.45
              )
            );

          pointer-events: none;
        }

        .bouquetCircle {
          position: absolute;

          width: 360px;
          height: 360px;

          left: 50%;
          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          border:
            4px solid
            #713746;

          border-radius: 50%;

          opacity: 0.75;

          box-shadow:
            0 0 80px
            rgba(
              255,
              255,
              255,
              0.15
            );
        }

        .visualTop {
          position: absolute;
          z-index: 3;

          left: 30px;
          right: 30px;
          top: 30px;

          display: flex;
          justify-content:
            space-between;

          color: white;

          font-size: 9px;
          letter-spacing:
            0.15em;
        }

        .visualBottom {
          position: absolute;
          z-index: 3;

          left: 30px;
          right: 30px;
          bottom: 30px;

          display: flex;
          align-items: flex-end;
          justify-content:
            space-between;

          color: white;
        }

        .visualBottom small {
          font-size: 9px;
          letter-spacing:
            0.15em;
          opacity: 0.7;
        }

        .visualBottom h2 {
          margin:
            8px 0 0;

          font-family:
            Georgia,
            serif;

          font-size: 37px;
          font-weight: 400;
        }

        .visualSpecs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;

          justify-content:
            flex-end;
        }

        .visualSpecs span {
          padding:
            8px 12px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.45
            );

          border-radius:
            999px;

          font-size: 9px;
          letter-spacing:
            0.08em;

          backdrop-filter:
            blur(8px);
        }

        .controlsColumn {
          background: #fbf9f6;
        }

        .builderSection {
          padding:
            65px
            5vw;

          border-bottom:
            1px solid
            rgba(
              53,
              31,
              40,
              0.12
            );
        }

        .sectionHeading {
          display: grid;

          grid-template-columns:
            45px 1fr;

          gap: 20px;

          margin-bottom: 38px;
        }

        .sectionHeading
          > span {
          font-size: 10px;
          font-weight: 700;
          letter-spacing:
            0.12em;

          opacity: 0.4;

          padding-top: 6px;
        }

        .sectionHeading small {
          font-size: 9px;
          font-weight: 700;
          letter-spacing:
            0.17em;

          color: #9d6d78;
        }

        .sectionHeading h2 {
          margin:
            8px 0 0;

          font-family:
            Georgia,
            serif;

          font-size: 31px;
          font-weight: 400;

          letter-spacing:
            -0.025em;
        }

        .sectionBody {
          margin-left: 65px;
        }

        .balloonGrid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(
                0,
                1fr
              )
            );

          gap: 10px;
        }

        .balloonOption {
          width: 100%;

          padding: 10px;

          display: grid;

          grid-template-columns:
            65px
            1fr
            auto;

          gap: 15px;

          align-items: center;

          border:
            1px solid
            rgba(
              53,
              31,
              40,
              0.14
            );

          background:
            transparent;

          color: #351f28;

          text-align: left;

          cursor: pointer;

          transition:
            0.25s ease;
        }

        .balloonOption:hover,
        .balloonOption.active {
          border-color:
            #351f28;

          background: white;
        }

        .balloonThumb {
          width: 65px;
          height: 75px;

          background-size:
            cover;
          background-position:
            center;
        }

        .balloonInfo {
          display: flex;
          flex-direction:
            column;
          gap: 7px;
        }

        .balloonInfo strong {
          font-size: 13px;
          font-weight: 600;
        }

        .balloonInfo small {
          font-size: 10px;
          opacity: 0.5;
        }

        .optionMark {
          font-size: 12px;
        }

        .countGrid {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              1fr
            );

          gap: 8px;
        }

        .countOption {
          min-height: 120px;

          padding: 20px;

          display: flex;
          flex-direction:
            column;

          align-items:
            flex-start;

          border:
            1px solid
            rgba(
              53,
              31,
              40,
              0.14
            );

          background:
            transparent;

          color: #351f28;

          cursor: pointer;

          transition:
            0.25s ease;
        }

        .countOption:hover,
        .countOption.active {
          background: #351f28;
          color: white;
          border-color:
            #351f28;
        }

        .countOption strong {
          font-family:
            Georgia,
            serif;

          font-size: 28px;
          font-weight: 400;
        }

        .countOption span {
          margin-top: 3px;

          font-size: 10px;
          opacity: 0.6;
        }

        .countOption small {
          margin-top: auto;

          font-size: 10px;
          opacity: 0.65;
        }

        .colorGrid {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              1fr
            );

          gap: 8px;
        }

        .colorOption {
          min-height: 95px;

          padding: 15px;

          display: flex;
          flex-direction:
            column;

          align-items:
            flex-start;

          gap: 9px;

          border:
            1px solid
            rgba(
              53,
              31,
              40,
              0.14
            );

          background:
            transparent;

          color: #351f28;

          cursor: pointer;

          transition:
            0.25s ease;
        }

        .colorOption:hover,
        .colorOption.active {
          border-color:
            #351f28;

          background: white;
        }

        .colorCircle {
          width: 27px;
          height: 27px;

          border-radius: 50%;

          border:
            1px solid
            rgba(
              0,
              0,
              0,
              0.1
            );
        }

        .colorOption
          > span:nth-child(2) {
          font-size: 11px;
          font-weight: 600;
        }

        .colorOption small {
          margin-left: auto;

          font-size: 9px;
        }

        .choiceGrid {
          display: grid;
          grid-template-columns:
            repeat(
              2,
              1fr
            );

          gap: 8px;
        }

        .choiceOption {
          min-height: 100px;

          padding: 20px;

          display: flex;
          flex-direction:
            column;

          justify-content:
            space-between;
          align-items:
            flex-start;

          border:
            1px solid
            rgba(
              53,
              31,
              40,
              0.14
            );

          background:
            transparent;

          color: #351f28;

          text-align: left;

          cursor: pointer;

          transition:
            0.25s ease;
        }

        .choiceOption:hover,
        .choiceOption.active {
          background: #351f28;
          color: white;
          border-color:
            #351f28;
        }

        .choiceOption strong {
          font-size: 12px;
        }

        .choiceOption p {
          margin:
            7px 0 0;

          font-size: 10px;
          line-height: 1.5;

          opacity: 0.55;
        }

        .choiceOption small {
          margin-top: 16px;

          font-size: 9px;
          opacity: 0.6;
        }

        .messageField {
          display: block;
          position: relative;
        }

        .messageField textarea {
          width: 100%;
          min-height: 160px;

          resize: none;

          padding:
            22px
            22px
            38px;

          outline: none;

          border:
            1px solid
            rgba(
              53,
              31,
              40,
              0.18
            );

          background:
            transparent;

          color: #351f28;

          font-family:
            Georgia,
            serif;

          font-size: 20px;
          line-height: 1.5;

          transition:
            border-color
            0.2s ease;
        }

        .messageField textarea:focus {
          border-color:
            #351f28;
        }

        .messageField textarea::placeholder {
          color:
            rgba(
              53,
              31,
              40,
              0.3
            );
        }

        .messageField
          > span {
          position: absolute;

          right: 15px;
          bottom: 13px;

          font-size: 9px;
          opacity: 0.4;
        }

        .purchase {
          padding:
            60px
            5vw
            80px;

          background: #351f28;
          color: white;
        }

        .purchaseSummary {
          display: flex;
          justify-content:
            space-between;

          gap: 30px;

          padding-bottom:
            35px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.18
            );
        }

        .purchaseSummary small {
          display: block;

          margin-bottom:
            10px;

          font-size: 9px;
          letter-spacing:
            0.15em;

          opacity: 0.5;
        }

        .purchaseSummary
          > div:first-child
          > strong {
          display: block;

          font-family:
            Georgia,
            serif;

          font-size: 28px;
          font-weight: 400;
        }

        .purchaseSummary p {
          margin:
            9px 0 0;

          font-size: 11px;
          opacity: 0.5;
        }

        .price {
          text-align: right;
        }

        .price span {
          display: block;

          margin-bottom:
            7px;

          font-size: 9px;
          letter-spacing:
            0.15em;

          opacity: 0.5;
        }

        .price strong {
          font-family:
            Georgia,
            serif;

          font-size: 32px;
          font-weight: 400;
        }

        .addButton {
          width: 100%;

          margin-top: 30px;

          padding:
            22px
            24px;

          display: flex;
          justify-content:
            space-between;
          align-items: center;

          border: 0;

          background: #f7f3ef;
          color: #351f28;

          font-size: 12px;
          font-weight: 700;
          letter-spacing:
            0.04em;

          cursor: pointer;

          transition:
            0.25s ease;
        }

        .addButton:hover {
          background: white;

          transform:
            translateY(
              -2px
            );
        }

        .addButton
          span:last-child {
          font-size: 20px;
          font-weight: 400;
        }

        .purchaseNote {
          margin:
            18px 0 0;

          max-width: 440px;

          font-size: 10px;
          line-height: 1.7;

          opacity: 0.45;
        }

        @media (
          max-width: 1050px
        ) {
          .builder {
            grid-template-columns:
              1fr;
          }

          .visualColumn {
            border-right: 0;

            border-bottom:
              1px solid
              rgba(
                53,
                31,
                40,
                0.12
              );
          }

          .visualSticky {
            position:
              relative;
            top: auto;
          }

          .visualImage {
            min-height:
              620px;
          }
        }

        @media (
          max-width: 700px
        ) {

          .customHero {
            min-height: auto;

            padding:
              70px
              22px
              55px;

            align-items:
              flex-start;
          }

          .heroIndex {
            display: none;
          }

          .heroCopy h1 {
            font-size:
              48px;
          }

          .heroDescription {
            font-size:
              13px;
          }

          .visualColumn {
            padding:
              25px
              20px
              45px;
          }

          .visualImage {
            min-height:
              520px;
          }

          .visualBottom {
            left: 20px;
            right: 20px;
            bottom: 20px;

            flex-direction:
              column;

            align-items:
              flex-start;

            gap: 15px;
          }

          .visualSpecs {
            justify-content:
              flex-start;
          }

          .visualBottom h2 {
            font-size:
              28px;
          }

          .bouquetCircle {
            width: 240px;
            height: 240px;
          }

          .builderSection {
            padding:
              45px
              20px;
          }

          .sectionHeading {
            grid-template-columns:
              30px
              1fr;

            gap: 10px;

            margin-bottom:
              28px;
          }

          .sectionHeading h2 {
            font-size:
              26px;
          }

          .sectionBody {
            margin-left: 40px;
          }

          .balloonGrid {
            grid-template-columns:
              1fr;
          }

          .countGrid,
          .colorGrid {
            grid-template-columns:
              repeat(
                2,
                1fr
              );
          }

          .choiceGrid {
            grid-template-columns:
              1fr;
          }

          .purchase {
            padding:
              45px
              25px
              60px;
          }

          .purchaseSummary {
            flex-direction:
              column;
          }

          .price {
            text-align: left;
          }
        }
      `}</style>
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
  children:
    React.ReactNode;
}) {
  return (
    <section className="builderSection">
      <div className="sectionHeading">
        <span>
          {number}
        </span>

        <div>
          <small>
            {eyebrow}
          </small>

          <h2>
            {title}
          </h2>
        </div>
      </div>

      <div className="sectionBody">
        {children}
      </div>
    </section>
  );
}