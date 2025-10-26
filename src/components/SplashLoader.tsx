import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpg";

export const SplashLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center animate-fade-out">
      <div className="text-center animate-scale-in">
        <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 animate-pulse">
          <img 
            src={logo} 
            alt="SNK-Design Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase animate-fade-in">
          SNKDESIGN
        </h1>
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground mt-2 animate-fade-in">
          Haute Couture Africaine
        </p>
      </div>
    </div>
  );
};
