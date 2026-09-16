'use client';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  motion,
} from 'framer-motion';

type BalloonVariant = {
  id: string;
  name: string;
  color?: string | null;
  size?: string | null;
  heliumIncluded: boolean;
  price: number;
  stockEnabled: boolean;
  stockQuantity: number;
  isActive: boolean;
  sortOrder: number;
};

type BalloonImage = {
  id: string;
  url: string;
  alt?: string | null;
  sortOrder: number;
};

type Balloon = {
  id: string;
  slug: string;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  heroImage?: string | null;
  isActive: boolean;
  isFeatured: boolean;
  images?: BalloonImage[];
  variants?: BalloonVariant[];
};

type FilterType =
  | 'all'
  | 'featured'
  | 'helium'
  | 'no-helium';

type SortType =
  | 'recommended'
  | 'price-asc'
  | 'price-desc';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:3001';

const filters: {
  id: FilterType;
  name: string;
}[] = [
  {
    id: 'all',
    name: 'Tümü',
  },
  {
    id: 'featured',
    name: 'Öne Çıkanlar',
  },
  {
    id: 'helium',
    name: 'Helyumlu',
  },
  {
    id: 'no-helium',
    name: 'Helyumsuz',
  },
];

function getActiveVariants(
  balloon: Balloon,
) {
  return (
    balloon.variants
      ?.filter(
        (variant) =>
          variant.isActive,
      )
      .sort(
        (a, b) =>
          a.sortOrder -
          b.sortOrder,
      ) ?? []
  );
}

function getMinimumPrice(
  balloon: Balloon,
) {
  const prices =
    getActiveVariants(
      balloon,
    )
      .map(
        (variant) =>
          Number(
            variant.price,
          ),
      )
      .filter(
        (price) =>
          Number.isFinite(
            price,
          ),
      );

  if (
    prices.length === 0
  ) {
    return null;
  }

  return Math.min(
    ...prices,
  );
}

