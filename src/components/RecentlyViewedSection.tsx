import { useRecentlyViewedStore } from "@/stores/recentlyViewedStore";
import { ProductCard } from "@/components/ProductCard";

export const RecentlyViewedSection = () => {
  const items = useRecentlyViewedStore((state) => state.items);

  if (items.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-sm font-normal tracking-[0.3em] uppercase text-muted-foreground mb-2">
          Récemment Vus
        </h2>
        <div className="w-16 h-px bg-foreground mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
        {items.slice(0, 4).map((product) => (
          <ProductCard key={product.node.id} product={product} />
        ))}
      </div>
    </section>
  );
};
