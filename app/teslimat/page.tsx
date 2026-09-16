"use client";

import {
  motion,
} from "framer-motion";

const WHATSAPP_NUMBER =
  "905538440139";

const deliverySteps = [
  {
    number: "01",
    title: "Ürününü Seç",
    text:
      "Ürünler arasından hazır bir tasarım seçebilir veya Buketini Oluştur alanından kendi buketini hazırlayabilirsin.",
  },
  {
    number: "02",
    title: "WhatsApp’tan İlet",
    text:
      "Sipariş detayların hazır mesaj olarak WhatsApp’a aktarılır. Buradan teslimat bilgilerini birlikte netleştiririz.",
  },
  {
    number: "03",
    title: "Teslimatı Planla",
    text:
      "Adres, teslimat tarihi, uygun saat aralığı ve varsa özel notlar WhatsApp üzerinden belirlenir.",
  },
  {
    number: "04",
    title: "Ödeme ve Hazırlık",
    text:
      "Ödeme bilgileri paylaşıldıktan sonra siparişin hazırlanır ve belirlenen teslimat planına göre yola çıkar.",
  },
];

const faqs = [
  {
    question:
      "Aynı gün teslimat yapılıyor mu?",
    answer:
      "Aynı gün teslimat uygunluk durumuna, seçilen ürüne ve teslimat bölgesine göre değişebilir. En güncel teslimat durumunu WhatsApp üzerinden hızlıca öğrenebilirsin.",
  },
  {
    question:
      "Hangi bölgelere teslimat yapılıyor?",
    answer:
      "Teslimat bölgeleri sipariş adresine göre değerlendirilir. Adresini WhatsApp üzerinden ilettiğinde teslimat uygunluğu kontrol edilir.",
  },
  {
    question:
      "Teslimat ücreti ne kadar?",
    answer:
      "Teslimat ücreti adres ve mesafeye göre değişebilir. Sipariş kesinleşmeden önce teslimat ücreti açık şekilde paylaşılır.",
  },
  {
    question:
      "Belirli bir saatte teslimat isteyebilir miyim?",
    answer:
      "Talep ettiğin saat bilgisini iletebilirsin. Teslimat yoğunluğu ve bölge koşullarına göre mümkün olan en uygun saat aralığı birlikte belirlenir.",
  },
  {
    question:
      "Alıcıya ulaşılamazsa ne olur?",
    answer:
      "Teslimat sırasında alıcıya ulaşılamaması durumunda sipariş veren kişiyle iletişime geçilerek uygun teslimat seçeneği birlikte belirlenir.",
  },
  {
    question:
      "Görseldeki çiçeklerin aynısı mı gelir?",
    answer:
      "Mevsim ve stok durumuna bağlı olarak bazı çiçek veya yardımcı ürünlerde küçük değişiklikler olabilir. Buketin genel tarzı, renk dengesi ve değeri korunarak hazırlanır.",
  },
];

export default function DeliveryPage() {
  const handleWhatsApp =
    () => {
      const message =
        "Merhaba Bi Buket Neşe 🌸 Teslimat bölgesi, teslimat süresi ve ücret hakkında bilgi almak istiyorum.";

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          message
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    };

  return (
    <main className="deliveryPage">
      <section className="deliveryHero">
        <motion.div
          className="deliveryHeroContent"
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
            Bİ BUKET NEŞE / TESLİMAT
          </p>

          <h1>
            Neşen,
            <br />

            <em>
              tam zamanında ulaşsın.
            </em>
          </h1>

          <span>
            Siparişten teslimata
            kadar tüm detayları
            WhatsApp üzerinden
            hızlı ve kolay şekilde
            netleştiriyoruz.
          </span>
        </motion.div>
      </section>

      <section className="deliveryInfoBar">
        <div>
          <span>
            01
          </span>

          <strong>
            Kolay Sipariş
          </strong>

          <p>
            Siparişini birkaç
            adımda oluştur.
          </p>
        </div>

        <div>
          <span>
            02
          </span>

          <strong>
            WhatsApp Desteği
          </strong>

          <p>
            Teslimat detaylarını
            doğrudan konuş.
          </p>
        </div>

        <div>
          <span>
            03
          </span>

          <strong>
            Güvenli Hazırlık
          </strong>

          <p>
            Siparişin özenle
            hazırlanır.
          </p>
        </div>
      </section>

      <section className="deliveryProcess">
        <div className="deliverySectionHeader">
          <div>
            <p>
              NASIL ÇALIŞIYOR?
            </p>

            <h2>
              Siparişten
              <br />

              <em>
                teslimata.
              </em>
            </h2>
          </div>

          <p className="deliverySectionText">
            Online ödeme veya klasik
            checkout yerine sipariş
            detaylarını doğrudan
            WhatsApp üzerinden
            tamamlıyoruz. Böylece
            teslimat bilgilerini
            siparişe özel olarak
            netleştirebiliyoruz.
          </p>
        </div>

        <div className="deliverySteps">
          {deliverySteps.map(
            (
              step,
              index
            ) => (
              <motion.article
                key={
                  step.number
                }
                className="deliveryStepCard"
                initial={{
                  opacity: 0,
                  y: 24,
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
                  duration: 0.5,
                  delay:
                    index *
                    0.07,
                }}
              >
                <span>
                  {
                    step.number
                  }
                </span>

                <h3>
                  {
                    step.title
                  }
                </h3>

                <p>
                  {
                    step.text
                  }
                </p>
              </motion.article>
            )
          )}
        </div>
      </section>

      <section className="deliveryNotice">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
          }}
        >
          <div className="deliveryNoticeIcon">
            ✦
          </div>

          <div>
            <p>
              ÖZEL GÜNLER
            </p>

            <h2>
              Yoğun günlerde
              siparişini
              <em> erken ver.</em>
            </h2>

            <span>
              Sevgililer Günü,
              Anneler Günü ve
              benzeri özel günlerde
              teslimat yoğunluğu
              yaşanabilir. İstediğin
              tarih için mümkün
              olduğunca erken
              iletişime geçmeni
              öneriyoruz.
            </span>
          </div>
        </motion.div>
      </section>

      <section className="deliveryFAQ">
        <div className="deliveryFAQHeader">
          <p>
            MERAK ETTİKLERİN
          </p>

          <h2>
            Teslimat
            <em> hakkında.</em>
          </h2>
        </div>

        <div className="deliveryFAQGrid">
          {faqs.map(
            (
              item,
              index
            ) => (
              <motion.article
                key={
                  item.question
                }
                className="deliveryFAQItem"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.45,
                  delay:
                    index *
                    0.04,
                }}
              >
                <span>
                  {String(
                    index + 1
                  ).padStart(
                    2,
                    "0"
                  )}
                </span>

                <div>
                  <h3>
                    {
                      item.question
                    }
                  </h3>

                  <p>
                    {
                      item.answer
                    }
                  </p>
                </div>
              </motion.article>
            )
          )}
        </div>
      </section>

      <section className="deliveryCTA">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
          }}
        >
          <span>
            ADRESİNİ MERAK MI EDİYORSUN?
          </span>

          <h2>
            Teslimatını
            <em> hemen sor.</em>
          </h2>

          <p>
            Adresini gönder,
            teslimat uygunluğu,
            tahmini süre ve ücret
            bilgisini birlikte
            netleştirelim.
          </p>

          <button
            type="button"
            onClick={
              handleWhatsApp
            }
          >
            WhatsApp&apos;tan
            Teslimat Sor

            <span>
              →
            </span>
          </button>
        </motion.div>
      </section>
    </main>
  );
}