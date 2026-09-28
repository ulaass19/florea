'use client';

import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type ProductSize = {
  id: string;
  count: number;
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

type ProductCategory = {
  id: string;
  name: string;
  slug: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  isActive?: boolean;
  sortOrder?: number;
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
  wraps?: ProductWrap[];
};

type CollectionProduct = {
  sortOrder: number;
  product: Product;
};

type Collection = {
  id: string;
  slug: string;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  image?: string | null;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  products: CollectionProduct[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:3001';

function getMinimumPrice(
  product?: Product | null,
) {
  if (!product) {
    return null;
  }

  const prices =
    product.sizes
      ?.filter(
        (size) =>
          size.isActive,
      )
      .map(
        (size) =>
          Number(size.price),
      )
      .filter(
        (price) =>
          Number.isFinite(price),
      ) ?? [];

  if (
    prices.length === 0
  ) {
    return null;
  }

  return Math.min(
    ...prices,
  );
}

function getDefaultSize(
  product?: Product | null,
) {
  if (!product) {
    return null;
  }

  const activeSizes =
    product.sizes
      ?.filter(
        (size) =>
          size.isActive,
      )
      .sort(
        (a, b) =>
          a.sortOrder -
          b.sortOrder,
      ) ?? [];

  if (
    activeSizes.length === 0
  ) {
    return null;
  }

  return activeSizes[0];
}

function getDefaultWrap(
  product?: Product | null,
) {
  if (!product) {
    return null;
  }

  const wraps =
    product.wraps
      ?.filter(
        (wrap) =>
          wrap.isActive,
      )
      .sort(
        (a, b) =>
          a.sortOrder -
          b.sortOrder,
      ) ?? [];

  return wraps[0] ?? null;
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

function splitTitle(
  title: string,
) {
  const words =
    title
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  if (
    words.length <= 1
  ) {
    return {
      first:
        words[0] ?? '',
      second: '',
    };
  }

  return {
    first:
      words
        .slice(
          0,
          words.length - 1,
        )
        .join(' '),

    second:
      words[
        words.length - 1
      ],
  };
}

function getCollectionProduct(
  collection: Collection,
) {
  const products =
    [...(
      collection.products ??
      []
    )].sort(
      (a, b) =>
        a.sortOrder -
        b.sortOrder,
    );

  return (
    products.find(
      (item) =>
        item.product
          .isActive,
    )?.product ??
    products[0]?.product ??
    null
  );
}

function ProductShowcase({
  product,
}: {
  product: Product | null;
}) {
  const sectionRef =
    useRef<HTMLElement>(
      null,
    );

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      'start start',
      'end end',
    ],
  });

  const flowerScale =
    useTransform(
      scrollYProgress,
      [
        0,
        0.25,
        0.55,
        0.8,
        1,
      ],
      [
        0.72,
        0.92,
        1.08,
        1.18,
        1.25,
      ],
    );

  const flowerY =
    useTransform(
      scrollYProgress,
      [
        0,
        0.45,
        1,
      ],
      [
        80,
        0,
        -25,
      ],
    );

  const flowerRotate =
    useTransform(
      scrollYProgress,
      [
        0,
        0.5,
        1,
      ],
      [
        -3,
        0,
        2,
      ],
    );

  const backgroundScale =
    useTransform(
      scrollYProgress,
      [
        0,
        1,
      ],
      [
        1,
        1.08,
      ],
    );

  const backgroundOpacity =
    useTransform(
      scrollYProgress,
      [
        0,
        0.45,
        1,
      ],
      [
        0.28,
        0.42,
        0.55,
      ],
    );

  const introOpacity =
    useTransform(
      scrollYProgress,
      [
        0,
        0.1,
        0.28,
        0.38,
      ],
      [
        0,
        1,
        1,
        0,
      ],
    );

  const introY =
    useTransform(
      scrollYProgress,
      [
        0,
        0.12,
        0.38,
      ],
      [
        60,
        0,
        -60,
      ],
    );

  const detailOpacity =
    useTransform(
      scrollYProgress,
      [
        0.34,
        0.46,
        0.64,
        0.73,
      ],
      [
        0,
        1,
        1,
        0,
      ],
    );

  const detailX =
    useTransform(
      scrollYProgress,
      [
        0.34,
        0.48,
        0.73,
      ],
      [
        60,
        0,
        -30,
      ],
    );

  const packagingOpacity =
    useTransform(
      scrollYProgress,
      [
        0.55,
        0.67,
        0.76,
      ],
      [
        0,
        1,
        0,
      ],
    );

  const packagingX =
    useTransform(
      scrollYProgress,
      [
        0.55,
        0.67,
        0.76,
      ],
      [
        -70,
        0,
        40,
      ],
    );

  const finalOpacity =
    useTransform(
      scrollYProgress,
      [
        0.74,
        0.86,
        1,
      ],
      [
        0,
        1,
        1,
      ],
    );

  const finalY =
    useTransform(
      scrollYProgress,
      [
        0.74,
        0.88,
      ],
      [
        60,
        0,
      ],
    );

  const progressWidth =
    useTransform(
      scrollYProgress,
      [
        0,
        1,
      ],
      [
        '0%',
        '100%',
      ],
    );

  if (!product) {
    return null;
  }

  const title =
    splitTitle(
      product.name,
    );

  const size =
    getDefaultSize(
      product,
    );

  const wrap =
    getDefaultWrap(
      product,
    );

  const price =
    getMinimumPrice(
      product,
    );

  const flowerName =
    product.flowerName ??
    product.categories?.[0]
      ?.name ??
    'Çiçek';

  return (
    <section
      ref={sectionRef}
      className="productShowcase"
    >
      <div className="productSticky">
        <motion.div
          className="showcaseBackground"
          style={{
            scale:
              backgroundScale,
            opacity:
              backgroundOpacity,
          }}
        />

        <div className="showcaseShade" />

        <div className="showcaseTop">
          <span>
            Bİ BUKET NEŞE /
            ÖZEL SEÇKİ
          </span>

          <span>
            KEŞFETMEK İÇİN
            KAYDIR
          </span>
        </div>

        <motion.div
          className="showcaseFlower"
          style={{
            scale:
              flowerScale,
            y: flowerY,
            rotate:
              flowerRotate,
          }}
        >
          <div className="showcaseFlowerGlow" />

          {product.heroImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={
                product.heroImage
              }
              alt={
                product.name
              }
            />
          )}
        </motion.div>

        <motion.div
          className="showcaseIntro"
          style={{
            opacity:
              introOpacity,
            y: introY,
          }}
        >
          <span className="showcaseStep">
            01
          </span>

          <p>
            Bİ BUKET NEŞE
            SEÇKİSİ
          </p>

          <h2>
            {title.first}

            {title.second && (
              <>
                <br />

                <em>
                  {
                    title.second
                  }.
                </em>
              </>
            )}
          </h2>

          <div className="showcaseLine" />

          <p className="showcaseSmallText">
            {product.subtitle ??
              product.description ??
              'Özenle hazırlanmış özel bir buket.'}
          </p>
        </motion.div>

        <motion.div
          className="showcaseDetail"
          style={{
            opacity:
              detailOpacity,
            x: detailX,
          }}
        >
          <span className="showcaseStep">
            02
          </span>

          <p>
            İÇİNDE
          </p>

          <h3>
            {size?.count ?? '—'}

            <span>
              {' '}
              {flowerName.toLocaleLowerCase(
                'tr-TR',
              )}
            </span>
          </h3>

          <p className="detailDescription">
            Özenle seçilen
            çiçekler.
            <br />
            Sana özel
            hazırlanır.
          </p>
        </motion.div>

        <motion.div
          className="showcasePackaging"
          style={{
            opacity:
              packagingOpacity,
            x: packagingX,
          }}
        >
          <span className="showcaseStep">
            03
          </span>

          <p>
            SON DOKUNUŞ
          </p>

          <h3>
            {wrap?.name ??
              'Sana özel.'}

            <br />

            <em>
              Her detay senin
              seçimin.
            </em>
          </h3>

          <p>
            Premium ambalaj.
            <br />
            Özenle, el
            işçiliğiyle
            hazırlanır.
          </p>
        </motion.div>

        <motion.div
          className="showcaseFinal"
          style={{
            opacity:
              finalOpacity,
            y: finalY,
          }}
        >
          <p className="finalEyebrow">
            {product.name.toLocaleUpperCase(
              'tr-TR',
            )}

            {size && (
              <>
                {' / '}
                {size.count}{' '}
                {flowerName.toLocaleUpperCase(
                  'tr-TR',
                )}
              </>
            )}
          </p>

          <h2>
            Bir buket değil.
            <br />

            <em>
              Bir an gönder.
            </em>
          </h2>

          <div className="finalPurchase">
            <div>
              <small>
                BAŞLANGIÇ FİYATI
              </small>

              <strong>
                {price !== null
                  ? formatPrice(
                      price,
                    )
                  : 'Fiyat için keşfet'}
              </strong>
            </div>

            <button
              type="button"
              onClick={() => {
                window.location.href =
                  `/urunler/${product.slug}`;
              }}
            >
              Hediye Et

              <span>
                ↗
              </span>
            </button>
          </div>
        </motion.div>

        <div className="showcaseProgress">
          <motion.div
            className="showcaseProgressInner"
            style={{
              width:
                progressWidth,
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

function CollectionSection({
  collections,
}: {
  collections: Collection[];
}) {
  const visibleCollections =
    collections
      .filter(
        (collection) =>
          collection.isActive,
      )
      .slice(
        0,
        3,
      );

  return (
    <section
      className="collectionSection"
      id="collections"
    >
      <div className="collectionHeader">
        <div>
          <p className="sectionEyebrow">
            Bİ BUKET NEŞE
            KOLEKSİYONLARI
          </p>

          <h2>
            Bir çiçek seçme.
            <br />

            <span>
              Bir his seç.
            </span>
          </h2>
        </div>

        <p className="collectionIntro">
          Her koleksiyon farklı
          bir duygu için
          hazırlandı. Bazen
          yoğun, bazen sakin,
          bazen de sadece
          içinden geldiği için.
        </p>
      </div>

      {visibleCollections.length >
      0 ? (
        <div className="collectionGrid">
          {visibleCollections.map(
            (
              collection,
              index,
            ) => {
              const product =
                getCollectionProduct(
                  collection,
                );

              const title =
                splitTitle(
                  collection.name,
                );

              const image =
                collection.image ??
                product?.heroImage ??
                null;

              const href =
                product
                  ? `/urunler/${product.slug}`
                  : '#';

              return (
                <motion.a
                  key={
                    collection.id
                  }
                  href={href}
                  className={[
                    'collectionCard',
                    index === 0
                      ? 'collectionCardLarge'
                      : '',
                  ]
                    .filter(
                      Boolean,
                    )
                    .join(' ')}
                  initial={{
                    opacity: 0,
                    y: 60,
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
                    duration: 0.8,
                    delay:
                      index *
                      0.1,
                  }}
                >
                  <div
                    className="collectionCardImage"
                    style={
                      image
                        ? {
                            backgroundImage:
                              `url("${image}")`,
                            backgroundSize:
                              'cover',
                            backgroundPosition:
                              'center',
                          }
                        : undefined
                    }
                  />

                  <div className="collectionCardOverlay" />

                  <div className="collectionCardTop">
                    <span>
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </span>

                    <span>
                      {collection.isFeatured
                        ? 'ÖNE ÇIKAN KOLEKSİYON'
                        : 'Bİ BUKET NEŞE'}
                    </span>
                  </div>

                  <div className="collectionCardContent">
                    <p>
                      {collection.subtitle ??
                        'ÖZEL KOLEKSİYON'}
                    </p>

                    <h3>
                      {
                        title.first
                      }

                      {title.second && (
                        <>
                          <br />

                          <em>
                            {
                              title.second
                            }.
                          </em>
                        </>
                      )}
                    </h3>

                    <div className="collectionCardBottom">
                      <span>
                        {collection.description ??
                          product
                            ?.flowerName ??
                          product
                            ?.categories?.[0]
                            ?.name ??
                          'Koleksiyonu keşfet'}
                      </span>

                      <span className="collectionArrow">
                        ↗
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            },
          )}
        </div>
      ) : (
        <div
          style={{
            padding:
              '80px 20px',
            textAlign:
              'center',
            opacity: 0.55,
          }}
        >
          Henüz aktif bir
          koleksiyon
          bulunmuyor.
        </div>
      )}

      <div className="collectionFooter">
        <p>
          Yeni koleksiyonlar
          yakında.
        </p>

        <a href="#create">
          Kendi buketini
          oluştur →
        </a>
      </div>
    </section>
  );
}

function CreateTeaser({
  product,
}: {
  product: Product | null;
}) {
  const href =
    product
      ? `/urunler/${product.slug}`
      : '#collections';

  return (
    <section
      className="createTeaser"
      id="create"
    >
      <div
        className="createTeaserImage"
        style={
          product?.heroImage
            ? {
                backgroundImage:
                  `url("${product.heroImage}")`,
                backgroundSize:
                  'cover',
                backgroundPosition:
                  'center',
              }
            : undefined
        }
      >
        <div className="createTeaserOverlay" />

        <motion.div
          className="createTeaserContent"
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
            duration: 0.85,
          }}
        >
          <p>
            SENİN ÇİÇEĞİN
          </p>

          <h2>
            Hazır bir buket
            seçme.
            <br />

            <span>
              Onu kendin yarat.
            </span>
          </h2>

          <p className="createTeaserDescription">
            Çiçek sayısından
            ambalaja, karttan
            mesajına kadar her
            detayı kendin
            belirle.
          </p>

          <a
            href={href}
            className="createTeaserButton"
          >
            Buketini Oluştur

            <span>
              ↗
            </span>
          </a>
        </motion.div>

        <div className="createTeaserBottom">
          <span>
            Bİ BUKET NEŞE /
            SANA ÖZEL
          </span>

          <span>
            SENİN HİKÂYEN
          </span>
        </div>
      </div>
    </section>
  );
}

function CategoryCircles({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const visible = categories.filter((category) => category.isActive !== false).slice(0, 10);

  return (
    <section className="shopCategories" id="categories">
      <div className="shopSectionHeading shopSectionHeadingCentered">
        <span>NE ARIYORSUN?</span>
        <h2>Çiçeğini kategorisine göre seç.</h2>
        <p>Sevdiğin tarza dokun, sana uygun buketleri hemen keşfet.</p>
      </div>
      <div className="categoryCircleRow">
        {visible.map((category, index) => {
          const product = products.find((item) =>
            item.categories?.some((itemCategory) => itemCategory.id === category.id || itemCategory.slug === category.slug),
          );
          return (
            <motion.a
              key={category.id}
              href={`/urunler?category=${encodeURIComponent(category.slug)}`}
              className="categoryCircleItem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <span className="categoryCircleImage">
                {product?.heroImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.heroImage} alt={category.name} />
                ) : (
                  <span className="categoryCircleFallback">✿</span>
                )}
              </span>
              <strong>{category.name}</strong>
              <small>Keşfet</small>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trustStrip">
      <div><b>✦</b><span><strong>Özenle Hazırlanır</strong><small>Her buket siparişe özel</small></span></div>
      <div><b>↗</b><span><strong>Hızlı Teslimat</strong><small>Sevdiklerine zamanında</small></span></div>
      <div><b>♡</b><span><strong>Mutluluk Garantisi</strong><small>Her detayda Bi Buket Neşe</small></span></div>
      <div><b>✓</b><span><strong>Güvenli Alışveriş</strong><small>Kolay ve güvenli deneyim</small></span></div>
    </section>
  );
}

function ProductGrid({
  products,
  title = 'En Sevilen Buketler',
  eyebrow = 'Bİ BUKET NEŞE FAVORİLERİ',
}: {
  products: Product[];
  title?: string;
  eyebrow?: string;
}) {
  const visible = products.slice(0, 8);
  return (
    <section className="commerceProducts" id="products">
      <div className="shopSectionHeading">
        <div>
          <span>{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <a href="/urunler">Tümünü Gör <b>→</b></a>
      </div>
      <div className="commerceProductGrid">
        {visible.map((product, index) => {
          const price = getMinimumPrice(product);
          return (
            <motion.a
              href={`/urunler/${product.slug}`}
              key={product.id}
              className="commerceProductCard"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
            >
              <div className="commerceProductImage">
                {product.heroImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.heroImage} alt={product.name} />
                )}
                {product.isFeatured && <span className="productBadge">ÖNE ÇIKAN</span>}
                <span className="productHeart">♡</span>
              </div>
              <div className="commerceProductInfo">
                <small>{product.categories?.[0]?.name ?? product.flowerName ?? 'Buket'}</small>
                <h3>{product.name}</h3>
                {product.subtitle && <p>{product.subtitle}</p>}
                <div className="commerceProductBottom">
                  <strong>{price !== null ? formatPrice(price) : 'Fiyatı keşfet'}</strong>
                  <span>İncele →</span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

function CollectionBanners({ collections }: { collections: Collection[] }) {
  const visible = collections.filter((item) => item.isActive).slice(0, 2);
  if (!visible.length) return null;
  return (
    <section className="commerceBanners">
      {visible.map((collection, index) => {
        const product = getCollectionProduct(collection);
        const image = collection.image ?? product?.heroImage;
        return (
          <a key={collection.id} href={product ? `/urunler/${product.slug}` : '#products'} className="commerceBanner">
            {image && <div className="commerceBannerImage" style={{ backgroundImage: `url("${image}")` }} />}
            <div className="commerceBannerShade" />
            <div className="commerceBannerContent">
              <span>{index === 0 ? 'ÖZEL KOLEKSİYON' : 'SANA ÖZEL SEÇKİ'}</span>
              <h3>{collection.name}</h3>
              <p>{collection.subtitle ?? collection.description ?? 'Yeni favorini keşfet.'}</p>
              <b>Keşfet →</b>
            </div>
          </a>
        );
      })}
    </section>
  );
}

export default function Home() {
  const [
    products,
    setProducts,
  ] = useState<Product[]>(
    [],
  );

  const [
    collections,
    setCollections,
  ] = useState<
    Collection[]
  >([]);

  const [
    categories,
    setCategories,
  ] = useState<Category[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    apiError,
    setApiError,
  ] = useState('');

  useEffect(() => {
    async function loadHome() {
      try {
        setLoading(true);
        setApiError('');

        const [
          productResponse,
          collectionResponse,
          categoryResponse,
        ] =
          await Promise.all([
            fetch(
              `${API_URL}/products`,
              {
                cache:
                  'no-store',
              },
            ),

            fetch(
              `${API_URL}/collections`,
              {
                cache:
                  'no-store',
              },
            ),

            fetch(
              `${API_URL}/categories`,
              {
                cache:
                  'no-store',
              },
            ),
          ]);

        if (
          !productResponse.ok
        ) {
          throw new Error(
            'Ürünler alınamadı.',
          );
        }

        if (
          !collectionResponse.ok
        ) {
          throw new Error(
            'Koleksiyonlar alınamadı.',
          );
        }

        if (
          !categoryResponse.ok
        ) {
          throw new Error(
            'Kategoriler alınamadı.',
          );
        }

        const productData =
          (await productResponse.json()) as Product[];

        const collectionData =
          (await collectionResponse.json()) as Collection[];

        const categoryData =
          (await categoryResponse.json()) as Category[];

        setProducts(
          productData.filter(
            (product) =>
              product.isActive,
          ),
        );

        setCollections(
          collectionData
            .filter(
              (collection) =>
                collection.isActive,
            )
            .sort(
              (a, b) =>
                a.sortOrder -
                b.sortOrder,
            ),
        );

        setCategories(
          categoryData
            .filter((category) => category.isActive !== false)
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
        );
      } catch (error) {
        console.error(
          'Ana sayfa verileri alınamadı:',
          error,
        );

        setApiError(
          error instanceof Error
            ? error.message
            : 'Ana sayfa verileri alınamadı.',
        );
      } finally {
        setLoading(false);
      }
    }

    void loadHome();
  }, []);

  const featuredProduct =
    useMemo(() => {
      return (
        products.find(
          (product) =>
            product.isFeatured,
        ) ??
        products[0] ??
        null
      );
    }, [products]);

  const moodCollections =
    useMemo(
      () =>
        collections.slice(
          0,
          4,
        ),
      [collections],
    );

  return (
    <main className="site">
      {/* HERO */}
      <section className="hero">
        <div className="heroImage" />

        <div className="heroOverlay" />

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
          />

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
            Bir buket
            göndermiyorsun.
            <br />

            <span>
              Bir neşe
              gönderiyorsun.
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
            Bazı duygular
            kelimelerden daha
            fazlasını hak eder.
            <br />
            Biz onları
            çiçeklere,
            renklere ve
            unutulmaz anlara
            dönüştürüyoruz.
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

              <span>
                ↗
              </span>
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
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 1.2,
          }}
        >
          <div className="scrollIndicator">
            <span />
            Keşfetmek için
            kaydır
          </div>

          {featuredProduct && (
            <div className="heroProduct">
              <span>
                01
              </span>

              <div>
                <small>
                  ÖNE ÇIKAN
                </small>

                <strong>
                  {
                    featuredProduct.name
                  }
                </strong>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* LILYANA ESİNTİLİ E-TİCARET VİTRİNİ */}
      {!loading && (
        <>
          <CategoryCircles categories={categories} products={products} />
          <TrustStrip />
          <ProductGrid products={[...products].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))} />
          <CollectionBanners collections={collections} />
        </>
      )}

      {/* INTRO */}
      <section
        className="introSection"
        id="collection"
      >
        <p className="sectionEyebrow">
          Bİ BUKET NEŞE
          SEÇKİSİ
        </p>

        <h2>
          Her çiçeğin
          <br />

          <span>
            anlatacak bir
            şeyi var.
          </span>
        </h2>

        <p className="introText">
          Aşk, özür, kutlama
          ya da sadece
          içinden geldiği
          için. Bi Buket
          Neşe&apos;de önce
          duygunu seç, sonra
          o duyguyu anlatacak
          çiçeği.
        </p>
      </section>

      {/* API DURUMU */}
      {apiError && (
        <div
          style={{
            maxWidth:
              '1200px',
            margin:
              '0 auto 40px',
            padding:
              '16px 20px',
            textAlign:
              'center',
            opacity: 0.65,
            fontSize:
              '13px',
          }}
        >
          {apiError}
        </div>
      )}

      {/* COLLECTIONS */}
      {!loading && (
        <CollectionSection
          collections={
            collections
          }
        />
      )}

      {/* MOODS */}
      <section
        className="moodSection"
        id="moods"
      >
        <div className="moodSticky">
          <div className="moodLeft">
            <p className="sectionEyebrow">
              BUGÜN NE SÖYLEMEK
              İSTİYORSUN?
            </p>

            <h2>
              Duygunu seç.
              <br />

              <span>
                Gerisini
                çiçekler
                anlatsın.
              </span>
            </h2>

            <p className="moodDescription">
              Klasik
              kategoriler
              yerine,
              hissettiğin
              şeyden başla.
              Bi Buket Neşe
              senin için
              doğru buketi
              bulsun.
            </p>
          </div>

          <div className="moodVisual">
            <div
              className="moodFlower"
              style={
                featuredProduct
                  ?.heroImage
                  ? {
                      backgroundImage:
                        `url("${featuredProduct.heroImage}")`,
                      backgroundSize:
                        'cover',
                      backgroundPosition:
                        'center',
                    }
                  : undefined
              }
            />

            <div className="moodVisualText">
              <small>
                Bİ BUKET NEŞE
              </small>

              <strong>
                Bir his. Bir
                buket. Bir an.
              </strong>
            </div>
          </div>
        </div>

        <div className="moodCards">
          {moodCollections.map(
            (
              collection,
              index,
            ) => {
              const product =
                getCollectionProduct(
                  collection,
                );

              return (
                <motion.article
                  key={
                    collection.id
                  }
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
                    delay:
                      index *
                      0.08,
                  }}
                >
                  <span className="moodNumber">
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      '0',
                    )}
                  </span>

                  <div>
                    <h3>
                      {
                        collection.name
                      }
                    </h3>

                    <p>
                      {collection.subtitle ??
                        collection.description ??
                        'Bu duyguya özel seçilen buketleri keşfet.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={
                      !product
                    }
                    onClick={() => {
                      if (
                        product
                      ) {
                        window.location.href =
                          `/urunler/${product.slug}`;
                      }
                    }}
                  >
                    Keşfet ↗
                  </button>
                </motion.article>
              );
            },
          )}

          {!loading &&
            moodCollections.length ===
              0 && (
              <div
                style={{
                  padding:
                    '50px 0',
                  opacity:
                    0.55,
                }}
              >
                Henüz
                koleksiyon
                eklenmedi.
              </div>
            )}
        </div>
      </section>

      {/* APPLE TARZI SCROLL ÜRÜN ALANI */}
      {!loading && (
        <ProductShowcase
          product={
            featuredProduct
          }
        />
      )}

      {/* KENDİ BUKETİNİ OLUŞTUR */}
      {!loading && (
        <CreateTeaser
          product={
            featuredProduct
          }
        />
      )}

      {/* STORY */}
      <section className="storySection">
        <div className="storyImage" />

        <div className="storyOverlay" />

        <div className="storyContent">
          <p>
            Bİ BUKET NEŞE /
            HİKÂYEMİZ
          </p>

          <h2>
            Bazı anlar
            <br />

            <span>
              unutulmak için
              fazla güzel.
            </span>
          </h2>

          <p className="storyText">
            Her buket yalnızca
            çiçeklerden
            oluşmaz. Bazen bir
            özür, bazen bir
            başlangıç, bazen
            doğum günü neşesi,
            bazen de uzun
            zamandır
            söylenemeyen tek
            bir cümledir.
          </p>

          <a href="#create">
            Kendi buketini
            yarat →
          </a>
        </div>
      </section>
    </main>
  );
}
