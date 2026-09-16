'use client';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  motion,
} from 'framer-motion';

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
  sizes?: ProductSize[];
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
  seoTitle?: string | null;
  seoDescription?: string | null;
  products: CollectionProduct[];
  createdAt: string;
  updatedAt: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:3001';

function getCollectionImage(
  collection: Collection,
) {
  if (collection.image) {
    return collection.image;
  }

  const products =
    [...(
      collection.products ??
      []
    )].sort(
      (a, b) =>
        a.sortOrder -
        b.sortOrder,
    );

  const productWithImage =
    products.find(
      (item) =>
        item.product
          .isActive &&
        item.product
          .heroImage,
    );

  if (
    productWithImage
      ?.product.heroImage
  ) {
    return productWithImage
      .product.heroImage;
  }

  const anyProductWithImage =
    products.find(
      (item) =>
        item.product
          .heroImage,
    );

  return (
    anyProductWithImage
      ?.product.heroImage ??
    null
  );
}

function getActiveProductCount(
  collection: Collection,
) {
  return (
    collection.products?.filter(
      (item) =>
        item.product
          .isActive,
    ).length ?? 0
  );
}

export default function CollectionsPage() {
  const [
    collections,
    setCollections,
  ] = useState<
    Collection[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState('');

  useEffect(() => {
    async function loadCollections() {
      try {
        setLoading(true);
        setError('');

        const response =
          await fetch(
            `${API_URL}/collections`,
            {
              cache:
                'no-store',
            },
          );

        if (
          !response.ok
        ) {
          throw new Error(
            'Koleksiyonlar alınamadı.',
          );
        }

        const data =
          (await response.json()) as Collection[];

        setCollections(
          data,
        );
      } catch (err) {
        console.error(
          'Koleksiyonlar yüklenemedi:',
          err,
        );

        setError(
          err instanceof Error
            ? err.message
            : 'Koleksiyonlar yüklenemedi.',
        );
      } finally {
        setLoading(false);
      }
    }

    void loadCollections();
  }, []);

  const displayedCollections =
    useMemo(() => {
      return collections
        .filter(
          (collection) =>
            collection.isActive,
        )
        .sort(
          (a, b) => {
            if (
              a.sortOrder !==
              b.sortOrder
            ) {
              return (
                a.sortOrder -
                b.sortOrder
              );
            }

            if (
              a.isFeatured !==
              b.isFeatured
            ) {
              return a.isFeatured
                ? -1
                : 1;
            }

            return (
              new Date(
                b.createdAt,
              ).getTime() -
              new Date(
                a.createdAt,
              ).getTime()
            );
          },
        );
    }, [collections]);

  return (
    <main className="collectionsPage">
      <section className="collectionsHeader">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <p>
            Bİ BUKET NEŞE
          </p>

          <h1>
            Koleksiyonlar
          </h1>

          <span>
            Önce duygunu seç.
            Gerisini çiçekler
            anlatsın.
          </span>
        </motion.div>
      </section>

      <section className="collectionsContent">
        <div className="collectionsIntro">
          <div>
            <p>
              DUYGUNA GÖRE SEÇ
            </p>

            <h2>
              Her anın
              <br />

              <em>
                başka bir
                buketi var.
              </em>
            </h2>
          </div>

          <p className="collectionsDescription">
            Aşk, özür, kutlama
            ya da sadece içinden
            geldiği için. Sana
            en yakın duygudan
            başla.
          </p>
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
                    '38px',
                  height:
                    '38px',
                  margin:
                    '0 auto',
                  borderRadius:
                    '999px',
                  border:
                    '2px solid rgba(53, 31, 40, 0.15)',
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
                Koleksiyonlar
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
                padding:
                  '40px 20px',
                textAlign:
                  'center',
              }}
            >
              <div>
                <strong>
                  Koleksiyonlar
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
          displayedCollections.length ===
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
                padding:
                  '40px 20px',
                textAlign:
                  'center',
              }}
            >
              <div>
                <strong>
                  Henüz aktif
                  koleksiyon
                  bulunmuyor.
                </strong>

                <p
                  style={{
                    marginTop:
                      '10px',
                    opacity:
                      0.6,
                  }}
                >
                  Yeni
                  koleksiyonlar
                  çok yakında
                  burada olacak.
                </p>
              </div>
            </div>
          )}

        {!loading &&
          !error &&
          displayedCollections.length >
            0 && (
            <div className="collectionsGrid">
              {displayedCollections.map(
                (
                  collection,
                  index,
                ) => {
                  const image =
                    getCollectionImage(
                      collection,
                    );

                  const productCount =
                    getActiveProductCount(
                      collection,
                    );

                  return (
                    <motion.a
                      key={
                        collection.id
                      }
                      href={`/koleksiyonlar/${collection.slug}`}
                      className="collectionListingCard"
                      initial={{
                        opacity: 0,
                        y: 35,
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
                        duration:
                          0.6,
                        delay:
                          index *
                          0.08,
                      }}
                    >
                      <div className="collectionListingImage">
                        {image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={
                              image
                            }
                            alt={
                              collection.name
                            }
                          />
                        ) : (
                          <div
                            style={{
                              width:
                                '100%',
                              height:
                                '100%',
                              background:
                                '#f2e9e5',
                              display:
                                'flex',
                              alignItems:
                                'center',
                              justifyContent:
                                'center',
                              color:
                                '#8f7b82',
                              fontSize:
                                '13px',
                            }}
                          >
                            Koleksiyon
                            görseli
                          </div>
                        )}

                        <div className="collectionListingOverlay" />

                        <div className="collectionListingNumber">
                          {String(
                            index +
                              1,
                          ).padStart(
                            2,
                            '0',
                          )}
                        </div>

                        {collection.isFeatured && (
                          <div
                            style={{
                              position:
                                'absolute',
                              top:
                                '24px',
                              right:
                                '24px',
                              zIndex:
                                3,
                              padding:
                                '8px 12px',
                              borderRadius:
                                '999px',
                              background:
                                'rgba(255,255,255,0.9)',
                              color:
                                '#351f28',
                              fontSize:
                                '9px',
                              fontWeight:
                                700,
                              letterSpacing:
                                '0.08em',
                            }}
                          >
                            ÖNE ÇIKAN
                          </div>
                        )}

                        <div className="collectionListingContent">
                          <span>
                            Bİ BUKET
                            NEŞE
                          </span>

                          <h2>
                            {
                              collection.name
                            }
                          </h2>

                          <p>
                            {collection.subtitle ??
                              collection.description ??
                              'Bu duyguya özel hazırlanan çiçekleri keşfet.'}
                          </p>

                          <div className="collectionListingButton">
                            <div>
                              Koleksiyonu
                              Keşfet

                              {productCount >
                                0 && (
                                <small
                                  style={{
                                    display:
                                      'block',
                                    marginTop:
                                      '4px',
                                    fontSize:
                                      '9px',
                                    opacity:
                                      0.65,
                                    fontWeight:
                                      400,
                                  }}
                                >
                                  {
                                    productCount
                                  }{' '}
                                  ürün
                                </small>
                              )}
                            </div>

                            <span>
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  );
                },
              )}
            </div>
          )}
      </section>
    </main>
  );
}