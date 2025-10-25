import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useWishlistStore } from "@/stores/wishlistStore";
import { Heart } from "lucide-react";

const Wishlist = () => {
  const items = useWishlistStore((state) => state.items);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Heart className="h-6 w-6" />
            <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] uppercase">
              Mes Favoris
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {items.length === 0 
              ? "Aucun article dans vos favoris" 
              : `${items.length} article${items.length > 1 ? 's' : ''} dans vos favoris`
            }
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-8">
              Vous n'avez pas encore de favoris
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 max-w-7xl mx-auto">
            {items.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Wishlist;
