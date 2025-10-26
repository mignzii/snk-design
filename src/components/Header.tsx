import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { useWishlistStore } from "@/stores/wishlistStore";
import { cn } from "@/lib/utils";
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const wishlistCount = useWishlistStore(state => state.items.length);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const menuItems = [{
    label: "BOUTIQUE",
    href: "/shop"
  }, {
    label: "ROBES",
    href: "/collections/robes"
  }, {
    label: "ENSEMBLES",
    href: "/collections/ensembles"
  }, {
    label: "NEW",
    href: "/collections/new"
  }, {
    label: "ACCESSOIRES",
    href: "/collections/jewelry"
  }];
  return <>
      {/* Top announcement bar */}
      <div className="bg-foreground text-background py-2 text-center text-xs uppercase tracking-wider">
        Livraison standard 7-15 jours ouvrables
      </div>
      
      <header className={cn("sticky top-0 z-50 transition-all duration-300 bg-background border-b", isScrolled && "shadow-sm")}>
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left - Menu button on mobile, navigation on desktop */}
            <div className="flex items-center flex-1 min-w-0">
              <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 shrink-0" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>

              <nav className="hidden lg:flex items-center gap-6">
                {menuItems.map(item => <Link key={item.label} to={item.href} className="text-xs font-medium tracking-wider transition-colors hover:text-muted-foreground">
                    {item.label}
                  </Link>)}
              </nav>
            </div>

            {/* Center - Logo */}
            <Link to="/" className="flex-shrink-0 px-2">
              <h1 className="text-[9px] md:text-xl font-medium tracking-[0.05em] md:tracking-[0.2em] uppercase whitespace-nowrap">SNK-DESIGN</h1>
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-0 md:gap-1 flex-1 min-w-0 justify-end">
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setSearchOpen(true)}>
                <Search className="h-4 w-4" />
              </Button>
              
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 relative">
                  <Heart className="h-4 w-4" />
                  {wishlistCount > 0 && <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">
                      {wishlistCount}
                    </Badge>}
                </Button>
              </Link>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <User className="h-4 w-4" />
              </Button>
              <CartDrawer />
            </div>
          </div>
          
          <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />

          {/* Mobile menu */}
          {isMobileMenuOpen && <nav className="lg:hidden py-4 border-t animate-fade-in">
              {menuItems.map(item => <Link key={item.label} to={item.href} className="block py-3 text-xs font-medium tracking-wider transition-colors hover:text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </Link>)}
            </nav>}
        </div>
      </header>
    </>;
};