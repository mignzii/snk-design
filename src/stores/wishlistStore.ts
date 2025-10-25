import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct } from '@/lib/shopify';

interface WishlistStore {
  items: ShopifyProduct[];
  addItem: (item: ShopifyProduct) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (item: ShopifyProduct) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const { items } = get();
        if (!items.find(i => i.node.id === item.node.id)) {
          set({ items: [...items, item] });
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.node.id !== productId) });
      },
      
      isInWishlist: (productId) => {
        return get().items.some(item => item.node.id === productId);
      },
      
      toggleItem: (item) => {
        const { isInWishlist, addItem, removeItem } = get();
        if (isInWishlist(item.node.id)) {
          removeItem(item.node.id);
        } else {
          addItem(item);
        }
      }
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
