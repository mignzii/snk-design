import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShoppingCart, Heart, ArrowLeft, Loader2, Ruler, AlertCircle, Info } from "lucide-react";
import { storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useRecentlyViewedStore } from "@/stores/recentlyViewedStore";
import { WishlistButton } from "@/components/WishlistButton";
import { SizeGuideModal } from "@/components/SizeGuideModal";
import { RelatedProductsSection } from "@/components/RelatedProductsSection";
import { RecentlyViewedSection } from "@/components/RecentlyViewedSection";
import { ProductBenefitsSection } from "@/components/ProductBenefitsSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
      variants(first: 100) {
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
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [customSize, setCustomSize] = useState("");
  const [customLength, setCustomLength] = useState("");
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
  const options = node.options || [];

  // Trouver la variante correspondant aux options sélectionnées
  const getSelectedVariant = () => {
    const edges = node.variants.edges;
    if (edges.length === 0) return null;
    const selectedEntries = Object.entries(selectedOptions).filter(([, v]) => v !== "");
    if (selectedEntries.length === 0) return edges[0].node;
    return edges.find(({ node: v }) =>
      selectedEntries.every(([name, value]) =>
        v.selectedOptions.some((opt) => opt.name === name && opt.value === value)
      )
    )?.node ?? null;
  };

  const variant = getSelectedVariant();
  const price = parseFloat(variant?.price?.amount || node.priceRange.minVariantPrice.amount);
  const currency = "CAD"; // Force CAD display
  
  // Check if low stock (mock - you'd get this from inventory in real scenario)
  const availableVariantsCount = node.variants.edges.filter(v => v.node.availableForSale).length;
  const isLowStock = availableVariantsCount > 0 && availableVariantsCount <= 2;

  const handleAddToCart = () => {
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: { amount: price.toString(), currencyCode: currency },
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
      customSize: customSize || undefined,
      customLength: customLength || undefined,
    };

    addItem(cartItem);
    toast.success("Ajouté au panier", {
      description: node.title,
      position: "top-right",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-[1600px] mx-auto px-4 py-24">
        <Breadcrumbs items={[{ label: node.title }]} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] overflow-hidden bg-secondary/10 group cursor-zoom-in">
              <img
                src={node.images.edges[selectedImage]?.node.url}
                alt={`${node.title} - Image ${selectedImage + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
              {node.images.edges.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square overflow-hidden transition-all border-2 ${
                    idx === selectedImage 
                      ? "opacity-100 border-primary" 
                      : "opacity-60 hover:opacity-100 border-transparent"
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

            {/* Sélecteur de variantes (Taille, Couleur, etc.) */}
            {options.length > 0 && (
              <div className="space-y-4">
                {options.map((option) => (
                  <div key={option.name}>
                    <Label className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2 block">
                      {option.name}
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const isSelected = selectedOptions[option.name] === value;
                        const variantForValue = node.variants.edges.find(({ node: v }) =>
                          v.selectedOptions.some((o) => o.name === option.name && o.value === value)
                        )?.node;
                        const isAvailable = variantForValue?.availableForSale ?? true;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() =>
                              setSelectedOptions((prev) => ({
                                ...prev,
                                [option.name]: value,
                              }))
                            }
                            className={cn(
                              "min-w-[3rem] px-4 py-2.5 text-xs font-medium uppercase tracking-wider border transition-colors",
                              isSelected
                                ? "border-foreground bg-foreground text-background"
                                : "border-border bg-background hover:border-foreground/50",
                              !isAvailable && "opacity-50 cursor-not-allowed line-through"
                            )}
                            disabled={!isAvailable}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Taille unique info */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-md border border-border/50">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Taille Unique</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Les robes sont en taille unique, mais contiennent des ceintures intérieures ajustables qui s'adaptent à la morphologie de chaque personne.
                  </p>
                </div>
              </div>
              
              {/* Custom size and length fields */}
              <div className="space-y-4 pt-2 border-t border-border/50">
                <div className="space-y-2">
                  <Label htmlFor="customSize" className="text-xs uppercase tracking-wider font-light">
                    Votre taille (facultatif)
                  </Label>
                  <Input
                    id="customSize"
                    placeholder="Ex: S, M, L, 38, 40..."
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customLength" className="text-xs uppercase tracking-wider font-light">
                    Longueur souhaitée (facultatif)
                  </Label>
                  <Input
                    id="customLength"
                    placeholder="Ex: 120cm, longueur cheville..."
                    value={customLength}
                    onChange={(e) => setCustomLength(e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

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
                  <p>Livraison gratuite à l'achat de 3 articles et plus</p>
                  <p>Retour à vos frais</p>
                  <p>Délai de livraison : 3 à 5 jours ouvrables</p>
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

      {/* Benefits Section */}
      <ProductBenefitsSection />

      {/* Related Products Section */}
      {product && <RelatedProductsSection currentProductId={node.id} />}

      {/* Recently Viewed Section */}
      <RecentlyViewedSection />

      <Footer />
    </div>
  );
};

export default ProductDetail;
