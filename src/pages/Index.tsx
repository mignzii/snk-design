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

      {/* Promotional Banner */}
      <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
        <div className="animate-slide-in whitespace-nowrap text-center text-sm">
          🚚 Livraison gratuite dès 100€ • ↩️ Retours sous 30 jours • 🔒 Paiement sécurisé
        </div>
      </div>

      {/* About Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-6">
              L'Art de l'Élégance Française
            </h2>
            <p className="text-muted-foreground mb-4 text-lg">
              Depuis notre atelier parisien, nous créons des robes qui célèbrent la féminité 
              et l'élégance intemporelle. Chaque pièce est pensée pour sublimer votre silhouette 
              et révéler votre personnalité unique.
            </p>
            <p className="text-muted-foreground text-lg">
              Notre savoir-faire artisanal et notre passion pour les détails font de chaque 
              création une œuvre d'art portée avec fierté par des femmes du monde entier.
            </p>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <img 
              src="/src/assets/hero-2.jpg" 
              alt="Notre atelier" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/20 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Livraison Express</h3>
              <p className="text-muted-foreground">
                Livraison gratuite dès 100€ et expédition sous 24h
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">↩️</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Retours Gratuits</h3>
              <p className="text-muted-foreground">
                30 jours pour changer d'avis, retours sans frais
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Qualité Premium</h3>
              <p className="text-muted-foreground">
                Matières nobles et finitions soignées pour une durabilité exceptionnelle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">
            Notre Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection exclusive de robes et vêtements haute couture,
            conçus pour sublimer votre élégance naturelle
          </p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Restez Informée
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Inscrivez-vous à notre newsletter et recevez en exclusivité nos nouvelles collections, 
              conseils de style et offres privilégiées.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="flex-1 px-4 py-3 rounded-lg border bg-background"
              />
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                S'inscrire
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              En vous inscrivant, vous acceptez de recevoir nos communications. 
              Désinscription possible à tout moment.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
