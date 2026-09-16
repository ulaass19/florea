"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
} from "react";

import {
  useCart,
} from "@/context/CartContext";

/*
  WhatsApp sipariş hattı.

  Buraya işletmenin numarasını:
  ülke koduyla,
  + işareti ve boşluk olmadan yazacağız.

  Örnek:
  905551234567
*/
const WHATSAPP_NUMBER =
  "905551234567";

/*
  Ürün adından URL slug oluşturuyoruz.

  Örnek:
  Gece Yarısı -> gece-yarisi
  Sessiz Özür -> sessiz-ozur
  İlk Gün -> ilk-gun
*/
function createSlug(
  text: string
) {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CartDrawer() {
  const {
    items,

    isCartOpen,

    subtotal,

    closeCart,

    removeItem,

    increaseQuantity,

    decreaseQuantity,

    clearCart,
  } = useCart();

  /*
    Drawer açıkken
    body scroll'u kapatıyoruz.
  */
  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    const oldOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        oldOverflow;
    };
  }, [isCartOpen]);

  /*
    WhatsApp sipariş mesajı oluşturur.
  */
  const handleWhatsAppOrder =
    () => {
      if (
        items.length === 0
      ) {
        return;
      }

      /*
        Localhost'ta:
        http://localhost:3000

        Canlıya çıktığında:
        https://bibuketnese.com

        otomatik olarak kullanılacak.
      */
      const siteUrl =
        window.location.origin;

      const productLines =
        items
          .map(
            (
              item,
              index
            ) => {
              const slug =
                createSlug(
                  item.name
                );

              const productUrl =
  `${siteUrl}/urunler/${slug}`;

              const itemTotal =
                item.unitPrice *
                item.quantity;

              let productText =
                `${index + 1}. *${item.name}*\n`;

              productText +=
                `• Çiçek: ${item.size} ${item.flowerName}\n`;

              productText +=
                `• Ambalaj: ${item.wrap}\n`;

              productText +=
                `• Kart: ${item.card}\n`;

              productText +=
                `• Adet: ${item.quantity}\n`;

              if (
                item.message
              ) {
                productText +=
                  `• Kart Mesajı: "${item.message}"\n`;
              }

              productText +=
                `• Fiyat: ₺${itemTotal.toLocaleString(
                  "tr-TR"
                )}\n`;

              productText +=
                `• Ürün Linki: ${productUrl}`;

              return productText;
            }
          )
          .join(
            "\n\n"
          );

      const message =
        `Merhaba Bi Buket Neşe 🌸\n\n` +
        `Aşağıdaki ürünleri sipariş vermek istiyorum:\n\n` +
        `${productLines}\n\n` +
        `━━━━━━━━━━━━━━\n` +
        `*Toplam: ₺${subtotal.toLocaleString(
          "tr-TR"
        )}*\n` +
        `━━━━━━━━━━━━━━\n\n` +
        `Bu ürünleri sipariş vermek istiyorum. ` +
        `Teslimat ve IBAN ödeme bilgileri konusunda yardımcı olabilir misiniz? 🌷`;

      const encodedMessage =
        encodeURIComponent(
          message
        );

      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );
    };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="cartOverlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            onClick={
              closeCart
            }
          />

          <motion.aside
            className="cartDrawer"
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 32,
            }}
          >
            <div className="cartHeader">
              <div>
                <p>
                  Bİ BUKET NEŞE
                </p>

                <h2>
                  Sepetin
                </h2>
              </div>

              <button
                className="cartClose"
                onClick={
                  closeCart
                }
                aria-label="Sepeti kapat"
              >
                ×
              </button>
            </div>

            {items.length ===
            0 ? (
              <div className="emptyCart">
                <span>
                  00
                </span>

                <h3>
                  Henüz bir şey
                  <br />

                  <em>
                    seçmedin.
                  </em>
                </h3>

                <p>
                  Bir çiçek seç.
                  <br />
                  Neşeni biz
                  hazırlayalım.
                </p>

                <button
                  onClick={() => {
                    closeCart();

                    window.location.href =
                      "/#collections";
                  }}
                >
                  Koleksiyonları
                  Keşfet

                  <span>
                    ↗
                  </span>
                </button>
              </div>
            ) : (
              <>
                <div className="cartItems">
                  {items.map(
                    (
                      item,
                      index
                    ) => (
                      <article
                        key={
                          item.cartId
                        }
                        className="cartItem"
                      >
                        <div className="cartItemNumber">
                          {String(
                            index +
                              1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </div>

                        <div className="cartItemImage">
                          <img
                            src={
                              item.image
                            }
                            alt={
                              item.name
                            }
                          />
                        </div>

                        <div className="cartItemContent">
                          <div className="cartItemTop">
                            <div>
                              <small>
                                Bİ BUKET
                                NEŞE
                              </small>

                              <h3>
                                {
                                  item.name
                                }
                              </h3>
                            </div>

                            <button
                              className="cartRemove"
                              onClick={() =>
                                removeItem(
                                  item.cartId
                                )
                              }
                            >
                              Sil
                            </button>
                          </div>

                          <div className="cartItemDetails">
                            <span>
                              {
                                item.size
                              }{" "}
                              {
                                item.flowerName
                              }
                            </span>

                            <span>
                              {
                                item.wrap
                              }{" "}
                              Ambalaj
                            </span>

                            <span>
                              {
                                item.card
                              }{" "}
                              Kart
                            </span>
                          </div>

                          {item.message && (
                            <p className="cartItemMessage">
                              &ldquo;
                              {
                                item.message
                              }
                              &rdquo;
                            </p>
                          )}

                          <div className="cartItemBottom">
                            <div className="quantityControl">
                              <button
                                onClick={() =>
                                  decreaseQuantity(
                                    item.cartId
                                  )
                                }
                                aria-label="Adedi azalt"
                              >
                                −
                              </button>

                              <span>
                                {
                                  item.quantity
                                }
                              </span>

                              <button
                                onClick={() =>
                                  increaseQuantity(
                                    item.cartId
                                  )
                                }
                                aria-label="Adedi artır"
                              >
                                +
                              </button>
                            </div>

                            <strong>
                              ₺
                              {(
                                item.unitPrice *
                                item.quantity
                              ).toLocaleString(
                                "tr-TR"
                              )}
                            </strong>
                          </div>
                        </div>
                      </article>
                    )
                  )}
                </div>

                <div className="cartFooter">
                  <div className="cartFooterTop">
                    <button
                      className="clearCartButton"
                      onClick={
                        clearCart
                      }
                    >
                      Sepeti
                      Temizle
                    </button>

                    <span>
                      Fiyatlar
                      günceldir
                    </span>
                  </div>

                  <div className="cartTotal">
                    <div>
                      <small>
                        TOPLAM
                      </small>

                      <p>
                        Teslimat ve
                        ödeme bilgileri
                        WhatsApp
                        üzerinden
                        tamamlanır.
                      </p>
                    </div>

                    <strong>
                      ₺
                      {subtotal.toLocaleString(
                        "tr-TR"
                      )}
                    </strong>
                  </div>

                  <button
                    className="checkoutButton whatsappOrderButton"
                    onClick={
                      handleWhatsAppOrder
                    }
                  >
                    <span>
                      WhatsApp&apos;tan
                      Sipariş Ver
                    </span>

                    <span>
                      ↗
                    </span>
                  </button>

                  <div className="cartSecurity">
                    SİPARİŞ
                    DETAYLARIN
                    WHATSAPP&apos;A
                    OTOMATİK
                    AKTARILIR
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}