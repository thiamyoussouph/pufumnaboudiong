"use client";

import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { product, qty }
  const [open, setOpen] = useState(false);

  const addToCart = useCallback((product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      const currentQty = existing?.qty || 0;
      if (currentQty + 1 > product.stock) return prev;
      if (existing)
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { product, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const changeQty = useCallback((id, delta) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === id
            ? { ...i, qty: Math.min(i.qty + delta, i.product.stock) }
            : i
        )
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, open, setOpen, addToCart, changeQty, removeItem, clearCart, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans un CartProvider");
  return ctx;
};
