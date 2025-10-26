import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AboutSection } from "@/components/AboutSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { LookbookSection } from "@/components/LookbookSection";
import { PressSection } from "@/components/PressSection";
import { RecentlyViewedSection } from "@/components/RecentlyViewedSection";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      
      <FeaturesSection />

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
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 mb-12">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/shop">
                <Button 
                  variant="outline" 
                  className="group uppercase tracking-[0.2em] text-xs px-8 py-6 hover:bg-foreground hover:text-background transition-all"
                >
                  Voir Plus
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </>
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
            <a href="/collections/robes" className="group relative aspect-square overflow-hidden">
              <img 
                src={products[4]?.node.images.edges[0]?.node.url || ""}
                alt="Robes"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl tracking-[0.2em] uppercase font-light">Robes</h3>
              </div>
            </a>
            
            <a href="/collections/ensembles" className="group relative aspect-square overflow-hidden">
              <img 
                src={products[5]?.node.images.edges[0]?.node.url || ""}
                alt="Ensembles"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl tracking-[0.2em] uppercase font-light">Ensembles</h3>
              </div>
            </a>
            
            <a href="/collections/new" className="group relative aspect-square overflow-hidden">
              <img 
                src={products[6]?.node.images.edges[0]?.node.url || ""}
                alt="Nouveautés"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl tracking-[0.2em] uppercase font-light">Nouveautés</h3>
              </div>
            </a>
            
            <a href="/collections/jewelry" className="group relative aspect-square overflow-hidden">
              <img 
                src={products[7]?.node.images.edges[0]?.node.url || ""}
                alt="Accessoires"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl tracking-[0.2em] uppercase font-light">Accessoires</h3>
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
                <Link to="/shop">
                  <button className="px-8 py-3 border border-white/80 hover:bg-white hover:text-foreground transition-all tracking-[0.2em] text-sm uppercase">
                    View Collection
                  </button>
                </Link>
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
                <Link to="/shop">
                  <button className="px-8 py-3 border border-white/80 hover:bg-white hover:text-foreground transition-all tracking-[0.2em] text-sm uppercase">
                    Shop Now
                  </button>
                </Link>
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
      
      <AboutSection />
      
      <RecentlyViewedSection />
      
      <SocialProofSection />
      
      <PressSection />
      
      <LookbookSection />
      
      <NewsletterSection />

      <Footer />
    </div>
  );
};

export default Index;
