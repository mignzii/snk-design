import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShoppingCart, Heart, ArrowLeft, Loader2, Ruler, AlertCircle } from "lucide-react";
import { storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useRecentlyViewedStore } from "@/stores/recentlyViewedStore";
import { WishlistButton } from "@/components/WishlistButton";
import { SizeGuideModal } from "@/components/SizeGuideModal";
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
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const addRecentlyViewed = useRecentlyViewedStore((state) => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_QUERY, { handle });
        if (data.data.productByHandle) {
          const productData = { node: data.data.productByHandle };
          setProduct(productData);
          // Add to recently viewed
          addRecentlyViewed(productData);
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
  }, [handle, addRecentlyViewed]);

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
  
  // Check if low stock (mock - you'd get this from inventory in real scenario)
  const availableVariantsCount = node.variants.edges.filter(v => v.node.availableForSale).length;
  const isLowStock = availableVariantsCount > 0 && availableVariantsCount <= 2;

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
      
      <div className="max-w-[1600px] mx-auto px-4 py-24">
        <Breadcrumbs items={[{ label: node.title }]} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails - Vertical on desktop */}
            <div className="hidden lg:flex flex-col gap-2 w-20">
              {node.images.edges.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square overflow-hidden transition-all ${
                    idx === selectedImage ? "opacity-100" : "opacity-50 hover:opacity-75"
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

            {/* Main Image */}
            <div className="flex-1">
              <div className="aspect-[3/4] overflow-hidden bg-secondary/10">
                <img
                  src={node.images.edges[selectedImage]?.node.url}
                  alt={node.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails - Horizontal on mobile */}
              <div className="lg:hidden grid grid-cols-5 gap-2 mt-4">
                {node.images.edges.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square overflow-hidden transition-all ${
                      idx === selectedImage ? "opacity-100" : "opacity-50"
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
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-8">
            {/* Title & Price */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-2xl lg:text-3xl font-light tracking-wider uppercase">
                  {node.title}
                </h1>
                <WishlistButton product={product} size="icon" />
              </div>
              
              <p className="text-xl font-light tracking-wide mb-3">
                {currency} {price.toFixed(2)}
              </p>
              
              {/* Low Stock Warning */}
              {isLowStock && variant?.availableForSale && (
                <div className="flex items-center gap-2 text-sm text-orange-600 mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <span>Plus que {availableVariantsCount} en stock</span>
                </div>
              )}
            </div>

            {/* Size/Color Selection */}
            {node.options.length > 0 && (
              <div className="space-y-6">
                {node.options.map((option) => (
                  <div key={option.name}>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs uppercase tracking-widest font-light">
                        {option.name}
                      </label>
                      {option.name === "Taille" && (
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => setSizeGuideOpen(true)}
                          className="text-xs h-auto p-0 uppercase tracking-wider"
                        >
                          <Ruler className="h-3 w-3 mr-1" />
                          Guide des tailles
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {node.variants.edges.map((v, idx) => {
                        const optionValue = v.node.selectedOptions.find(
                          (o) => o.name === option.name
                        )?.value;
                        
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedVariant(idx)}
                            disabled={!v.node.availableForSale}
                            className={`px-6 py-2 text-sm uppercase tracking-wider transition-all border ${
                              selectedVariant === idx
                                ? "bg-primary text-primary-foreground border-primary"
                                : v.node.availableForSale
                                ? "border-border hover:border-primary"
                                : "border-border opacity-30 cursor-not-allowed"
                            }`}
                          >
                            {optionValue}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full py-6 text-sm uppercase tracking-widest font-light"
              onClick={handleAddToCart}
              disabled={!variant?.availableForSale}
            >
              {!variant?.availableForSale ? "ÉPUISÉ" : "AJOUTER AU PANIER"}
            </Button>

            {/* Accordions */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description" className="border-t">
                <AccordionTrigger className="text-xs uppercase tracking-widest font-light hover:no-underline">
                  Description
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {node.description}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="delivery" className="border-t">
                <AccordionTrigger className="text-xs uppercase tracking-widest font-light hover:no-underline">
                  Livraison & Retours
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed space-y-2">
                  <p>Livraison gratuite dès 100€ d'achat</p>
                  <p>Retours gratuits sous 30 jours</p>
                  <p>Livraison en 3-5 jours ouvrés</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="care" className="border-t border-b">
                <AccordionTrigger className="text-xs uppercase tracking-widest font-light hover:no-underline">
                  Entretien
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed space-y-2">
                  <p>Lavage à la main recommandé</p>
                  <p>Ne pas utiliser d'eau de javel</p>
                  <p>Sécher à plat</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <SizeGuideModal open={sizeGuideOpen} onOpenChange={setSizeGuideOpen} />

      <Footer />
    </div>
  );
};

export default ProductDetail;
