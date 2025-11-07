import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, Menu, X, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const wishlistCount = useWishlistStore(state => state.items.length);
  
  const promoMessages = ['header.promo1', 'header.promo2', 'header.promo3'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoMessages.length);
    }, 5000); // Change message every 5 seconds
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const menuItems = [{
    labelKey: "menu.shop",
    href: "/shop"
  }, {
    labelKey: "menu.dresses",
    href: "/collections/robes"
  }, {
    labelKey: "menu.sets",
    href: "/collections/ensembles"
  }, {
    labelKey: "menu.new",
    href: "/collections/new"
  }, {
    labelKey: "menu.accessories",
    href: "/collections/jewelry"
  }, {
    labelKey: "menu.about",
    href: "/about"
  }];
  return <>
      {/* Top announcement bar with rotating promos */}
      <div className="bg-foreground text-background py-2 text-center text-[10px] sm:text-xs uppercase tracking-wider px-4 overflow-hidden">
        <div className="animate-fade-in whitespace-nowrap overflow-hidden text-ellipsis">
          {t(promoMessages[promoIndex])}
        </div>
      </div>
      
      <header className={cn("sticky top-0 z-50 transition-all duration-300 bg-background border-b", isScrolled && "shadow-sm")}>
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left - Menu button on mobile, navigation on desktop */}
            <div className="flex items-center flex-1 justify-start">
              <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 shrink-0" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>

              <nav className="hidden lg:flex items-center gap-6">
                {menuItems.map(item => <Link key={item.labelKey} to={item.href} className="text-xs font-medium tracking-wider transition-colors hover:text-muted-foreground">
                    {t(item.labelKey)}
                  </Link>)}
              </nav>
            </div>

            {/* Center - Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="text-xs sm:text-lg md:text-3xl font-bold tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.2em] uppercase whitespace-nowrap">SNK DESIGN</h1>
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1 flex-1 justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 hidden sm:flex">
                    <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage('fr')} className={language === 'fr' ? 'bg-accent' : ''}>
                    🇫🇷 Français
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
                    🇬🇧 English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" onClick={() => setSearchOpen(true)}>
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 relative">
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {wishlistCount > 0 && <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">
                      {wishlistCount}
                    </Badge>}
                </Button>
              </Link>
              
              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 hidden sm:flex">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <CartDrawer />
            </div>
          </div>
          
          <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />

          {/* Mobile menu */}
          {isMobileMenuOpen && <nav className="lg:hidden py-4 border-t animate-fade-in">
              {menuItems.map(item => <Link key={item.labelKey} to={item.href} className="block py-3 text-xs font-medium tracking-wider transition-colors hover:text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                  {t(item.labelKey)}
                </Link>)}
            </nav>}
        </div>
      </header>
    </>;
};