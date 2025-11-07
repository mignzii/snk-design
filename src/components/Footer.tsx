import { Facebook, Instagram, CreditCard, Shield, Truck } from "lucide-react";
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
            <h3 className="font-serif font-bold text-base sm:text-lg mb-4">SNK-Design</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
              Découvrez notre collection exclusive de robes et vêtements haut de gamme
              pour la femme moderne et élégante.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 hover:bg-primary/10"
                asChild
              >
                <a 
                  href="https://www.instagram.com/snk_design1/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 hover:bg-primary/10"
                asChild
              >
                <a 
                  href="https://www.facebook.com/share/1GTvQt6A66/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-4">Boutique</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
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
            <h4 className="font-semibold text-sm sm:text-base mb-4">Informations</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link to="/faq" className="hover:text-accent transition-colors text-left">
                  Est-ce que la tenue sera à ma taille ?
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-accent transition-colors text-left">
                  Retours & Remboursements
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-accent transition-colors text-left">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-accent transition-colors text-left">
                  Paiements
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-accent transition-colors text-left">
                  Commandes
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-4">Newsletter</h4>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
              Recevez nos dernières actualités et offres exclusives
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Votre email"
                className="text-xs sm:text-sm"
              />
              <Button className="text-xs sm:text-sm px-3 sm:px-4">S'abonner</Button>
            </div>
          </div>
        </div>

        {/* Payment Methods & Features */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span>Paiement sécurisé SSL</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                <Truck className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span>Livraison gratuite +100€</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground flex-shrink-0" />
              <span className="text-[10px] sm:text-xs text-muted-foreground text-center sm:text-left">Visa, Mastercard, PayPal, Apple Pay</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground">
            <p className="text-center md:text-left">© 2025 SNK-Design. Tous droits réservés.</p>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
              <Link to="/legal/terms" className="hover:text-foreground transition-colors whitespace-nowrap">Conditions Générales</Link>
              <Link to="/legal/privacy" className="hover:text-foreground transition-colors whitespace-nowrap">Confidentialité</Link>
              <Link to="/legal/cookies" className="hover:text-foreground transition-colors whitespace-nowrap">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
