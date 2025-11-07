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
import { PromoModal } from "@/components/PromoModal";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPromoModal, setShowPromoModal] = useState(false);

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

  useEffect(() => {
    // Check if user has seen the promo modal before
    const hasSeenPromo = sessionStorage.getItem("hasSeenPromoModal");
    if (!hasSeenPromo) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShowPromoModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePromoModal = () => {
    setShowPromoModal(false);
    sessionStorage.setItem("hasSeenPromoModal", "true");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <PromoModal open={showPromoModal} onClose={handleClosePromoModal} />
      
      <HeroSlider />
      
      <FeaturesSection />

      {/* Best Sellers Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-xs sm:text-sm font-normal tracking-[0.2em] sm:tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Best Sellers
          </h2>
          <div className="w-12 sm:w-16 h-px bg-foreground mx-auto mt-3 sm:mt-4"></div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 sm:py-20">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-4">
              No products found
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Products will be available soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-8 sm:gap-y-12 mb-8 sm:mb-12">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/shop">
                <Button 
                  variant="outline" 
                  className="group uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs px-4 sm:px-8 py-4 sm:py-6 hover:bg-foreground hover:text-background transition-all"
                >
                  Voir Plus
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Discover Section */}
      <section className="py-12 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-xs sm:text-sm font-normal tracking-[0.2em] sm:tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Discover
            </h2>
            <div className="w-12 sm:w-16 h-px bg-foreground mx-auto mt-3 sm:mt-4"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <a href="/collections/robes" className="group relative aspect-square overflow-hidden">
              <img 
                src={products[4]?.node.images.edges[0]?.node.url || ""}
                alt="Robes"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-sm sm:text-xl tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light">Robes</h3>
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
                <h3 className="text-white text-sm sm:text-xl tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light">Ensembles</h3>
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
                <h3 className="text-white text-sm sm:text-xl tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light">Nouveautés</h3>
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
                <h3 className="text-white text-sm sm:text-xl tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light">Accessoires</h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Archive Sales Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Archive Sale Card */}
            <Link to="/shop" className="group relative aspect-[3/4] overflow-hidden">
              <img 
                src={products[4]?.node.images.edges[0]?.node.url || ""}
                alt="Archive Sale Drop II"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.2em] uppercase mb-2">
                  Archive Sale
                </h2>
                <p className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-6">
                  Drop II
                </p>
                <Button 
                  variant="outline" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all uppercase tracking-[0.2em] text-xs px-8 py-6"
                >
                  View Collection
                </Button>
              </div>
            </Link>

            {/* Second Archive Sale Card */}
            <Link to="/shop" className="group relative aspect-[3/4] overflow-hidden">
              <img 
                src={products[5]?.node.images.edges[0]?.node.url || ""}
                alt="Archive Sale Drop II"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.2em] uppercase mb-2">
                  Archive Sale
                </h2>
                <p className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-6">
                  Drop II
                </p>
                <Button 
                  variant="outline" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all uppercase tracking-[0.2em] text-xs px-8 py-6"
                >
                  Shop Now
                </Button>
              </div>
            </Link>
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
