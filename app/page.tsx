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

function CategoryCircles({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="homeCategories" id="categories">
      <div className="homeCategoriesHeading">
        <p className="sectionEyebrow">KATEGORİLER</p>

        <h2>
          Ne göndermek
          <br />
          <span>istiyorsun?</span>
        </h2>

        <p>
          Aradığın çiçeğe daha hızlı ulaş. Kategorini seç,
          sana özel buketleri keşfet.
        </p>
      </div>

      <div className="homeCategoryScroller">
        {categories.map((category, index) => {
          const categoryProduct = products.find((product) =>
            product.categories?.some(
              (item) => item.id === category.id || item.slug === category.slug,
            ),
          );

          const image = categoryProduct?.heroImage ?? null;

          return (
            <motion.a
              key={category.id}
              href={`/urunler?kategori=${encodeURIComponent(category.slug)}`}
              className="homeCategoryItem"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <div className="homeCategoryCircle">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt={category.name} />
                ) : (
                  <div className="homeCategoryFallback">
                    <span>{category.name.charAt(0).toLocaleUpperCase('tr-TR')}</span>
                  </div>
                )}

                <div className="homeCategoryCircleShade" />
              </div>

              <strong>{category.name}</strong>
              <span className="homeCategoryExplore">Keşfet →</span>
            </motion.a>
          );
        })}
      </div>

      <style jsx>{`
        .homeCategories {
          padding: 110px 5vw 105px;
          background: #fffaf7;
          overflow: hidden;
        }

        .homeCategoriesHeading {
          width: min(1320px, 100%);
          margin: 0 auto 54px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: end;
          gap: 40px;
        }

        .homeCategoriesHeading .sectionEyebrow {
          grid-column: 1 / -1;
          margin: 0 0 -18px;
          font-size: 11px;
          letter-spacing: 0.2em;
          font-weight: 700;
        }

        .homeCategoriesHeading h2 {
          margin: 0;
          font-size: clamp(42px, 5.4vw, 78px);
          line-height: 0.94;
          letter-spacing: -0.055em;
          font-weight: 500;
        }

        .homeCategoriesHeading h2 span {
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
        }

        .homeCategoriesHeading > p:last-child {
          max-width: 440px;
          margin: 0 0 5px auto;
          font-size: 15px;
          line-height: 1.8;
          opacity: 0.65;
        }

        .homeCategoryScroller {
          width: min(1420px, 100%);
          margin: 0 auto;
          display: flex;
          gap: clamp(20px, 2.3vw, 38px);
          overflow-x: auto;
          padding: 6px 2px 20px;
          scrollbar-width: none;
          scroll-snap-type: x proximity;
        }

        .homeCategoryScroller::-webkit-scrollbar {
          display: none;
        }

        :global(.homeCategoryItem) {
          flex: 0 0 clamp(142px, 14vw, 205px);
          color: inherit;
          text-decoration: none;
          text-align: center;
          scroll-snap-align: start;
        }

        .homeCategoryCircle {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 999px;
          background: #eadfd8;
          box-shadow: 0 18px 45px rgba(46, 31, 24, 0.09);
          transition: transform 0.45s ease, box-shadow 0.45s ease;
        }

        :global(.homeCategoryItem:hover) .homeCategoryCircle {
          transform: translateY(-7px) scale(1.015);
          box-shadow: 0 26px 58px rgba(46, 31, 24, 0.15);
        }

        .homeCategoryCircle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s ease;
        }

        :global(.homeCategoryItem:hover) .homeCategoryCircle img {
          transform: scale(1.07);
        }

        .homeCategoryCircleShade {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: inset 0 0 0 1px rgba(50, 34, 28, 0.08);
          pointer-events: none;
        }

        .homeCategoryFallback {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          background: linear-gradient(145deg, #efe2dc, #d7b9ad);
        }

        .homeCategoryFallback span {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 56px;
          font-style: italic;
          opacity: 0.55;
        }

        :global(.homeCategoryItem > strong) {
          display: block;
          margin-top: 20px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        :global(.homeCategoryExplore) {
          display: block;
          margin-top: 7px;
          font-size: 10px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          opacity: 0.48;
          transition: opacity 0.25s ease;
        }

        :global(.homeCategoryItem:hover .homeCategoryExplore) {
          opacity: 0.9;
        }

        @media (max-width: 760px) {
          .homeCategories {
            padding: 76px 20px 68px;
          }

          .homeCategoriesHeading {
            display: block;
            margin-bottom: 38px;
          }

          .homeCategoriesHeading .sectionEyebrow {
            margin-bottom: 18px;
          }

          .homeCategoriesHeading > p:last-child {
            margin: 24px 0 0;
            max-width: 520px;
          }

          .homeCategoryScroller {
            width: calc(100% + 20px);
            gap: 18px;
            padding-right: 20px;
          }

          :global(.homeCategoryItem) {
            flex-basis: 128px;
          }

          :global(.homeCategoryItem > strong) {
            margin-top: 14px;
            font-size: 14px;
          }
        }
      `}</style>
    </section>
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

        setCategories(categoryData);
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

      {/* LILYANA TARZI YUVARLAK KATEGORİLER */}
      {!loading && (
        <CategoryCircles
          categories={categories}
          products={products}
        />
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
