import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Haute Couture. Tous droits réservés. 🔒 Paiement sécurisé</p>
        </div>
      </div>
    </footer>
  );
};
