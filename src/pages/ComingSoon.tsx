import { useState, useEffect } from "react";
import logo from "@/assets/logo.jpg";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";

const slides = [lookbook1, lookbook2, lookbook3];

const ComingSoon = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Background slideshow */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1500"
          style={{ opacity: i === currentSlide ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />

      {/* Subtle horizontal line decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center text-white max-w-2xl mx-auto">

        {/* Logo */}
        <div className="mb-10 animate-fade-in">
          <img
            src={logo}
            alt="SNK Design"
            className="w-20 h-20 rounded-full object-cover mx-auto border border-white/20"
          />
        </div>

        {/* Brand name */}
        <p className="text-xs tracking-[0.4em] uppercase text-white/60 mb-4 animate-fade-in">
          SNK Design
        </p>

        {/* Main heading */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.12em] uppercase mb-6 animate-fade-in leading-tight"
          style={{ fontFamily: "serif" }}
        >
          Nous revenons<br />
          <span className="text-white/70 text-3xl sm:text-4xl md:text-5xl tracking-[0.2em]">très bientôt</span>
        </h1>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <div className="h-px w-16 bg-white/30" />
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Site en maintenance</span>
          <div className="h-px w-16 bg-white/30" />
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm sm:text-base leading-relaxed tracking-wide mb-4 max-w-md animate-fade-in">
          Notre site est momentanément en maintenance — mais <span className="text-white font-medium">nous, on ne s'arrête jamais.</span>
        </p>
        <p className="text-white/55 text-sm leading-relaxed tracking-wide mb-10 max-w-md animate-fade-in">
          Chaque pièce SNK Design est pensée pour vous. Envie d'une création sur mesure, d'un coup de cœur ou d'un conseil stylistique ? <span className="text-white/80">Glissez-nous un message en DM sur Instagram</span> — notre équipe vous répond personnellement et prend votre commande directement.
        </p>

        {/* CTA Instagram */}
        <a
          href="https://instagram.com/snk.design_"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-white text-black px-10 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-white/90 transition-all animate-fade-in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
          Commander via Instagram
        </a>

        <p className="text-white/30 text-xs tracking-[0.2em] mt-5 animate-fade-in">
          @snk.design_
        </p>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1 rounded-full transition-all ${
              i === currentSlide ? "bg-white w-8" : "bg-white/30 w-1.5 hover:bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ComingSoon;
