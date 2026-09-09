"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  cartId: string;

  productId: string;
  name: string;
  image: string;

  flowerName: string;

  size: number;

  wrap: string;

  card: string;

  message: string;

  unitPrice: number;

  quantity: number;
};

type AddCartItem = Omit<
  CartItem,
  "cartId" | "quantity"
>;

type CartContextType = {
  items: CartItem[];

  isCartOpen: boolean;

  itemCount: number;

  subtotal: number;

  addItem: (
    item: AddCartItem
  ) => void;

  removeItem: (
    cartId: string
  ) => void;

  increaseQuantity: (
    cartId: string
  ) => void;

  decreaseQuantity: (
    cartId: string
  ) => void;

  clearCart: () => void;

  openCart: () => void;

  closeCart: () => void;
};

const CartContext =
  createContext<
    CartContextType | undefined
  >(undefined);

const STORAGE_KEY =
  "florea_cart";

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    items,
    setItems,
  ] = useState<CartItem[]>([]);

  const [
    isCartOpen,
    setIsCartOpen,
  ] = useState(false);

  const [
    storageReady,
    setStorageReady,
  ] = useState(false);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (saved) {
        const parsed =
          JSON.parse(saved);

        if (
          Array.isArray(parsed)
        ) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error(
        "Sepet okunamadı:",
        error
      );
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error(
        "Sepet kaydedilemedi:",
        error
      );
    }
  }, [
    items,
    storageReady,
  ]);

  function createCartId(
    item: AddCartItem
  ) {
    return [
      item.productId,
      item.size,
      item.wrap,
      item.card,
      item.message.trim(),
    ].join("-");
  }

  function addItem(
    item: AddCartItem
  ) {
    const cartId =
      createCartId(item);

    setItems(
      (currentItems) => {
        const existing =
          currentItems.find(
            (cartItem) =>
              cartItem.cartId ===
              cartId
          );

        if (existing) {
          return currentItems.map(
            (cartItem) =>
              cartItem.cartId ===
              cartId
                ? {
                    ...cartItem,

                    quantity:
                      cartItem.quantity +
                      1,
                  }
                : cartItem
          );
        }

        return [
          ...currentItems,

          {
            ...item,

            cartId,

            quantity: 1,
          },
        ];
      }
    );
  }

  function removeItem(
    cartId: string
  ) {
    setItems((current) =>
      current.filter(
        (item) =>
          item.cartId !==
          cartId
      )
    );
  }

  function increaseQuantity(
    cartId: string
  ) {
    setItems((current) =>
      current.map(
        (item) =>
          item.cartId ===
          cartId
            ? {
                ...item,

                quantity:
                  item.quantity +
                  1,
              }
            : item
      )
    );
  }

  function decreaseQuantity(
    cartId: string
  ) {
    setItems((current) =>
      current
        .map((item) =>
          item.cartId ===
          cartId
            ? {
                ...item,

                quantity:
                  item.quantity -
                  1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  }

  function clearCart() {
    setItems([]);
  }

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  const itemCount =
    useMemo(
      () =>
        items.reduce(
          (
            total,
            item
          ) =>
            total +
            item.quantity,
          0
        ),
      [items]
    );

  const subtotal =
    useMemo(
      () =>
        items.reduce(
          (
            total,
            item
          ) =>
            total +
            item.unitPrice *
              item.quantity,
          0
        ),
      [items]
    );

  return (
    <CartContext.Provider
      value={{
        items,

        isCartOpen,

        itemCount,

        subtotal,

        addItem,

        removeItem,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        openCart,

        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart CartProvider içinde kullanılmalıdır."
    );
  }

  return context;
}