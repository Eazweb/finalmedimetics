import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrderItem } from "../models/OrderModel";

type Wishlist = {
  items: OrderItem[];
};

const initialState: Wishlist = {
  items: [],
};

export const wishlistStore = create<Wishlist>()(
  persist(() => initialState, {
    name: "wishlistStore",
  })
);

export default function useWishlistService() {
  const { items } = wishlistStore();

  return {
    items,
    addToWishlist: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);
      if (!exist) {
        const updatedItems = [...items, { ...item }];
        wishlistStore.setState({
          items: updatedItems,
        });
      }
    },
    removeFromWishlist: (item: OrderItem) => {
      const updatedItems = items.filter((x) => x.slug !== item.slug);
      wishlistStore.setState({
        items: updatedItems,
      });
    },
    clear: () => {
      wishlistStore.setState({
        items: [],
      });
    },
  };
}
