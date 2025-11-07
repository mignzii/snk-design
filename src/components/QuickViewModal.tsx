import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { X, Info } from "lucide-react";

interface QuickViewModalProps {
  product: ShopifyProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickViewModal = ({ product, open, onOpenChange }: QuickViewModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customSize, setCustomSize] = useState("");
  const [customLength, setCustomLength] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null;

  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = "CAD"; // Force CAD display
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
      price: { amount: variant.price.amount, currencyCode: currency },
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
                {currency} {price.toFixed(2)}
              </p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {node.description}
            </p>

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
                  <Label htmlFor="quickViewSize" className="text-xs uppercase tracking-wider font-light">
                    Votre taille (facultatif)
                  </Label>
                  <Input
                    id="quickViewSize"
                    placeholder="Ex: S, M, L, 38, 40..."
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quickViewLength" className="text-xs uppercase tracking-wider font-light">
                    Longueur souhaitée (facultatif)
                  </Label>
                  <Input
                    id="quickViewLength"
                    placeholder="Ex: 120cm, longueur cheville..."
                    value={customLength}
                    onChange={(e) => setCustomLength(e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
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
