"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { setCart } from "./slices/cartSlice";
import { setToken } from "./slices/authSlice";

type StoreProviderProps = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: StoreProviderProps) => {
  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      store.dispatch(setToken(authToken));
    }

    const stored = localStorage.getItem("cart-items");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as unknown;
        if (Array.isArray(parsed)) {
          store.dispatch(setCart(parsed));
        }
      } catch {
        localStorage.removeItem("cart-items");
      }
    }

    const unsubscribe = store.subscribe(() => {
      const { items } = store.getState().cart;
      localStorage.setItem("cart-items", JSON.stringify(items));
    });

    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;