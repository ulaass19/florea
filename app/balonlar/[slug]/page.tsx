'use client';

import Link from 'next/link';
import { use, useEffect, useMemo, useState } from 'react';
import { useCart } from '@/context/CartContext';

type ProductCategory = {
  id: string;
  slug: string;
  name: string;
};

type ProductImage = {
  id: string;
  url: string;
  alt?: string | null;
  sortOrder: number;
};

type ProductSize = {
  id: string;
  count: number;
  label?: string | null;
  price: number;
  isActive: boolean;
  sortOrder: number;
};

type ProductWrap = {
  id: string;
  name: string;
  extraPrice: number;
  isActive: boolean;
  sortOrder: number;
};

type ProductCard = {
  id: string;
  name: string;
  extraPrice: number;
  isActive: boolean;
  sortOrder: number;
};

type BalloonProduct = {
  id: string;
  slug: string;
  name: string;

  eyebrow?: string | null;
  subtitle?: string | null;
  description?: string | null;

  heroImage?: string | null;
  flowerName?: string | null;

  price?: number | null;

  isActive: boolean;
  isFeatured: boolean;

  categories?: ProductCategory[];
  images?: ProductImage[];
  sizes?: ProductSize[];
  wraps?: ProductWrap[];
  cards?: ProductCard[];
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:3001';

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(price);
}

function getHeroImage(product: BalloonProduct) {
  if (product.heroImage) {
    return product.heroImage;
  }

  const images = [...(product.images ?? [])].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return images[0]?.url ?? null;
}

function getBalloonName(product: BalloonProduct) {
  if (product.flowerName) {
    return product.flowerName;
  }

  if (product.categories?.length) {
    return product.categories[0].name;
  }

  return 'Balon';
}

export default function BalloonDetailPage({
  params,
}: PageProps) {
  const { slug } = use(params);

  const [product, setProduct] =
    useState<BalloonProduct | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    async function loadBalloon() {
      try {
        setLoading(true);
        setError('');

        /*
         * Balon kartındaki slug'ı mevcut ürün API'sinden
         * arıyoruz.
         */
        const response = await fetch(
  `${API_URL}/balloons/${encodeURIComponent(slug)}`,
  {
    cache: 'no-store',
  },
);

        if (response.status === 404) {
          setProduct(null);
          setError('Balon bulunamadı.');
          return;
        }

        if (!response.ok) {
          throw new Error(
            'Balon bilgileri alınamadı.',
          );
        }

        const data =
          (await response.json()) as BalloonProduct;

        if (!data || !data.isActive) {
          setProduct(null);
          setError('Balon bulunamadı.');
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error(
          'Balon yüklenemedi:',
          err,
        );

        setProduct(null);

        setError(
          err instanceof Error
            ? err.message
            : 'Balon yüklenemedi.',
        );
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      void loadBalloon();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="productNotFound">
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              margin: '0 auto',
              borderRadius: '999px',
              border:
                '2px solid rgba(53,31,40,0.15)',
              borderTopColor: '#351f28',
              animation:
                'spin 0.8s linear infinite',
            }}
          />

          <p
            style={{
              marginTop: '16px',
            }}
          >
            Balon yükleniyor...
          </p>
        </div>
      </main>
    );
  }

  if (!product || error) {
    return (
      <main className="productNotFound">
        <h1>
          {error || 'Balon bulunamadı.'}
        </h1>

        <Link href="/balonlar">
          Balonlara dön
        </Link>
      </main>
    );
  }

  return (
    <BalloonDetail product={product} />
  );
}

