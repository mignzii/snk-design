import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/stores/wishlistStore";
import { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: ShopifyProduct;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export const WishlistButton = ({ product, className, size = "icon" }: WishlistButtonProps) => {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(product.node.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    
    toast.success(
      isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      {
        description: product.node.title,
        position: "top-center",
      }
    );
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleToggle}
      className={cn(
        "transition-colors",
        isFavorite ? "text-red-500" : "text-foreground",
        className
      )}
    >
      <Heart 
        className={cn(
          "h-4 w-4 transition-all",
          isFavorite && "fill-current"
        )} 
      />
    </Button>
  );
};
