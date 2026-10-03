'use client';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  motion,
} from 'framer-motion';

type ProductCategory = {
  id: string;
  slug: string;
  name: string;
  isActive?: boolean;
  sortOrder?: number;
};

type ProductSize = {
  id: string;
  count: number;
  price: number;
  isActive: boolean;
  sortOrder: number;
};

type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  heroImage?: string | null;
  flowerName?: string | null;

  isActive: boolean;
  isFeatured: boolean;

  categories?: ProductCategory[];
  sizes?: ProductSize[];

  createdAt?: string;
  updatedAt?: string;

  itemType?: 'product' | 'balloon';
};

type SortType =
  | 'recommended'
  | 'price-asc'
  | 'price-desc';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:3001';

const sortOptions: {
  value: SortType;
  label: string;
}[] = [
  {
    value: 'recommended',
    label: 'Önerilen',
  },
  {
    value: 'price-asc',
    label: 'Fiyat: Artan',
  },
  {
    value: 'price-desc',
    label: 'Fiyat: Azalan',
  },
];

function getActiveSizes(
  product: Product,
) {
  return (
    product.sizes
      ?.filter(
        (size) =>
          size.isActive,
      )
      .sort(
        (a, b) =>
          a.sortOrder -
          b.sortOrder,
      ) ?? []
  );
}