function BalloonDetail({
  product,
}: {
  product: BalloonProduct;
}) {
  const {
    addItem,
    openCart,
  } = useCart();

  const activeSizes = useMemo(
    () =>
      (product.sizes ?? [])
        .filter((size) => size.isActive)
        .sort(
          (a, b) =>
            a.sortOrder - b.sortOrder,
        ),
    [product.sizes],
  );

  const activeWraps = useMemo(
    () =>
      (product.wraps ?? [])
        .filter((wrap) => wrap.isActive)
        .sort(
          (a, b) =>
            a.sortOrder - b.sortOrder,
        ),
    [product.wraps],
  );

  const activeCards = useMemo(
    () =>
      (product.cards ?? [])
        .filter((card) => card.isActive)
        .sort(
          (a, b) =>
            a.sortOrder - b.sortOrder,
        ),
    [product.cards],
  );

  const defaultSize =
    activeSizes[0] ?? null;

  const defaultWrap =
    activeWraps[0] ?? null;

  const defaultCard =
    activeCards[0] ?? null;

  const [
    selectedSize,
    setSelectedSize,
  ] = useState<ProductSize | null>(
    defaultSize,
  );

  const [
    selectedWrap,
    setSelectedWrap,
  ] = useState<ProductWrap | null>(
    defaultWrap,
  );

  const [
    selectedCard,
    setSelectedCard,
  ] = useState<ProductCard | null>(
    defaultCard,
  );

  const [message, setMessage] =
    useState('');

  const heroImage =
    getHeroImage(product);

  const balloonName =
    getBalloonName(product);

  /*
   * Öncelik:
   * 1. Size fiyatı varsa onu kullan
   * 2. Yoksa product.price
   */
  const basePrice = Number(
    selectedSize?.price ??
      product.price ??
      0,
  );

  const totalPrice =
    basePrice +
    Number(
      selectedWrap?.extraPrice ?? 0,
    ) +
    Number(
      selectedCard?.extraPrice ?? 0,
    );

  const hasPrice =
    totalPrice > 0;

  const wrapName =
    selectedWrap?.name ?? 'Standart';

  const cardName =
    selectedCard?.name ?? 'Kartsız';

  function addToCart() {
    if (!hasPrice) {
      return;
    }

    addItem({
      productId: product.id,

      name: product.name,

      image: heroImage ?? '',

      flowerName: balloonName,

      /*
       * CartContext mevcut ürün yapısında
       * size alanını number bekliyor.
       */
      size:
        selectedSize?.count ?? 1,

      wrap: wrapName,

      card: cardName,

      message,

      unitPrice: totalPrice,
    });

    openCart();
  }

  return (
    <main className="productPage">
      <section className="productDetail">

        {/* Breadcrumb */}

        <nav
          className="productBreadcrumb"
          aria-label="Breadcrumb"
        >
          <Link href="/">
            Ana Sayfa
          </Link>

          <span>/</span>

          <Link href="/balonlar">
            Balonlar
          </Link>

          <span>/</span>

          <span>
            {product.name}
          </span>
        </nav>

        <div className="productDetailGrid">

          {/* SOL TARAF */}

          <div className="productDetailMedia">

            <div className="productDetailImageWrap">

              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="productDetailImage"
                  src={heroImage}
                  alt={product.name}
                />
              ) : (
                <div
                  className="productDetailImage"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:
                      'center',
                    background:
                      '#f3ece9',
                    color: '#8c787f',
                  }}
                >
                  Balon görseli
                  bulunamadı.
                </div>
              )}

              <span className="productDetailBadge">
                {product.isFeatured
                  ? 'ÖNE ÇIKAN'
                  : 'ÖZEL SEÇKİ'}
              </span>

            </div>

            <div className="productMediaNote">

              <span>
                {balloonName}
              </span>

              {selectedWrap && (
                <span>
                  {selectedWrap.name}
                </span>
              )}

            </div>

          </div>

          {/* SAĞ TARAF */}

          <div className="productDetailInfo">

            <p className="productEyebrow">
              {product.eyebrow ??
                product.categories
                  ?.map(
                    (category) =>
                      category.name,
                  )
                  .join(' / ') ??
                'Bİ BUKET NEŞE'}
            </p>

            <h1 className="productDetailTitle">
              {product.name}
            </h1>

            {product.subtitle && (
              <p className="productDetailSubtitle">
                {product.subtitle}
              </p>
            )}

            {product.description && (
              <p className="productDetailDescription">
                {product.description}
              </p>
            )}

            <div className="productDetailPrice">
              {hasPrice
                ? formatPrice(totalPrice)
                : 'Fiyat bilgisi bulunamadı'}
            </div>

            <div className="productDetailDivider" />

            {/* BOYUT */}

            {activeSizes.length > 0 && (
              <BalloonOptionGroup
                number="01"
                eyebrow="BALON SEÇENEĞİ"
                title="Balon boyutunu seç"
              >
                <div className="productSizeGrid">

                  {activeSizes.map(
                    (size) => (
                      <button
                        key={size.id}
                        type="button"
                        className={`productSizeButton ${
                          selectedSize?.id ===
                          size.id
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          setSelectedSize(
                            size,
                          )
                        }
                      >
                        <strong>
                          {size.count}
                        </strong>

                        <span>
                          {size.label ??
                            `${size.count} Adet`}
                        </span>

                        <small>
                          {formatPrice(
                            Number(
                              size.price,
                            ),
                          )}
                        </small>
                      </button>
                    ),
                  )}

                </div>
              </BalloonOptionGroup>
            )}

            {/* AMBALAJ */}

            {activeWraps.length > 0 && (
              <BalloonOptionGroup
                number={
                  activeSizes.length > 0
                    ? '02'
                    : '01'
                }
                eyebrow="AMBALAJ"
                title="Ambalaj seçimi"
              >
                <div className="productChoiceGrid">

                  {activeWraps.map(
                    (wrap) => (
                      <button
                        key={wrap.id}
                        type="button"
                        className={`productChoiceButton ${
                          selectedWrap?.id ===
                          wrap.id
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          setSelectedWrap(
                            wrap,
                          )
                        }
                      >
                        <span>
                          {wrap.name}
                        </span>

                        {Number(
                          wrap.extraPrice,
                        ) > 0 && (
                          <small>
                            +
                            {formatPrice(
                              Number(
                                wrap.extraPrice,
                              ),
                            )}
                          </small>
                        )}
                      </button>
                    ),
                  )}

                </div>
              </BalloonOptionGroup>
            )}

            {/* KART */}

            {activeCards.length > 0 && (
              <BalloonOptionGroup
                number="03"
                eyebrow="KART"
                title="Kart seçimi"
              >
                <div className="productChoiceGrid">

                  {activeCards.map(
                    (card) => (
                      <button
                        key={card.id}
                        type="button"
                        className={`productChoiceButton ${
                          selectedCard?.id ===
                          card.id
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          setSelectedCard(
                            card,
                          )
                        }
                      >
                        <span>
                          {card.name}
                        </span>

                        {Number(
                          card.extraPrice,
                        ) > 0 && (
                          <small>
                            +
                            {formatPrice(
                              Number(
                                card.extraPrice,
                              ),
                            )}
                          </small>
                        )}
                      </button>
                    ),
                  )}

                </div>
              </BalloonOptionGroup>
            )}

            {/* MESAJ */}

            <BalloonOptionGroup
              number="04"
              eyebrow="MESAJ"
              title="Kart mesajını yaz"
            >
              <textarea
                className="productMessage"
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value,
                  )
                }
                maxLength={140}
                placeholder="Mesajınızı buraya yazın..."
              />

              <div className="productMessageMeta">
                {message.length}/140
              </div>

            </BalloonOptionGroup>

            {/* SEPET */}

            <div className="productBuyBox">

              <div className="productBuySummary">

                <div>
                  <small>
                    SEÇİMİN
                  </small>

                  <strong>
                    {product.name}
                  </strong>

                  <p>
                    {[
                      selectedSize?.label,
                      selectedWrap?.name,
                      selectedCard?.name,
                    ]
                      .filter(Boolean)
                      .join(' · ') ||
                      'Standart seçim'}
                  </p>
                </div>

                <div className="productBuyPrice">
                  {hasPrice
                    ? formatPrice(
                        totalPrice,
                      )
                    : '—'}
                </div>

              </div>

              <button
                type="button"
                className="productAddButton"
                onClick={addToCart}
                disabled={!hasPrice}
                style={
                  !hasPrice
                    ? {
                        opacity: 0.5,
                        cursor:
                          'not-allowed',
                      }
                    : undefined
                }
              >
                <span>
                  {hasPrice
                    ? 'Sepete Ekle'
                    : 'Satışa Hazır Değil'}
                </span>

                <span>→</span>
              </button>

              <p className="productDeliveryNote">
                Teslimat tarihi ve adres
                bilgileri sipariş adımında
                seçilecektir.
              </p>

              <div className="productTrustRow">

                <div className="productTrustItem">
                  Özenli hazırlık
                </div>

                <div className="productTrustItem">
                  Güvenli teslimat
                </div>

                <div className="productTrustItem">
                  Güvenli ödeme
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}

function BalloonOptionGroup({
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
    <section className="productOptionGroup">

      <div className="productOptionHeader">

        <span className="productOptionNumber">
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

    </section>
  );
}
