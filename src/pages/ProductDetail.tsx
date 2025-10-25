import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, ArrowLeft, Loader2 } from "lucide-react";
import { storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_QUERY, { handle });
        if (data.data.productByHandle) {
          setProduct({ node: data.data.productByHandle });
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      loadProduct();
    }
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-serif mb-4">Produit non trouvé</h1>
          <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const { node } = product;
  const variant = node.variants.edges[selectedVariant]?.node;
  const price = parseFloat(variant?.price.amount || node.priceRange.minVariantPrice.amount);
  const currency = variant?.price.currencyCode || node.priceRange.minVariantPrice.currencyCode;

  const handleAddToCart = () => {
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    };

    addItem(cartItem);
    toast.success("Ajouté au panier", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-sm overflow-hidden bg-secondary/20">
              <img
                src={node.images.edges[selectedImage]?.node.url}
                alt={node.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {node.images.edges.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                    idx === selectedImage ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image.node.url}
                    alt={node.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-4">{node.title}</h1>
              <p className="text-3xl font-bold mb-6">
                {currency} {price.toFixed(2)}
              </p>
              
              {!variant?.availableForSale && (
                <Badge className="mb-4">ÉPUISÉ</Badge>
              )}
            </div>

            <div className="prose prose-sm">
              <p>{node.description}</p>
            </div>

            {/* Variants */}
            {node.options.length > 0 && (
              <div className="space-y-4">
                {node.options.map((option) => (
                  <div key={option.name}>
                    <label className="block font-semibold mb-2">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {node.variants.edges.map((v, idx) => {
                        const optionValue = v.node.selectedOptions.find(
                          (o) => o.name === option.name
                        )?.value;
                        
                        return (
                          <Button
                            key={idx}
                            variant={selectedVariant === idx ? "default" : "outline"}
                            onClick={() => setSelectedVariant(idx)}
                            disabled={!v.node.availableForSale}
                          >
                            {optionValue}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!variant?.availableForSale}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ajouter au panier
              </Button>
              
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground border-t pt-6">
              <p className="flex items-center gap-2">
                🚚 Livraison gratuite dès 100€
              </p>
              <p className="flex items-center gap-2">
                ↩️ Retours gratuits sous 30 jours
              </p>
              <p className="flex items-center gap-2">
                🔒 Paiement 100% sécurisé
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
