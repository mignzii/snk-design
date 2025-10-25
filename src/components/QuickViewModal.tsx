import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { X } from "lucide-react";

interface QuickViewModalProps {
  product: ShopifyProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickViewModal = ({ product, open, onOpenChange }: QuickViewModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null;

  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const images = node.images.edges.map(edge => edge.node.url);
  
  const sizeOption = node.options.find(opt => opt.name === "Taille");
  const colorOption = node.options.find(opt => opt.name === "Couleur");

  const handleAddToCart = () => {
    const variant = node.variants.edges.find(v => {
      const matchesSize = !selectedSize || v.node.selectedOptions.some(opt => opt.value === selectedSize);
      const matchesColor = !selectedColor || v.node.selectedOptions.some(opt => opt.value === selectedColor);
      return matchesSize && matchesColor;
    })?.node;

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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-secondary/5 overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt={node.title}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`aspect-square bg-secondary/5 overflow-hidden border-2 transition-colors ${
                      currentImageIndex === idx ? "border-foreground" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt={`${node.title} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-light tracking-wide mb-2">{node.title}</h2>
              <p className="text-2xl font-medium">
                {node.priceRange.minVariantPrice.currencyCode} {price.toFixed(2)}
              </p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {node.description}
            </p>

            {/* Size Selection */}
            {sizeOption && sizeOption.values.length > 0 && (
              <div>
                <label className="text-xs uppercase tracking-widest font-medium mb-3 block">
                  Taille
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizeOption.values.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[3rem]"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {colorOption && colorOption.values.length > 0 && (
              <div>
                <label className="text-xs uppercase tracking-widest font-medium mb-3 block">
                  Couleur
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOption.values.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize && sizeOption && sizeOption.values.length > 0}
              className="w-full h-12 uppercase tracking-wider text-xs"
            >
              Ajouter au panier
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
