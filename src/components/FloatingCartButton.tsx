import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartDrawer } from "./CartDrawer";

export const FloatingCartButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 100px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible && totalItems === 0) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="relative">
        {/* We use a hidden trigger for the existing CartDrawer logic to reuse it, 
            or we can just wrap the button to open the drawer manually. 
            Since CartDrawer already includes the Sheet logic, we can reuse it 
            by triggering the same store state if it was controlled, but here it's uncontrolled UI.
            So we'll just render a separate CartDrawer instance or trigger the one in header?
            
            Actually, the cleanest way is to make CartDrawer accept a custom trigger.
            Let's modify CartDrawer first to accept children as trigger.
        */}
        <CartDrawer 
          customTrigger={
            <Button 
              size="icon" 
              className="h-14 w-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs border-2 border-background">
                  {totalItems}
                </Badge>
              )}
            </Button>
          }
        />
      </div>
    </div>
  );
};
