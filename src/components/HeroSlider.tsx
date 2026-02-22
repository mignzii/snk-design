import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";
import hero5 from "@/assets/hero-5.jpg";

const slides = [
  {
    image: lookbook1,
    title: "BLACK FRIDAY",
    subtitle: "Votre robe coup de cœur, à  prix Black Friday. Des modèles à partir de 99 $ et jusqu'à 50 % de rabais.",
    showButton: true,
  },
  
  {
    image: hero5,
    title: "BLACK FRIDAY",
    subtitle: "Votre robe coup de cœur, à prix Black Friday. Des modèles à partir de 99 $ et jusqu'à 50 % de rabais.",
    showButton: true,
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            // @ts-ignore - fetchPriority is supported in modern browsers but not yet in React types
            fetchpriority={index === 0 ? "high" : "low"}
            decoding={index === 0 ? "sync" : "async"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white z-10 px-4 max-w-full">
          <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-normal tracking-[0.1em] sm:tracking-[0.15em] uppercase mb-2 sm:mb-3 animate-fade-in break-words">
            {slides[currentSlide].title}
          </h2>
          <p className={`font-light animate-fade-in break-words max-w-4xl mx-auto ${
            slides[currentSlide].showButton 
              ? "text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 tracking-normal normal-case" 
              : "text-xs sm:text-base md:text-lg tracking-[0.2em] sm:tracking-[0.3em] uppercase"
          }`}>
            {slides[currentSlide].subtitle}
          </p>
          {slides[currentSlide].showButton && (
            <Link to="/shop">
              <Button 
                variant="default"
                className="uppercase tracking-[0.2em] text-xs px-8 sm:px-12 h-12 sm:h-14 hover:scale-105 transition-transform animate-fade-in"
              >
                Shop Now
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Dots - minimalist style */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/40 w-1.5 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
