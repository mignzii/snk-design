import { useState, useEffect } from "react";
import logo from "@/assets/logo.jpg";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";

const slides = [lookbook1, lookbook2, lookbook3];

const ComingSoon = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

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
          Bientôt<br />
          <span className="text-white/70 text-3xl sm:text-4xl md:text-5xl tracking-[0.2em]">disponible</span>
        </h1>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <div className="h-px w-16 bg-white/30" />
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase">En construction</span>
          <div className="h-px w-16 bg-white/30" />
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm sm:text-base leading-relaxed tracking-wide mb-10 max-w-md animate-fade-in">
          Notre boutique est en cours de création. Nous préparons quelque chose d'élégant pour vous. Laissez-nous votre e-mail pour être informé(e) en avant-première.
        </p>

        {/* Email form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md animate-fade-in"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              className="flex-1 bg-white/10 border border-white/25 text-white placeholder-white/40 px-5 py-3 text-sm tracking-wide focus:outline-none focus:border-white/60 transition-colors backdrop-blur-sm"
            />
            <button
              type="submit"
              className="bg-white text-black px-8 py-3 text-xs tracking-[0.25em] uppercase font-medium hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              Me notifier
            </button>
          </form>
        ) : (
          <div className="animate-fade-in border border-white/20 px-8 py-4 backdrop-blur-sm bg-white/5">
            <p className="text-white/80 text-sm tracking-[0.15em] uppercase">
              Merci — nous vous écrirons bientôt.
            </p>
          </div>
        )}

        {/* Social links */}
        <div className="flex gap-6 mt-12 animate-fade-in">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors"
          >
            Instagram
          </a>
          <span className="text-white/20">·</span>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors"
          >
            Facebook
          </a>
        </div>
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
