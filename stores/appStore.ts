import { create } from "zustand";

interface IAppState {
  user?: any;
  cart: any;
  addProduct: (product: any, quantity?: number) => void;
  increaseProductQty: (id: any) => void;
  decreaseProductQty: (id: any) => void;
  removeProduct: (id: any) => void;
  setUser: (user?: any) => void;
}

const useAppStore = create<IAppState>()((set) => ({
  cart: {},
  addProduct: (product, quantity = 1) =>
    set((state) => ({
      cart: { ...state.cart, [product.id]: { product, quantity } },
    })),
  increaseProductQty: (id) => {
    set((state) => ({
      cart: {
        ...state.cart,
        [id]: { ...state.cart[id], quantity: state.cart[id].quantity + 1 },
      },
    }));
  },
  decreaseProductQty: (id) => {
    set((state) => {
      if (state.cart[id].quantity === 1) {
        return { cart: { ...state.cart, [id]: undefined } };
      }
      return {
        cart: {
          ...state.cart,
          [id]: { ...state.cart[id], quantity: state.cart[id].quantity - 1 },
        },
      };
    });
  },
  removeProduct: (id) =>
    set((state) => ({
      cart: { ...state.cart, [id]: undefined },
    })),
  setUser: (user) => set(() => ({ user })),
}));

export { useAppStore };
