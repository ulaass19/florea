"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import styles from "./checkout.module.css";

type CheckoutForm = {
  recipientName: string;
  recipientPhone: string;
  city: string;
  district: string;
  address: string;
  deliveryDate: string;
  deliveryTime: string;
  senderName: string;
  orderNote: string;
};

const TIME_SLOTS = [
  "09:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 18:00",
  "18:00 - 21:00",
];

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    itemCount,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [form, setForm] = useState<CheckoutForm>({
    recipientName: "",
    recipientPhone: "",
    city: "İstanbul",
    district: "",
    address: "",
    deliveryDate: "",
    deliveryTime: "",
    senderName: "",
    orderNote: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const deliveryFee = useMemo(() => {
    if (subtotal <= 0) return 0;
    return subtotal >= 3000 ? 0 : 149;
  }, [subtotal]);

  const total = subtotal + deliveryFee;

  function updateField<K extends keyof CheckoutForm>(
    key: K,
    value: CheckoutForm[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) return;

    setSubmitted(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (submitted) {
    return (
      <main className={styles.successPage}>
        <div className={styles.successGlow} />

        <motion.div
          className={styles.successCard}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p>FLOREA / CHECKOUT</p>

          <span className={styles.successNumber}>01</span>

          <h1>
            Siparişin
            <br />
            <em>hazır.</em>
          </h1>

          <p className={styles.successText}>
            Frontend akışı başarıyla tamamlandı. Gerçek ödeme ve sipariş kaydı
            backend bağlantısından sonra aktif olacak.
          </p>

          <div className={styles.successInfo}>
            <div>
              <small>TESLİM EDİLECEK KİŞİ</small>
              <strong>{form.recipientName}</strong>
            </div>

            <div>
              <small>TESLİMAT</small>
              <strong>
                {form.deliveryDate} · {form.deliveryTime}
              </strong>
            </div>

            <div>
              <small>TOPLAM</small>
              <strong>₺{total.toLocaleString("tr-TR")}</strong>
            </div>
          </div>

          <div className={styles.successButtons}>
            <a href="/">Ana Sayfaya Dön</a>

            <button
              type="button"
              onClick={() => {
                clearCart();
                window.location.href = "/";
              }}
            >
              Demo Siparişi Bitir
              <span>↗</span>
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className={styles.checkoutPage}>
      <header className={styles.checkoutNav}>
        <a href="/" className={styles.logo}>
          FLOREA
        </a>

        <div className={styles.navCenter}>
          <span>CHECKOUT</span>
          <span>/</span>
          <span>{String(itemCount).padStart(2, "0")} ÜRÜN</span>
        </div>

        <a href="/" className={styles.backLink}>
          Alışverişe Dön
          <span>↗</span>
        </a>
      </header>

      {items.length === 0 ? (
        <section className={styles.emptyCheckout}>
          <p>FLOREA / 00</p>

          <h1>
            Sepetin
            <br />
            <em>henüz boş.</em>
          </h1>

          <p>
            Önce söylemek istediğin şeyi seç. Checkout burada seni bekliyor.
          </p>

          <a href="/#collections">
            Koleksiyonları Keşfet
            <span>↗</span>
          </a>
        </section>
      ) : (
        <form onSubmit={handleSubmit} className={styles.checkoutShell}>
          <section className={styles.formColumn}>
            <div className={styles.checkoutIntro}>
              <p>FLOREA / TESLİMAT</p>

              <h1>
                Son birkaç
                <br />
                <em>detay.</em>
              </h1>

              <p className={styles.checkoutDescription}>
                Çiçeğin hazır. Şimdi yalnızca kime, ne zaman ve nereye
                gideceğini belirle.
              </p>
            </div>

            <CheckoutSection
              number="01"
              eyebrow="ALICI"
              title="Kime gönderiyoruz?"
            >
              <div className={styles.fieldGrid}>
                <Field
                  label="Ad Soyad"
                  placeholder="Alıcının adı"
                  value={form.recipientName}
                  onChange={(value) =>
                    updateField("recipientName", value)
                  }
                  required
                />

                <Field
                  label="Telefon"
                  placeholder="05xx xxx xx xx"
                  value={form.recipientPhone}
                  onChange={(value) =>
                    updateField("recipientPhone", value)
                  }
                  type="tel"
                  required
                />
              </div>
            </CheckoutSection>

            <CheckoutSection
              number="02"
              eyebrow="TESLİMAT"
              title="Ne zaman ulaşsın?"
            >
              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span>Teslimat Tarihi</span>

                  <input
                    type="date"
                    min={getToday()}
                    value={form.deliveryDate}
                    onChange={(event) =>
                      updateField("deliveryDate", event.target.value)
                    }
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span>Saat Aralığı</span>

                  <select
                    value={form.deliveryTime}
                    onChange={(event) =>
                      updateField("deliveryTime", event.target.value)
                    }
                    required
                  >
                    <option value="">Saat seç</option>

                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </CheckoutSection>

            <CheckoutSection
              number="03"
              eyebrow="ADRES"
              title="Nereye götürelim?"
            >
              <div className={styles.fieldGrid}>
                <Field
                  label="Şehir"
                  placeholder="İstanbul"
                  value={form.city}
                  onChange={(value) => updateField("city", value)}
                  required
                />

                <Field
                  label="İlçe"
                  placeholder="Beşiktaş"
                  value={form.district}
                  onChange={(value) => updateField("district", value)}
                  required
                />
              </div>

              <label className={styles.field}>
                <span>Açık Adres</span>

                <textarea
                  value={form.address}
                  onChange={(event) =>
                    updateField("address", event.target.value)
                  }
                  placeholder="Mahalle, cadde, sokak, bina ve daire bilgisi..."
                  maxLength={240}
                  required
                />

                <small>{form.address.length}/240</small>
              </label>
            </CheckoutSection>

            <CheckoutSection
              number="04"
              eyebrow="SON DOKUNUŞ"
              title="Bizim bilmemiz gereken bir şey var mı?"
            >
              <Field
                label="Gönderen Adı"
                placeholder="İsmin görünmesini istemiyorsan boş bırakabilirsin"
                value={form.senderName}
                onChange={(value) => updateField("senderName", value)}
              />

              <label className={styles.field}>
                <span>Sipariş Notu</span>

                <textarea
                  value={form.orderNote}
                  onChange={(event) =>
                    updateField("orderNote", event.target.value)
                  }
                  placeholder="Kapıyı çalmayın, resepsiyona bırakın..."
                  maxLength={180}
                />

                <small>{form.orderNote.length}/180</small>
              </label>
            </CheckoutSection>

            <CheckoutSection
              number="05"
              eyebrow="ÖDEME"
              title="Ödeme yöntemi."
            >
              <div className={styles.paymentMock}>
                <div>
                  <span className={styles.paymentDot} />

                  <div>
                    <strong>Kredi / Banka Kartı</strong>
                    <p>
                      Güvenli ödeme altyapısı backend entegrasyonunda
                      bağlanacak.
                    </p>
                  </div>
                </div>

                <span>YAKINDA</span>
              </div>
            </CheckoutSection>
          </section>

          <aside className={styles.summaryColumn}>
            <div className={styles.summarySticky}>
              <div className={styles.summaryHeader}>
                <div>
                  <p>SİPARİŞİN</p>
                  <h2>Özet.</h2>
                </div>

                <span>{String(itemCount).padStart(2, "0")}</span>
              </div>

              <div className={styles.summaryItems}>
                {items.map((item) => (
                  <article
                    className={styles.summaryItem}
                    key={item.cartId}
                  >
                    <div className={styles.summaryImage}>
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className={styles.summaryContent}>
                      <div className={styles.summaryItemTop}>
                        <div>
                          <small>FLOREA SIGNATURE</small>
                          <h3>{item.name}</h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.cartId)}
                        >
                          Sil
                        </button>
                      </div>

                      <p>
                        {item.size} {item.flowerName} · {item.wrap} ·{" "}
                        {item.card}
                      </p>

                      {item.message && (
                        <blockquote>
                          “{item.message}”
                        </blockquote>
                      )}

                      <div className={styles.summaryItemBottom}>
                        <div className={styles.summaryQuantity}>
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.cartId)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.cartId)
                            }
                          >
                            +
                          </button>
                        </div>

                        <strong>
                          ₺
                          {(
                            item.unitPrice * item.quantity
                          ).toLocaleString("tr-TR")}
                        </strong>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className={styles.priceBreakdown}>
                <div>
                  <span>Ara Toplam</span>
                  <strong>₺{subtotal.toLocaleString("tr-TR")}</strong>
                </div>

                <div>
                  <span>Teslimat</span>
                  <strong>
                    {deliveryFee === 0
                      ? "Ücretsiz"
                      : `₺${deliveryFee.toLocaleString("tr-TR")}`}
                  </strong>
                </div>
              </div>

              <div className={styles.totalRow}>
                <div>
                  <small>TOPLAM</small>
                  <p>Vergiler dahil</p>
                </div>

                <strong>₺{total.toLocaleString("tr-TR")}</strong>
              </div>

              <button type="submit" className={styles.completeButton}>
                <span>Siparişi Onayla</span>
                <span>↗</span>
              </button>

              <p className={styles.secureNote}>
                GÜVENLİ CHECKOUT · FLOREA
              </p>
            </div>
          </aside>
        </form>
      )}
    </main>
  );
}

function CheckoutSection({
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
    <section className={styles.checkoutSection}>
      <div className={styles.sectionTitle}>
        <span>{number}</span>

        <div>
          <small>{eyebrow}</small>
          <h2>{title}</h2>
        </div>
      </div>

      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </label>
  );
}
