import { Facebook, Instagram, Twitter, CreditCard, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Haute Couture</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Découvrez notre collection exclusive de robes et vêtements haut de gamme
              pour la femme moderne et élégante.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Boutique</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button className="hover:text-accent transition-colors text-left">
                  Nouveautés
                </button>
              </li>
              <li>
                <button className="hover:text-accent transition-colors text-left">
                  Robes
                </button>
              </li>
              <li>
                <button className="hover:text-accent transition-colors text-left">
                  Accessoires
                </button>
              </li>
              <li>
                <button className="hover:text-accent transition-colors text-left">
                  Soldes
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Service Client</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button className="hover:text-accent transition-colors text-left">
                  Contact
                </button>
              </li>
              <li>
                <button className="hover:text-accent transition-colors text-left">
                  Livraison & Retours
                </button>
              </li>
              <li>
                <button className="hover:text-accent transition-colors text-left">
                  Guide des Tailles
                </button>
              </li>
              <li>
                <button className="hover:text-accent transition-colors text-left">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Recevez nos dernières actualités et offres exclusives
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Votre email"
                className="text-sm"
              />
              <Button>S'abonner</Button>
            </div>
          </div>
        </div>

        {/* Payment Methods & Features */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Paiement sécurisé SSL</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Livraison gratuite +100€</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Visa, Mastercard, PayPal, Apple Pay</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2025 Haute Couture. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <Link to="/legal/terms" className="hover:text-foreground transition-colors">Conditions Générales</Link>
              <Link to="/legal/privacy" className="hover:text-foreground transition-colors">Confidentialité</Link>
              <Link to="/legal/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
