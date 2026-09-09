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
    if (
      !isCartOpen
    ) {
      return;
    }

    const oldOverflow =
      document.body.style
        .overflow;

    document.body.style
      .overflow = "hidden";

    return () => {
      document.body.style
        .overflow =
        oldOverflow;
    };
  }, [isCartOpen]);

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
                  FLOREA
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
                    söylemedin.
                  </em>
                </h3>

                <p>
                  Bir çiçek seç.
                  Gerisini
                  Florea&apos;ya
                  bırak.
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
                                FLOREA
                                SIGNATURE
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
                      Vergiler
                      dahil
                    </span>
                  </div>

                  <div className="cartTotal">
                    <div>
                      <small>
                        ARA TOPLAM
                      </small>

                      <p>
                        Teslimat
                        bilgileri
                        sonraki
                        adımda.
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
                    className="checkoutButton"
                    onClick={() => {
                      closeCart();

                      /*
                        Checkout
                        sayfasını
                        birazdan
                        oluşturacağız.
                      */

                      window.location.href =
                        "/checkout";
                    }}
                  >
                    <span>
                      Ödemeye Geç
                    </span>

                    <span>
                      ↗
                    </span>
                  </button>

                  <div className="cartSecurity">
                    GÜVENLİ ÖDEME
                    · FLOREA
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