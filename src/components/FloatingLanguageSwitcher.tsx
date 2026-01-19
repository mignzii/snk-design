import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const FloatingLanguageSwitcher = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language, setLanguage } = useLanguage();

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

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-full shadow-lg bg-background border border-border text-foreground hover:bg-accent hover:scale-105 transition-all duration-300 text-2xl"
          >
            {language === 'fr' ? '🇫🇷' : '🇬🇧'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="top" className="mb-2">
          <DropdownMenuItem onClick={() => setLanguage('fr')} className={language === 'fr' ? 'bg-accent' : ''}>
            <span className="mr-2 text-lg">🇫🇷</span> Français
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
            <span className="mr-2 text-lg">🇬🇧</span> English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
