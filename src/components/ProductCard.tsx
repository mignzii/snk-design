import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { WishlistButton } from "@/components/WishlistButton";
import { Eye } from "lucide-react";
import { QuickViewModal } from "@/components/QuickViewModal";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [imageIndex, setImageIndex] = useState(0);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const formattedPrice = price.toFixed(2);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  
  const images = node.images.edges.map(edge => edge.node.url);
  const currentImage = images[imageIndex] || images[0];
  
  const isAvailable = node.variants.edges[0]?.node.availableForSale ?? true;
  const sizes = node.options.find(opt => opt.name === "Taille")?.values || [];

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const variant = node.variants.edges.find(v => 
      v.node.selectedOptions.some(opt => opt.value === size)
    )?.node;
    
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
      description: `${node.title} - ${size}`,
      position: "top-center",
    });
    setShowQuickAdd(false);
  };

  useEffect(() => {
    if (isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % images.length);
      }, 800);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (!isHovered) {
        setImageIndex(0);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, images.length]);

  return (
    <>
      <div className="group block">
        <Link to={`/product/${node.handle}`}>
          <div 
            className="relative overflow-hidden bg-secondary/5 aspect-[3/4] mb-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Wishlist & Quick View Buttons */}
            <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <WishlistButton product={product} size="icon" className="bg-background/90 backdrop-blur-sm hover:bg-background" />
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/90 backdrop-blur-sm hover:bg-background"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickViewOpen(true);
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            <img
              src={currentImage}
              alt={node.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
          
          {/* Image indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {images.slice(0, 5).map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    idx === imageIndex 
                      ? "w-6 bg-foreground" 
                      : "w-1 bg-foreground/30"
                  )}
                />
              ))}
            </div>
          )}
          
          {/* Quick Add Button */}
          {isAvailable && sizes.length > 0 && (
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              {!showQuickAdd ? (
                <Button
                  className="w-full rounded-none bg-background/95 backdrop-blur-sm text-foreground hover:bg-background border-t"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowQuickAdd(true);
                  }}
                >
                  Quick Add
                </Button>
              ) : (
                <div className="bg-background/95 backdrop-blur-sm border-t p-3 space-y-2">
                  <div className="text-xs text-center mb-2 font-medium">Select Size</div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        size="sm"
                        variant="outline"
                        className="text-xs h-8"
                        onClick={(e) => handleQuickAdd(e, size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
      
      <Link to={`/product/${node.handle}`} className="block space-y-1">
        <h3 className="font-normal text-sm line-clamp-1 group-hover:underline transition-all">
          {node.title}
        </h3>
        <p className="text-sm font-medium">
          {currency} {formattedPrice}
        </p>
      </Link>
      </div>

      <QuickViewModal 
        product={product} 
        open={quickViewOpen} 
        onOpenChange={setQuickViewOpen} 
      />
    </>
  );
};
