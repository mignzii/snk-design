import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState } from "react";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [imageIndex, setImageIndex] = useState(0);
  
  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const formattedPrice = price.toFixed(2);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  
  const primaryImage = node.images.edges[0]?.node.url;
  const secondaryImage = node.images.edges[1]?.node.url;
  
  const currentImage = imageIndex === 0 ? primaryImage : secondaryImage || primaryImage;
  
  const isAvailable = node.variants.edges[0]?.node.availableForSale ?? true;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const firstVariant = node.variants.edges[0]?.node;
    if (!firstVariant) return;

    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    };

    addItem(cartItem);
    toast.success("Ajouté au panier", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="relative overflow-hidden rounded-sm bg-secondary/20 aspect-[3/4] mb-4">
        <img
          src={currentImage}
          alt={node.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onMouseEnter={() => secondaryImage && setImageIndex(1)}
          onMouseLeave={() => setImageIndex(0)}
        />
        
        {!isAvailable && (
          <Badge className="absolute top-4 left-4 bg-charcoal text-white">
            ÉPUISÉ
          </Badge>
        )}
        
        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          
          {isAvailable && (
            <Button
              size="icon"
              className="rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-serif font-medium text-lg line-clamp-1 group-hover:text-accent transition-colors">
          {node.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {node.description}
        </p>
        <p className="font-semibold">
          {currency} {formattedPrice}
        </p>
      </div>
    </Link>
  );
};
