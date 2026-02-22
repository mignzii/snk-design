import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Tag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartDrawerProps {
  customTrigger?: React.ReactNode;
}

export const CartDrawer = ({ customTrigger }: CartDrawerProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const { items, isLoading, promoCode, updateQuantity, removeItem, setPromoCode, createCheckout } = useCartStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      setPromoCode(promoInput.trim().toUpperCase());
    }
  };

  const handleCheckout = async () => {
    try {
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      if (checkoutUrl) {
        setIsOpen(false);
        // Navigation dans la même fenêtre pour éviter le blocage des popups sur mobile
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {customTrigger || (
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                {totalItems}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-serif">{t('cart.title')}</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? t('cart.empty') : `${totalItems} ${totalItems === 1 ? t('cart.items') : t('cart.items_plural')}`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('cart.empty')}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-2 rounded-lg border">
                      <div className="w-20 h-20 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate font-serif">{item.product.node.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.selectedOptions.map(option => option.value).join(' • ')}
                        </p>
                        {(item.customSize || item.customLength) && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.customSize && `${t('cart.size')}: ${item.customSize}`}
                            {item.customSize && item.customLength && ' • '}
                            {item.customLength && `${t('cart.length')}: ${item.customLength}`}
                          </p>
                        )}
                        <p className="font-semibold mt-1">
                          CAD {parseFloat(item.price.amount).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-4 pt-4 mt-4 border-t bg-background">
                {/* Promo Code Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('cart.promo_code')}</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder={t('cart.promo_placeholder')}
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleApplyPromo}
                      variant="outline"
                      size="sm"
                      disabled={!promoInput.trim()}
                    >
                      <Tag className="w-4 h-4 mr-1" />
                      {t('cart.apply')}
                    </Button>
                  </div>
                  {promoCode && (
                    <p className="text-xs text-green-600">
                      ✓ Code appliqué: {promoCode}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-serif font-semibold">{t('cart.total')}</span>
                  <span className="text-xl font-bold">
                    CAD {totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('cart.creating')}
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('cart.checkout')}
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