function getBalloonImage(
  balloon: Balloon,
) {
  if (
    balloon.heroImage
  ) {
    return balloon.heroImage;
  }

  const images =
    [...(
      balloon.images ??
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

function hasHeliumVariant(
  balloon: Balloon,
) {
  return getActiveVariants(
    balloon,
  ).some(
    (variant) =>
      variant.heliumIncluded,
  );
}

function hasNonHeliumVariant(
  balloon: Balloon,
) {
  return getActiveVariants(
    balloon,
  ).some(
    (variant) =>
      !variant.heliumIncluded,
  );
}

function getStockState(
  balloon: Balloon,
) {
  const variants =
    getActiveVariants(
      balloon,
    );

  if (
    variants.length === 0
  ) {
    return false;
  }

  return variants.some(
    (variant) =>
      !variant.stockEnabled ||
      variant.stockQuantity >
        0,
  );
}

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

function getFilterLabel(
  balloon: Balloon,
) {
  if (
    balloon.isFeatured
  ) {
    return 'Öne Çıkan';
  }

  const helium =
    hasHeliumVariant(
      balloon,
    );

  const nonHelium =
    hasNonHeliumVariant(
      balloon,
    );

  if (
    helium &&
    nonHelium
  ) {
    return 'Helyum Seçenekli';
  }

  if (helium) {
    return 'Helyumlu';
  }

  if (nonHelium) {
    return 'Helyumsuz';
  }

  return 'Balon';
}

export default function BalloonsPage() {
  const [
    balloons,
    setBalloons,
  ] = useState<
    Balloon[]
  >([]);

  const [
    activeFilter,
    setActiveFilter,
  ] = useState<FilterType>(
    'all',
  );

  const [
    sort,
    setSort,
  ] = useState<SortType>(
    'recommended',
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState('');

  useEffect(() => {
    async function loadBalloons() {
      try {
        setLoading(true);
        setError('');

        const response =
          await fetch(
            `${API_URL}/balloons`,
            {
              cache:
                'no-store',
            },
          );

        if (
          !response.ok
        ) {
          throw new Error(
            'Balonlar alınamadı.',
          );
        }

        const data =
          (await response.json()) as Balloon[];

        setBalloons(
          data.filter(
            (balloon) =>
              balloon.isActive,
          ),
        );
      } catch (err) {
        console.error(
          'Balonlar yüklenemedi:',
          err,
        );

        setError(
          err instanceof Error
            ? err.message
            : 'Balonlar yüklenemedi.',
        );
      } finally {
        setLoading(false);
      }
    }

    void loadBalloons();
  }, []);

  const displayedProducts =
    useMemo(() => {
      let result =
        [...balloons];

      if (
        activeFilter ===
        'featured'
      ) {
        result =
          result.filter(
            (balloon) =>
              balloon.isFeatured,
          );
      }

      if (
        activeFilter ===
        'helium'
      ) {
        result =
          result.filter(
            (balloon) =>
              hasHeliumVariant(
                balloon,
              ),
          );
      }

      if (
        activeFilter ===
        'no-helium'
      ) {
        result =
          result.filter(
            (balloon) =>
              hasNonHeliumVariant(
                balloon,
              ),
          );
      }

      if (
        sort ===
        'price-asc'
      ) {
        result.sort(
          (a, b) => {
            const aPrice =
              getMinimumPrice(
                a,
              );

            const bPrice =
              getMinimumPrice(
                b,
              );

            if (
              aPrice === null &&
              bPrice === null
            ) {
              return 0;
            }

            if (
              aPrice === null
            ) {
              return 1;
            }

            if (
              bPrice === null
            ) {
              return -1;
            }

            return (
              aPrice -
              bPrice
            );
          },
        );
      }

      if (
        sort ===
        'price-desc'
      ) {
        result.sort(
          (a, b) => {
            const aPrice =
              getMinimumPrice(
                a,
              );

            const bPrice =
              getMinimumPrice(
                b,
              );

            if (
              aPrice === null &&
              bPrice === null
            ) {
              return 0;
            }

            if (
              aPrice === null
            ) {
              return 1;
            }

            if (
              bPrice === null
            ) {
              return -1;
            }

            return (
              bPrice -
              aPrice
            );
          },
        );
      }

      if (
        sort ===
        'recommended'
      ) {
        result.sort(
          (a, b) => {
            if (
              a.isFeatured !==
              b.isFeatured
            ) {
              return a.isFeatured
                ? -1
                : 1;
            }

            return 0;
          },
        );
      }

      return result;
    }, [
      balloons,
      activeFilter,
      sort,
    ]);

  return (
    <main className="balloonsPage">
      <section className="balloonsHeader">
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
            Balonlar
          </h1>

          <span>
            Kutlamalara biraz
            daha renk, biraz
            daha neşe.
          </span>
        </motion.div>
      </section>

      <section className="balloonsCategories">
        {filters
          .filter(
            (filter) =>
              filter.id !==
              'all',
          )
          .map(
            (
              filter,
              index,
            ) => (
              <motion.button
                key={
                  filter.id
                }
                type="button"
                className={[
                  'balloonCategoryCard',
                  activeFilter ===
                  filter.id
                    ? 'active'
                    : '',
                ].join(' ')}
                onClick={() =>
                  setActiveFilter(
                    filter.id,
                  )
                }
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay:
                    index *
                    0.06,
                }}
              >
                <span>
                  {String(
                    index + 1,
                  ).padStart(
                    2,
                    '0',
                  )}
                </span>

                <strong>
                  {
                    filter.name
                  }
                </strong>
              </motion.button>
            ),
          )}
      </section>

      <section className="balloonsShop">
        <aside className="balloonsSidebar">
          <h3>
            Filtrele
          </h3>

          <div>
            {filters.map(
              (filter) => (
                <button
                  key={
                    filter.id
                  }
                  type="button"
                  onClick={() =>
                    setActiveFilter(
                      filter.id,
                    )
                  }
                  className={
                    activeFilter ===
                    filter.id
                      ? 'active'
                      : ''
                  }
                >
                  {
                    filter.name
                  }
                </button>
              ),
            )}
          </div>

          <div className="balloonsSidebarInfo">
            <strong>
              Balon + Çiçek
            </strong>

            <p>
              Balon ürünlerini
              çiçek siparişinle
              birlikte
              özelleştirebilirsin.
            </p>
          </div>
        </aside>

        <div className="balloonsProducts">
          <div className="balloonsToolbar">
            <div>
              <strong>
                {
                  displayedProducts.length
                }
              </strong>

              <span>
                ürün bulundu
              </span>
            </div>

            <select
              value={sort}
              onChange={(
                event,
              ) =>
                setSort(
                  event.target
                    .value as SortType,
                )
              }
            >
              <option value="recommended">
                Önerilen
              </option>

              <option value="price-asc">
                Fiyat: Artan
              </option>

              <option value="price-desc">
                Fiyat: Azalan
              </option>
            </select>
          </div>

          {loading && (
            <div
              style={{
                minHeight:
                  '420px',
                display:
                  'flex',
                alignItems:
                  'center',
                justifyContent:
                  'center',
                textAlign:
                  'center',
              }}
            >
              <div>
                <div
                  style={{
                    width:
                      '36px',
                    height:
                      '36px',
                    border:
                      '2px solid rgba(53,31,40,0.15)',
                    borderTopColor:
                      '#351f28',
                    borderRadius:
                      '999px',
                    margin:
                      '0 auto 16px',
                    animation:
                      'spin 0.8s linear infinite',
                  }}
                />

                <p>
                  Balonlar
                  yükleniyor...
                </p>
              </div>
            </div>
          )}

          {!loading &&
            error && (
              <div
                style={{
                  minHeight:
                    '350px',
                  display:
                    'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                  textAlign:
                    'center',
                  padding:
                    '30px',
                }}
              >
                <div>
                  <strong>
                    Balonlar
                    yüklenemedi.
                  </strong>

                  <p
                    style={{
                      marginTop:
                        '10px',
                      opacity:
                        0.6,
                    }}
                  >
                    {error}
                  </p>
                </div>
              </div>
            )}

          {!loading &&
            !error &&
            displayedProducts.length ===
              0 && (
              <div
                style={{
                  minHeight:
                    '350px',
                  display:
                    'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                  textAlign:
                    'center',
                  padding:
                    '30px',
                }}
              >
                <div>
                  <strong>
                    Bu filtrede
                    balon
                    bulunamadı.
                  </strong>

                  <p
                    style={{
                      marginTop:
                        '10px',
                      opacity:
                        0.6,
                    }}
                  >
                    Başka bir
                    filtre
                    seçebilirsin.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveFilter(
                        'all',
                      )
                    }
                    style={{
                      marginTop:
                        '20px',
                    }}
                  >
                    Tümünü Göster
                  </button>
                </div>
              </div>
            )}

          {!loading &&
            !error &&
            displayedProducts.length >
              0 && (
              <motion.div
                layout
                className="balloonsGrid"
              >
                {displayedProducts.map(
                  (
                    product,
                    index,
                  ) => {
                    const image =
                      getBalloonImage(
                        product,
                      );

                    const price =
                      getMinimumPrice(
                        product,
                      );

                    const inStock =
                      getStockState(
                        product,
                      );

                    const label =
                      getFilterLabel(
                        product,
                      );

                    return (
                      <motion.a
                        layout
                        key={
                          product.id
                        }
                        href={`/balonlar/${product.slug}`}
                        className="balloonProductCard"
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration:
                            0.4,
                          delay:
                            index *
                            0.04,
                        }}
                      >
                        <div className="balloonProductImage">
                          {image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={
                                image
                              }
                              alt={
                                product.name
                              }
                            />
                          ) : (
                            <div
                              style={{
                                width:
                                  '100%',
                                height:
                                  '100%',
                                display:
                                  'flex',
                                alignItems:
                                  'center',
                                justifyContent:
                                  'center',
                                background:
                                  '#f4eeee',
                                color:
                                  '#8b747d',
                              }}
                            >
                              Görsel yok
                            </div>
                          )}

                          <span>
                            {
                              label
                            }
                          </span>

                          <div className="balloonProductHover">
                            İncele
                          </div>
                        </div>

                        <div className="balloonProductInfo">
                          <h2>
                            {
                              product.name
                            }
                          </h2>

                          <p>
                            {product.subtitle ??
                              product.description ??
                              'Özel günlerini tamamlayan dekoratif balon seçeneği.'}
                          </p>

                          <div>
                            <strong>
                              {price !==
                              null
                                ? formatPrice(
                                    price,
                                  )
                                : 'Fiyat seçenekte'}
                            </strong>

                            <span>
                              →
                            </span>
                          </div>

                          {!inStock && (
                            <small
                              style={{
                                display:
                                  'block',
                                marginTop:
                                  '10px',
                                opacity:
                                  0.55,
                              }}
                            >
                              Şu anda
                              stokta yok
                            </small>
                          )}
                        </div>
                      </motion.a>
                    );
                  },
                )}
              </motion.div>
            )}
        </div>
      </section>
    </main>
  );
}