"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  use,
  useRef,
  useState,
} from "react";

import {
  getProductById,
} from "@/data/products";

import {
  useCart,
} from "@/context/CartContext";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductPage({
  params,
}: PageProps) {
  const { id } = use(params);

  const product =
    getProductById(id);

  if (!product) {
    return (
      <main className="productNotFound">
        <h1>Ürün bulunamadı.</h1>

        <a href="/">
          Ana sayfaya dön
        </a>
      </main>
    );
  }

  return (
    <main className="productPage">
      <ProductHero
        product={product}
      />

      <ProductStory
        product={product}
      />

      <ProductBuilder
        product={product}
      />
    </main>
  );
}

function ProductHero({
  product,
}: {
  product: ReturnType<
    typeof getProductById
  >;
}) {
  if (!product) {
    return null;
  }

  const {
    itemCount,
    openCart,
  } = useCart();

  return (
    <section className="productHero">
      <div
        className="productHeroImage"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(10, 7, 6, 0.82),
              rgba(10, 7, 6, 0.3)
            ),
            url("${product.heroImage}")
          `,
        }}
      />

      <header className="productNav">
        <a
          href="/"
          className="productLogo"
        >
          FLOREA
        </a>

        <div className="productNavRight">
          <a href="/">
            Koleksiyon
          </a>

          <button
            onClick={openCart}
          >
            Sepet
            <span>{itemCount}</span>
          </button>
        </div>
      </header>

      <motion.div
        className="productHeroContent"
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
      >
        <p>
          {product.eyebrow}
        </p>

        <h1>
          {product.name}
        </h1>

        <h2>
          {product.subtitle}
        </h2>

        <p className="productHeroDescription">
          {product.description}
        </p>

        <a
          href="#configure"
          className="productHeroButton"
        >
          Buketini Oluştur

          <span>↓</span>
        </a>
      </motion.div>

      <div className="productHeroBottom">
        <span>
          {product.flowerName}
        </span>

        <span>
          FLOREA / PRODUCT
        </span>
      </div>
    </section>
  );
}

function ProductStory({
  product,
}: {
  product: NonNullable<
    ReturnType<
      typeof getProductById
    >
  >;
}) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,

    offset: [
      "start start",
      "end end",
    ],
  });

  const imageScale =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0.75, 1.18]
    );

  const imageY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [100, -40]
    );

  const firstOpacity =
    useTransform(
      scrollYProgress,
      [
        0,
        0.08,
        0.3,
        0.4,
      ],
      [
        0,
        1,
        1,
        0,
      ]
    );

  const secondOpacity =
    useTransform(
      scrollYProgress,
      [
        0.35,
        0.47,
        0.68,
        0.77,
      ],
      [
        0,
        1,
        1,
        0,
      ]
    );

  const finalOpacity =
    useTransform(
      scrollYProgress,
      [
        0.7,
        0.83,
        1,
      ],
      [
        0,
        1,
        1,
      ]
    );

  return (
    <section
      ref={sectionRef}
      className="productStory"
    >
      <div className="productStorySticky">
        <div className="productStoryGlow" />

        <motion.img
          src={product.heroImage}
          alt={product.name}
          className="productStoryFlower"
          style={{
            scale: imageScale,
            y: imageY,
          }}
        />

        <motion.div
          className="storyStage storyStageOne"
          style={{
            opacity:
              firstOpacity,
          }}
        >
          <span>01</span>

          <p>
            FLOREA SIGNATURE
          </p>

          <h2>
            Bir çiçekten
            <br />
            <em>daha fazlası.</em>
          </h2>
        </motion.div>

        <motion.div
          className="storyStage storyStageTwo"
          style={{
            opacity:
              secondOpacity,
          }}
        >
          <span>02</span>

          <p>
            DETAY
          </p>

          <h2>
            Tek tek
            <br />
            <em>seçildi.</em>
          </h2>

          <small>
            Her çiçek,
            görünümü ve
            tazeliği kontrol
            edilerek hazırlanır.
          </small>
        </motion.div>

        <motion.div
          className="storyStage storyStageFinal"
          style={{
            opacity:
              finalOpacity,
          }}
        >
          <span>03</span>

          <p>
            SENİN İÇİN
          </p>

          <h2>
            Şimdi onu
            <br />
            <em>kendine göre yarat.</em>
          </h2>

          <a href="#configure">
            Buketini oluştur ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProductBuilder({
  product,
}: {
  product: NonNullable<
    ReturnType<
      typeof getProductById
    >
  >;
}) {
  const {
    addItem,
    openCart,
  } = useCart();

  const [
    selectedSize,
    setSelectedSize,
  ] = useState(
    product.sizes[1] ??
      product.sizes[0]
  );

  const [
    selectedWrap,
    setSelectedWrap,
  ] = useState(
    product.wraps[0]
  );

  const [
    selectedCard,
    setSelectedCard,
  ] = useState(
    product.cards[0]
  );

  const [
    message,
    setMessage,
  ] = useState("");

  const totalPrice =
    selectedSize.price +
    selectedWrap.extraPrice +
    selectedCard.extraPrice;

  /*
    Şimdilik gerçek varyasyon
    görsellerimiz olmadığı için
    wrap'a göre CSS filtresi
    değiştiriyoruz.

    Daha sonra:
    /public/products/...
    içerisine gerçek görseller
    ekleyince direkt image URL
    değiştirebiliriz.
  */

  const wrapFilter =
    selectedWrap.id ===
    "cream"
      ? "brightness(1.08) saturate(.85)"
      : selectedWrap.id ===
        "kraft"
      ? "sepia(.18) brightness(.95)"
      : selectedWrap.id ===
        "pink"
      ? "sepia(.12) saturate(.9) hue-rotate(320deg)"
      : selectedWrap.id ===
        "white"
      ? "brightness(1.15) saturate(.7)"
      : "brightness(.88) contrast(1.08)";

  return (
    <section
      id="configure"
      className="productBuilder"
    >
      <div className="productBuilderHeading">
        <p>
          SENİN BUKETİN
        </p>

        <h2>
          Detayları seç.
          <br />

          <em>
            Hikâyeyi tamamla.
          </em>
        </h2>
      </div>

      <div className="productBuilderGrid">
        <div className="productBuilderVisual">
          <motion.div
            className="productBuilderImage"
            key={`${selectedSize.count}-${selectedWrap.id}`}
            initial={{
              opacity: 0.65,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <img
              src={
                product.heroImage
              }
              alt={
                product.name
              }
              style={{
                filter:
                  wrapFilter,
                transform: `scale(${
                  0.9 +
                  selectedSize.count /
                    250
                })`,
              }}
            />

            <div className="builderImageGradient" />

            <div className="builderLiveInfo">
              <span>
                {
                  selectedSize.count
                }{" "}
                {
                  product.flowerName
                }
              </span>

              <span>
                {
                  selectedWrap.name
                }{" "}
                AMBALAJ
              </span>
            </div>
          </motion.div>
        </div>

        <div className="productBuilderControls">
          <BuilderBlock
            number="01"
            eyebrow="BUKET BOYUTU"
            title="Ne kadar söylemek istiyorsun?"
          >
            <div className="sizeOptions">
              {product.sizes.map(
                (size) => (
                  <button
                    key={
                      size.count
                    }
                    className={
                      selectedSize.count ===
                      size.count
                        ? "sizeOption active"
                        : "sizeOption"
                    }
                    onClick={() =>
                      setSelectedSize(
                        size
                      )
                    }
                  >
                    <strong>
                      {
                        size.count
                      }
                    </strong>

                    <span>
                      {
                        size.label
                      }
                    </span>

                    <small>
                      ₺
                      {size.price.toLocaleString(
                        "tr-TR"
                      )}
                    </small>
                  </button>
                )
              )}
            </div>
          </BuilderBlock>

          <BuilderBlock
            number="02"
            eyebrow="AMBALAJ"
            title="Nasıl sunulsun?"
          >
            <div className="choiceOptions">
              {product.wraps.map(
                (wrap) => (
                  <button
                    key={
                      wrap.id
                    }
                    className={
                      selectedWrap.id ===
                      wrap.id
                        ? "choiceOption active"
                        : "choiceOption"
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

                    {wrap.extraPrice >
                      0 && (
                      <small>
                        +
                        ₺
                        {wrap.extraPrice}
                      </small>
                    )}
                  </button>
                )
              )}
            </div>
          </BuilderBlock>

          <BuilderBlock
            number="03"
            eyebrow="KART"
            title="Mesajının tonunu seç."
          >
            <div className="choiceOptions">
              {product.cards.map(
                (card) => (
                  <button
                    key={
                      card.id
                    }
                    className={
                      selectedCard.id ===
                      card.id
                        ? "choiceOption active"
                        : "choiceOption"
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

                    {card.extraPrice >
                      0 && (
                      <small>
                        +
                        ₺
                        {card.extraPrice}
                      </small>
                    )}
                  </button>
                )
              )}
            </div>
          </BuilderBlock>

          <BuilderBlock
            number="04"
            eyebrow="MESAJ"
            title="Söylemek istediğini yaz."
          >
            <textarea
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target
                    .value
                )
              }
              maxLength={140}
              placeholder="Seni ilk gördüğüm gün gibi..."
            />

            <div className="productMessageCount">
              {message.length}
              /140
            </div>
          </BuilderBlock>

          <div className="productPurchase">
            <div className="purchaseInfo">
              <div>
                <small>
                  SENİN BUKETİN
                </small>

                <strong>
                  {
                    selectedSize.count
                  }{" "}
                  {
                    product.flowerName
                  }
                </strong>

                <p>
                  {
                    selectedWrap.name
                  }{" "}
                  ·{" "}
                  {
                    selectedCard.name
                  }
                </p>
              </div>

              <div className="purchasePrice">
                ₺
                {totalPrice.toLocaleString(
                  "tr-TR"
                )}
              </div>
            </div>

            <button
              className="addToCartButton"
              onClick={() => {
                addItem({
                  productId: product.id,
                  name: product.name,
                  image: product.heroImage,
                  flowerName: product.flowerName,
                  size: selectedSize.count,
                  wrap: selectedWrap.name,
                  card: selectedCard.name,
                  message,
                  unitPrice: totalPrice,
                });

                openCart();
              }}
            >
              Sepete Ekle

              <span>
                ↗
              </span>
            </button>

            <p className="purchaseNote">
              Sipariş öncesinde
              teslimat tarihi ve
              adresi seçilecektir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuilderBlock({
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
    <div className="productBuilderBlock">
      <div className="productBuilderBlockTitle">
        <span>
          {number}
        </span>

        <div>
          <small>
            {eyebrow}
          </small>

          <h3>
            {title}
          </h3>
        </div>
      </div>

      {children}
    </div>
  );
}