import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct } from '@/lib/shopify';

interface RecentlyViewedStore {
  items: ShopifyProduct[];
  addItem: (item: ShopifyProduct) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const { items } = get();
        // Remove if already exists
        const filtered = items.filter(i => i.node.id !== item.node.id);
        // Add to beginning and keep only last 8
        set({ items: [item, ...filtered].slice(0, 8) });
      }
    }),
    {
      name: 'recently-viewed-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