function getMinimumPrice(
  product: Product,
) {
  const prices =
    getActiveSizes(
      product,
    )
      .map(
        (size) =>
          Number(
            size.price,
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

function getProductType(
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
    return product.categories
      .map(
        (category) =>
          category.name,
      )
      .join(' • ');
  }

  if (product.itemType === 'balloon') {
    return 'Balon';
  }

  return 'Özel Buket';
}

function getProductBadge(
  product: Product,
) {
  if (
    product.isFeatured
  ) {
    return 'Öne Çıkan';
  }

  if (product.itemType === 'balloon') {
    return 'Balon';
  }

  return 'Özel Seçki';
}

export default function ProductsPage() {
  const [
    products,
    setProducts,
  ] = useState<Product[]>(
    [],
  );

  const [
    activeCategory,
    setActiveCategory,
  ] = useState('all');

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
    async function loadProducts() {
      try {
        setLoading(true);
        setError('');

        const [
          productResponse,
          balloonResponse,
        ] = await Promise.all([
          fetch(
            `${API_URL}/products`,
            {
              cache: 'no-store',
            },
          ),
          fetch(
            `${API_URL}/balloons`,
            {
              cache: 'no-store',
            },
          ),
        ]);

        if (!productResponse.ok) {
          throw new Error(
            'Ürünler alınamadı.',
          );
        }

        if (!balloonResponse.ok) {
          throw new Error(
            'Balonlar alınamadı.',
          );
        }

        const productData =
          (await productResponse.json()) as Product[];

        const balloonData =
          (await balloonResponse.json()) as Product[];

        const normalizedProducts =
          productData.map((product) => ({
            ...product,
            itemType: 'product' as const,
          }));

        const normalizedBalloons =
          balloonData.map((balloon) => ({
            ...balloon,
            itemType: 'balloon' as const,
          }));

        setProducts(
          [
            ...normalizedProducts,
            ...normalizedBalloons,
          ].filter(
            (product) =>
              product.isActive !== false,
          ),
        );
      } catch (err) {
        console.error(
          'Ürünler yüklenemedi:',
          err,
        );

        setError(
          err instanceof Error
            ? err.message
            : 'Ürünler yüklenemedi.',
        );
      } finally {
        setLoading(false);
      }
    }

    void loadProducts();
  }, []);

  const categories =
    useMemo(() => {
      const categoryMap =
        new Map<
          string,
          ProductCategory
        >();

      products.forEach(
        (product) => {
          product.categories?.forEach(
            (category) => {
              if (
                category.isActive ===
                false
              ) {
                return;
              }

              if (
                !categoryMap.has(
                  category.id,
                )
              ) {
                categoryMap.set(
                  category.id,
                  category,
                );
              }
            },
          );
        },
      );

      return Array.from(
        categoryMap.values(),
      ).sort(
        (a, b) => {
          const aOrder =
            a.sortOrder ?? 0;

          const bOrder =
            b.sortOrder ?? 0;

          if (
            aOrder !==
            bOrder
          ) {
            return (
              aOrder -
              bOrder
            );
          }

          return a.name.localeCompare(
            b.name,
            'tr',
          );
        },
      );
    }, [products]);

  const categoryCounts =
    useMemo(() => {
      const counts =
        new Map<
          string,
          number
        >();

      categories.forEach(
        (category) => {
          const count =
            products.filter(
              (product) =>
                product.categories?.some(
                  (
                    productCategory,
                  ) =>
                    productCategory.id ===
                    category.id,
                ),
            ).length;

          counts.set(
            category.id,
            count,
          );
        },
      );

      return counts;
    }, [
      categories,
      products,
    ]);

  const displayedProducts =
    useMemo(() => {
      let result =
        [...products];

      if (
        activeCategory !==
        'all'
      ) {
        result =
          result.filter(
            (product) =>
              product.categories?.some(
                (category) =>
                  category.id ===
                  activeCategory,
              ),
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

            if (
              a.createdAt &&
              b.createdAt
            ) {
              return (
                new Date(
                  b.createdAt,
                ).getTime() -
                new Date(
                  a.createdAt,
                ).getTime()
              );
            }

            return 0;
          },
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

      return result;
    }, [
      products,
      activeCategory,
      sort,
    ]);

  return (
    <main className="shopPage">
      <section className="shopHeader">
        <div>
          <p>
            Bİ BUKET NEŞE
          </p>

          <h1>
            Tüm Ürünler
          </h1>

          <span>
            Sevdiklerin için
            en güzel buketi
            seç.
          </span>
        </div>
      </section>

      <section className="shopContainer">
        <aside className="shopSidebar">
          <div className="shopSidebarTitle">
            Kategoriler
          </div>

          <div className="shopCategories">
            <button
              type="button"
              className={
                activeCategory ===
                'all'
                  ? 'shopCategory active'
                  : 'shopCategory'
              }
              onClick={() =>
                setActiveCategory(
                  'all',
                )
              }
            >
              <span>
                Tümü
              </span>

              <small>
                {
                  products.length
                }
              </small>
            </button>

            {categories.map(
              (category) => (
                <button
                  type="button"
                  key={
                    category.id
                  }
                  className={
                    activeCategory ===
                    category.id
                      ? 'shopCategory active'
                      : 'shopCategory'
                  }
                  onClick={() =>
                    setActiveCategory(
                      category.id,
                    )
                  }
                >
                  <span>
                    {
                      category.name
                    }
                  </span>

                  <small>
                    {categoryCounts.get(
                      category.id,
                    ) ?? 0}
                  </small>
                </button>
              ),
            )}
          </div>

          <div className="shopSidebarDivider" />

          <div className="shopSidebarInfo">
            <span>
              Aynı gün teslimat
            </span>

            <p>
              Teslimat detayları
              sipariş sırasında
              WhatsApp üzerinden
              netleştirilir.
            </p>
          </div>
        </aside>

        <div className="shopContent">
          <div className="shopToolbar">
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
              {sortOptions.map(
                (option) => (
                  <option
                    key={
                      option.value
                    }
                    value={
                      option.value
                    }
                  >
                    {
                      option.label
                    }
                  </option>
                ),
              )}
            </select>
          </div>

          {loading && (
            <div
              style={{
                minHeight:
                  '450px',
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
                      '38px',
                    height:
                      '38px',
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
                    opacity:
                      0.6,
                  }}
                >
                  Ürünler
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
                    '400px',
                  display:
                    'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                  padding:
                    '40px 20px',
                  textAlign:
                    'center',
                }}
              >
                <div>
                  <strong>
                    Ürünler
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

                  <button
                    type="button"
                    onClick={() =>
                      window.location.reload()
                    }
                    style={{
                      marginTop:
                        '20px',
                      cursor:
                        'pointer',
                    }}
                  >
                    Tekrar Dene
                  </button>
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
                    '400px',
                  display:
                    'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                  padding:
                    '40px 20px',
                  textAlign:
                    'center',
                }}
              >
                <div>
                  <strong>
                    Bu kategoride
                    ürün
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
                    kategoriye
                    göz atabilirsin.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        'all',
                      )
                    }
                    style={{
                      marginTop:
                        '20px',
                      cursor:
                        'pointer',
                    }}
                  >
                    Tüm Ürünleri
                    Göster
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
                className="shopGrid"
              >
                {displayedProducts.map(
                  (
                    product,
                    index,
                  ) => {
                    const price =
                      getMinimumPrice(
                        product,
                      );

                    const type =
                      getProductType(
                        product,
                      );

                    const badge =
                      getProductBadge(
                        product,
                      );

                    return (
                      <motion.a
                        layout
                        key={
                          product.id
                        }
                        href={
                          product.itemType === 'balloon'
                            ? `/balonlar/${product.slug}`
                            : `/urunler/${product.slug}`
                        }
                        className="shopProductCard"
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
                        <div className="shopProductImage">
                          {product.heroImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={
                                product.heroImage
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
                                  '#f3ece9',
                                color:
                                  '#8c787f',
                              }}
                            >
                              Görsel yok
                            </div>
                          )}

                          <span className="shopBadge">
                            {badge}
                          </span>

                          <div className="shopQuickView">
                            İncele
                          </div>
                        </div>

                        <div className="shopProductInfo">
                          <span className="shopProductType">
                            {type}
                          </span>

                          <h2>
                            {
                              product.name
                            }
                          </h2>

                          <p>
                            {product.subtitle ??
                              product.description ??
                              product.itemType === 'balloon'
                                ? 'Özel günlerin için seçilmiş balon.'
                                : 'Özenle hazırlanmış özel buket.'}
                          </p>

                          <div className="shopProductBottom">
                            <div>
                              <small>
                                Başlangıç
                              </small>

                              <strong>
                                {price !==
                                null
                                  ? formatPrice(
                                      price,
                                    )
                                  : 'Fiyat seçenekte'}
                              </strong>
                            </div>

                            <span className="shopArrow">
                              →
                            </span>
                          </div>
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
