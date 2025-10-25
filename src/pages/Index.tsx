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

      {/* Best Sellers Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-sm font-normal tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Best Sellers
          </h2>
          <div className="w-16 h-px bg-foreground mx-auto mt-4"></div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">
              No products found
            </p>
            <p className="text-sm text-muted-foreground">
              Products will be available soon!
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

      {/* Discover Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-normal tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Discover
            </h2>
            <div className="w-16 h-px bg-foreground mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/collections/ss25" className="group relative aspect-square overflow-hidden">
              <img 
                src={products[0]?.node.images.edges[0]?.node.url || ""}
                alt="SS25"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl tracking-[0.2em] uppercase font-light">SS25</h3>
              </div>
            </a>
            
            <a href="/collections/new" className="group relative aspect-square overflow-hidden">
              <img 
                src={products[1]?.node.images.edges[0]?.node.url || ""}
                alt="New"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl tracking-[0.2em] uppercase font-light">New</h3>
              </div>
            </a>
            
            <a href="/collections/head-pieces" className="group relative aspect-square overflow-hidden">
              <img 
                src={products[2]?.node.images.edges[0]?.node.url || ""}
                alt="Head Pieces"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl tracking-[0.2em] uppercase font-light">Head Pieces</h3>
              </div>
            </a>
            
            <a href="/collections/jewelry" className="group relative aspect-square overflow-hidden">
              <img 
                src={products[3]?.node.images.edges[0]?.node.url || ""}
                alt="Jewelry"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl tracking-[0.2em] uppercase font-light">Jewelry</h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Archive Sale Collection Carousel */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[3/4] bg-secondary/10 overflow-hidden group">
              <img 
                src={products[0]?.node.images.edges[0]?.node.url || ""}
                alt="Archive Sale"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                <h2 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-4">
                  Archive Sale
                </h2>
                <p className="text-sm tracking-[0.3em] uppercase mb-8">Drop II</p>
                <button className="px-8 py-3 border border-white/80 hover:bg-white hover:text-foreground transition-all tracking-[0.2em] text-sm uppercase">
                  View Collection
                </button>
              </div>
            </div>
            <div className="relative aspect-[3/4] bg-secondary/10 overflow-hidden group">
              <img 
                src={products[1]?.node.images.edges[0]?.node.url || ""}
                alt="Archive Sale"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                <h2 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-4">
                  Archive Sale
                </h2>
                <p className="text-sm tracking-[0.3em] uppercase mb-8">Drop II</p>
                <button className="px-8 py-3 border border-white/80 hover:bg-white hover:text-foreground transition-all tracking-[0.2em] text-sm uppercase">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-sm font-normal tracking-[0.3em] uppercase text-muted-foreground mb-2">
            New Arrivals
          </h2>
          <div className="w-16 h-px bg-foreground mx-auto mt-4"></div>
        </div>

        {products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
            {products.slice(0, 8).map((product) => (
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
