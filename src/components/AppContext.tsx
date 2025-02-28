"use client";

import {
  AppProviderProps,
  CartContextType,
  CartProductType,
  MenuItemOptionType,
  MenuItemType,
} from "@/types";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// export CartContext for using in ordering
export const CartContext = createContext<CartContextType | null>(null);

// calculate the price for product
export function cartProductPrice(cartProduct: CartProductType) {
  let price = cartProduct.basePrice || 0;
  if (cartProduct.size?.extraPrice) {
    price += cartProduct.size.extraPrice;
  }
  if (Array.isArray(cartProduct.extra) && cartProduct.extra?.length > 0) {
    for (const extra of cartProduct.extra) {
      price += extra.extraPrice;
    }
  }
  return price;
}

export function AppProvider({ children }: AppProviderProps) {
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart") || ""));
    }
  }, [ls]);

  function saveCartProductsToLocalStorage(cartProduct: CartProductType[]) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProduct));
    }
  }

  function addToCart(
    product: MenuItemType,
    size: MenuItemOptionType | null = null,
    extra: MenuItemOptionType[] = []
  ) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extra };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove: number) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success("Product removed");
  }

  return (
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart
      }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
