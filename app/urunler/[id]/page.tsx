'use client';

import Link from 'next/link';

import {
  use,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type {
  ReactNode,
} from 'react';

import {
  useCart,
} from '@/context/CartContext';

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

type Product = {
  id: string;
  slug: string;
  name: string;

  eyebrow?: string | null;
  subtitle?: string | null;
  description?: string | null;

  heroImage?: string | null;
  flowerName?: string | null;

  isActive: boolean;
  isFeatured: boolean;

  categories?: ProductCategory[];
  images?: ProductImage[];
  sizes?: ProductSize[];
  wraps?: ProductWrap[];
  cards?: ProductCard[];

  createdAt?: string;
  updatedAt?: string;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:3001';

function formatPrice(
  price: number,
) {
  return new Intl.NumberFormat(
    'tr-TR',
    {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 0,
    },
  ).format(price);
}

function getFlowerName(
  product: Product,
) {
  if (
    product.flowerName
  ) {
    return product.flowerName;
  }

  if (
    product.categories &&
    product.categories.length >
      0
  ) {
    return product.categories[0]
      .name;
  }

  return 'Çiçek';
}

function getHeroImage(
  product: Product,
) {
  if (
    product.heroImage
  ) {
    return product.heroImage;
  }

  const images =
    [...(
      product.images ??
      []
    )].sort(
      (a, b) =>
        a.sortOrder -
        b.sortOrder,
    );

  return (
    images[0]?.url ??
    null
  );
}

export default function ProductPage({
  params,
}: PageProps) {
  const {
    id: slug,
  } = use(params);

  const [
    product,
    setProduct,
  ] = useState<
    Product | null
  >(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError('');

        const response =
          await fetch(
            `${API_URL}/products/${encodeURIComponent(
              slug,
            )}`,
            {
              cache:
                'no-store',
            },
          );

        if (
          response.status ===
          404
        ) {
          setProduct(null);

          setError(
            'Ürün bulunamadı.',
          );

          return;
        }

        if (
          !response.ok
        ) {
          throw new Error(
            'Ürün bilgileri alınamadı.',
          );
        }

        const data =
          (await response.json()) as Product;

        if (
          !data ||
          !data.isActive
        ) {
          setProduct(null);

          setError(
            'Ürün bulunamadı.',
          );

          return;
        }

        setProduct(data);
      } catch (err) {
        console.error(
          'Ürün yüklenemedi:',
          err,
        );

        setProduct(null);

        setError(
          err instanceof Error
            ? err.message
            : 'Ürün yüklenemedi.',
        );
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      void loadProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="productNotFound">
        <div
          style={{
            textAlign:
              'center',
          }}
        >
          <div
            style={{
              width:
                '40px',
              height:
                '40px',
              margin:
                '0 auto',
              borderRadius:
                '999px',
              border:
                '2px solid rgba(53,31,40,0.15)',
              borderTopColor:
                '#351f28',
              animation:
                'spin 0.8s linear infinite',
            }}
          />

          <p
            style={{
              marginTop:
                '16px',
            }}
          >
            Ürün
            yükleniyor...
          </p>
        </div>
      </main>
    );
  }

  if (
    !product ||
    error
  ) {
    return (
      <main className="productNotFound">
        <h1>
          {error ||
            'Ürün bulunamadı.'}
        </h1>

        <Link href="/urunler">
          Ürünlere dön
        </Link>
      </main>
    );
  }

  return (
    <ProductDetail
      product={product}
    />
  );
}

function ProductDetail({
  product,
}: {
  product: Product;
}) {
  const {
    addItem,
    openCart,
  } = useCart();

  const activeSizes =
    useMemo(
      () =>
        (
          product.sizes ??
          []
        )
          .filter(
            (size) =>
              size.isActive,
          )
          .sort(
            (a, b) =>
              a.sortOrder -
              b.sortOrder,
          ),
      [product.sizes],
    );

  const activeWraps =
    useMemo(
      () =>
        (
          product.wraps ??
          []
        )
          .filter(
            (wrap) =>
              wrap.isActive,
          )
          .sort(
            (a, b) =>
              a.sortOrder -
              b.sortOrder,
          ),
      [product.wraps],
    );

  const activeCards =
    useMemo(
      () =>
        (
          product.cards ??
          []
        )
          .filter(
            (card) =>
              card.isActive,
          )
          .sort(
            (a, b) =>
              a.sortOrder -
              b.sortOrder,
          ),
      [product.cards],
    );

  const defaultSize =
    activeSizes[1] ??
    activeSizes[0] ??
    null;

  const defaultWrap =
    activeWraps[0] ??
    null;

  const defaultCard =
    activeCards[0] ??
    null;

  const [
    selectedSize,
    setSelectedSize,
  ] = useState<
    ProductSize | null
  >(defaultSize);

  const [
    selectedWrap,
    setSelectedWrap,
  ] = useState<
    ProductWrap | null
  >(defaultWrap);

  const [
    selectedCard,
    setSelectedCard,
  ] = useState<
    ProductCard | null
  >(defaultCard);

  const [
    message,
    setMessage,
  ] = useState('');

  const flowerName =
    getFlowerName(
      product,
    );

  const heroImage =
    getHeroImage(
      product,
    );

  const totalPrice =
    Number(
      selectedSize?.price ??
        0,
    ) +
    Number(
      selectedWrap?.extraPrice ??
        0,
    ) +
    Number(
      selectedCard?.extraPrice ??
        0,
    );

  const canAddToCart =
    Boolean(
      selectedSize,
    );

  const wrapName =
    selectedWrap?.name ??
    'Standart';

  const cardName =
    selectedCard?.name ??
    'Kartsız';

  const wrapFilter =
    useMemo(() => {
      const name =
        selectedWrap?.name
          ?.toLocaleLowerCase(
            'tr-TR',
          ) ?? '';

      if (
        name.includes(
          'krem',
        ) ||
        name.includes(
          'cream',
        )
      ) {
        return 'brightness(1.08) saturate(.85)';
      }

      if (
        name.includes(
          'kraft',
        )
      ) {
        return 'sepia(.18) brightness(.95)';
      }

      if (
        name.includes(
          'pembe',
        ) ||
        name.includes(
          'pink',
        )
      ) {
        return 'sepia(.12) saturate(.9) hue-rotate(320deg)';
      }

      if (
        name.includes(
          'beyaz',
        ) ||
        name.includes(
          'white',
        )
      ) {
        return 'brightness(1.15) saturate(.7)';
      }

      if (
        name.includes(
          'siyah',
        ) ||
        name.includes(
          'black',
        )
      ) {
        return 'brightness(.88) contrast(1.08)';
      }

      return 'none';
    }, [selectedWrap]);

  function addToCart() {
    if (
      !selectedSize
    ) {
      return;
    }

    addItem({
      productId:
        product.id,

      name:
        product.name,

      image:
        heroImage ?? '',

      flowerName,

      size:
        selectedSize.count,

      wrap:
        wrapName,

      card:
        cardName,

      message,

      unitPrice:
        totalPrice,
    });

    openCart();
  }

  return (
    <main className="productPage">
      <section className="productDetail">
        <nav
          className="productBreadcrumb"
          aria-label="Breadcrumb"
        >
          <Link href="/">
            Ana Sayfa
          </Link>

          <span>
            /
          </span>

          <Link href="/urunler">
            Ürünler
          </Link>

          <span>
            /
          </span>

          <span>
            {product.name}
          </span>
        </nav>

        <div className="productDetailGrid">
          <div className="productDetailMedia">
            <div className="productDetailImageWrap">
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="productDetailImage"
                  src={
                    heroImage
                  }
                  alt={
                    product.name
                  }
                  style={{
                    filter:
                      wrapFilter,
                  }}
                />
              ) : (
                <div
                  className="productDetailImage"
                  style={{
                    display:
                      'flex',
                    alignItems:
                      'center',
                    justifyContent:
                      'center',
                    background:
                      '#f3ece9',
                    color:
                      '#8c787f',
                  }}
                >
                  Ürün görseli
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
                {selectedSize
                  ? `${selectedSize.count} ${flowerName}`
                  : flowerName}
              </span>

              {selectedWrap && (
                <span>
                  {
                    selectedWrap.name
                  }{' '}
                  ambalaj
                </span>
              )}
            </div>
          </div>

          <div className="productDetailInfo">
            <p className="productEyebrow">
              {product.eyebrow ??
                product.categories
                  ?.map(
                    (
                      category,
                    ) =>
                      category.name,
                  )
                  .join(
                    ' / ',
                  ) ??
                'Bİ BUKET NEŞE'}
            </p>

            <h1 className="productDetailTitle">
              {product.name}
            </h1>

            {product.subtitle && (
              <p className="productDetailSubtitle">
                {
                  product.subtitle
                }
              </p>
            )}

            {product.description && (
              <p className="productDetailDescription">
                {
                  product.description
                }
              </p>
            )}

            {selectedSize ? (
              <div className="productDetailPrice">
                {formatPrice(
                  totalPrice,
                )}
              </div>
            ) : (
              <div className="productDetailPrice">
                Fiyat seçeneği
                bulunmuyor
              </div>
            )}

            <div className="productDetailDivider" />

            {activeSizes.length >
              0 && (
              <OptionGroup
                number="01"
                eyebrow="BUKET BOYUTU"
                title="Buket boyutunu seç"
              >
                <div className="productSizeGrid">
                  {activeSizes.map(
                    (size) => (
                      <button
                        type="button"
                        key={
                          size.id
                        }
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
                          {
                            size.count
                          }
                        </strong>

                        <span>
                          {size.label ??
                            `${size.count} ${flowerName}`}
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
              </OptionGroup>
            )}

            {activeWraps.length >
              0 && (
              <OptionGroup
                number="02"
                eyebrow="AMBALAJ"
                title="Ambalaj seçimi"
              >
                <div className="productChoiceGrid">
                  {activeWraps.map(
                    (wrap) => (
                      <button
                        type="button"
                        key={
                          wrap.id
                        }
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
                          {
                            wrap.name
                          }
                        </span>

                        {Number(
                          wrap.extraPrice,
                        ) >
                          0 && (
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
              </OptionGroup>
            )}

            {activeCards.length >
              0 && (
              <OptionGroup
                number="03"
                eyebrow="KART"
                title="Kart seçimi"
              >
                <div className="productChoiceGrid">
                  {activeCards.map(
                    (card) => (
                      <button
                        type="button"
                        key={
                          card.id
                        }
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
                          {
                            card.name
                          }
                        </span>

                        {Number(
                          card.extraPrice,
                        ) >
                          0 && (
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
              </OptionGroup>
            )}

            <OptionGroup
              number={
                activeCards.length >
                0
                  ? '04'
                  : activeWraps.length >
                      0
                    ? '03'
                    : '02'
              }
              eyebrow="MESAJ"
              title="Kart mesajını yaz"
            >
              <textarea
                className="productMessage"
                value={message}
                onChange={(
                  event,
                ) =>
                  setMessage(
                    event.target
                      .value,
                  )
                }
                maxLength={140}
                placeholder="Mesajınızı buraya yazın..."
              />

              <div className="productMessageMeta">
                {
                  message.length
                }
                /140
              </div>
            </OptionGroup>

            <div className="productBuyBox">
              <div className="productBuySummary">
                <div>
                  <small>
                    SEÇİMİN
                  </small>

                  <strong>
                    {selectedSize
                      ? `${selectedSize.count} ${flowerName}`
                      : flowerName}
                  </strong>

                  <p>
                    {[
                      selectedWrap
                        ?.name,
                      selectedCard
                        ?.name,
                    ]
                      .filter(
                        Boolean,
                      )
                      .join(
                        ' · ',
                      ) ||
                      'Standart seçim'}
                  </p>
                </div>

                <div className="productBuyPrice">
                  {selectedSize
                    ? formatPrice(
                        totalPrice,
                      )
                    : '—'}
                </div>
              </div>

              <button
                type="button"
                className="productAddButton"
                onClick={
                  addToCart
                }
                disabled={
                  !canAddToCart
                }
                style={
                  !canAddToCart
                    ? {
                        opacity:
                          0.5,
                        cursor:
                          'not-allowed',
                      }
                    : undefined
                }
              >
                <span>
                  {canAddToCart
                    ? 'Sepete Ekle'
                    : 'Satışa Hazır Değil'}
                </span>

                <span>
                  →
                </span>
              </button>

              <p className="productDeliveryNote">
                Teslimat tarihi
                ve adres
                bilgileri
                sipariş
                adımında
                seçilecektir.
              </p>

              <div className="productTrustRow">
                <div className="productTrustItem">
                  Taze çiçek
                  garantisi
                </div>

                <div className="productTrustItem">
                  Özenli hazırlık
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

function OptionGroup({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
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