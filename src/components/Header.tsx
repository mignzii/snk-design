import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "SHOP", href: "/" },
    { label: "NEW", href: "/" },
    { label: "ROBES", href: "/" },
    { label: "ACCESSOIRES", href: "/" },
  ];

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-foreground text-background py-2 text-center text-xs uppercase tracking-wider">
        Livraison standard 7-15 jours ouvrables
      </div>
      
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 bg-background border-b",
          isScrolled && "shadow-sm"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left - Menu button on mobile, navigation on desktop */}
            <div className="flex items-center flex-1">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              <nav className="hidden lg:flex items-center gap-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-xs font-medium tracking-wider transition-colors hover:text-muted-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center - Logo */}
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-xl font-medium tracking-[0.2em] uppercase">
                HAUTE COUTURE
              </h1>
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-1 flex-1 justify-end">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <User className="h-4 w-4" />
              </Button>
              <CartDrawer />
            </div>
          </div>
          
          <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t animate-fade-in">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block py-3 text-xs font-medium tracking-wider transition-colors hover:text-muted-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
    </>
  );
};
