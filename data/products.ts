export type ProductSize = {
  count: number;
  label: string;
  price: number;
};

export type ProductWrap = {
  id: string;
  name: string;
  extraPrice: number;
};

export type ProductCard = {
  id: string;
  name: string;
  extraPrice: number;
};

export type Product = {
  id: string;
  name: string;
  eyebrow: string;
  subtitle: string;
  description: string;

  flowerName: string;

  heroImage: string;

  gallery: string[];

  sizes: ProductSize[];

  wraps: ProductWrap[];

  cards: ProductCard[];
};

export const products: Product[] = [
  {
    id: "gece-yarisi",

    name: "Gece Yarısı",

    eyebrow: "Bİ BUKET NEŞE / ÖZEL SEÇKİ",

    subtitle:
      "Bazı şeyler gece daha kolay söylenir.",

    description:
      "Derin kırmızı tonları, güçlü duruşu ve zamansız karakteriyle Gece Yarısı; kelimelerin yetersiz kaldığı anlar için hazırlandı.",

    flowerName: "Kırmızı Gül",

    heroImage:
      "https://images.unsplash.com/photo-1548094967-e25a127d1f6d?auto=format&fit=crop&w=1800&q=95",

    gallery: [
      "https://images.unsplash.com/photo-1548094967-e25a127d1f6d?auto=format&fit=crop&w=1800&q=95",

      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1800&q=95",

      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1800&q=95",
    ],

    sizes: [
      {
        count: 12,
        label: "Zarif",
        price: 1990,
      },
      {
        count: 24,
        label: "Klasik",
        price: 2990,
      },
      {
        count: 36,
        label: "Yoğun",
        price: 3890,
      },
      {
        count: 50,
        label: "Unutulmaz",
        price: 4990,
      },
    ],

    wraps: [
      {
        id: "black",
        name: "Siyah",
        extraPrice: 0,
      },
      {
        id: "cream",
        name: "Krem",
        extraPrice: 150,
      },
      {
        id: "kraft",
        name: "Kraft",
        extraPrice: 100,
      },
    ],

    cards: [
      {
        id: "minimal",
        name: "Minimal",
        extraPrice: 0,
      },
      {
        id: "romantic",
        name: "Romantik",
        extraPrice: 100,
      },
      {
        id: "special",
        name: "Özel",
        extraPrice: 150,
      },
    ],
  },

  {
    id: "sessiz-ozur",

    name: "Sessiz Özür",

    eyebrow: "Bİ BUKET NEŞE / DUYGU KOLEKSİYONU",

    subtitle:
      "Bazen en güçlü özür, sessizce gelir.",

    description:
      "Yumuşak tonlardaki çiçekleri ve sade sunumuyla Sessiz Özür; yeniden başlamak, gönül almak ve söylenemeyeni anlatmak istediğin anlar için hazırlandı.",

    flowerName: "Beyaz & Pudra",

    heroImage:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1800&q=95",

    gallery: [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1800&q=95",
    ],

    sizes: [
      {
        count: 12,
        label: "Zarif",
        price: 1790,
      },
      {
        count: 24,
        label: "Klasik",
        price: 2690,
      },
      {
        count: 36,
        label: "Yoğun",
        price: 3490,
      },
      {
        count: 50,
        label: "Unutulmaz",
        price: 4490,
      },
    ],

    wraps: [
      {
        id: "cream",
        name: "Krem",
        extraPrice: 0,
      },
      {
        id: "white",
        name: "Beyaz",
        extraPrice: 100,
      },
      {
        id: "kraft",
        name: "Kraft",
        extraPrice: 100,
      },
    ],

    cards: [
      {
        id: "minimal",
        name: "Minimal",
        extraPrice: 0,
      },
      {
        id: "sorry",
        name: "Özür",
        extraPrice: 100,
      },
      {
        id: "special",
        name: "Özel",
        extraPrice: 150,
      },
    ],
  },

  {
    id: "ilk-gun",

    name: "İlk Gün",

    eyebrow: "Bİ BUKET NEŞE / ÖZEL ANLAR",

    subtitle:
      "Yeni başlangıçların enerjisi.",

    description:
      "Canlı renkler ve enerjik bir kompozisyon. Doğum günleri, kutlamalar, yeni başlangıçlar ve güzel haberler için neşeli bir seçim.",

    flowerName: "Mevsim Çiçekleri",

    heroImage:
      "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1800&q=95",

    gallery: [
      "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1800&q=95",
    ],

    sizes: [
      {
        count: 12,
        label: "Mini",
        price: 1690,
      },
      {
        count: 24,
        label: "Klasik",
        price: 2490,
      },
      {
        count: 36,
        label: "Büyük",
        price: 3290,
      },
      {
        count: 50,
        label: "Kutlama",
        price: 4190,
      },
    ],

    wraps: [
      {
        id: "cream",
        name: "Krem",
        extraPrice: 0,
      },
      {
        id: "pink",
        name: "Pudra",
        extraPrice: 100,
      },
      {
        id: "kraft",
        name: "Kraft",
        extraPrice: 50,
      },
    ],

    cards: [
      {
        id: "minimal",
        name: "Minimal",
        extraPrice: 0,
      },
      {
        id: "birthday",
        name: "Kutlama",
        extraPrice: 100,
      },
      {
        id: "special",
        name: "Özel",
        extraPrice: 150,
      },
    ],
  },
];

export function getProductById(id: string) {
  return products.find(
    (product) => product.id === id
  );
}