import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(12);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <HeroSlider />

      {/* Products Section - Best Sellers */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-normal tracking-wider uppercase mb-2">
            Best Sellers
          </h2>
          <div className="w-16 h-px bg-foreground mx-auto mt-4"></div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">
              Aucun produit trouvé
            </p>
            <p className="text-sm text-muted-foreground">
              Les produits seront bientôt disponibles. Revenez plus tard !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Index;
