import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import aboutHero from "@/assets/about-hero.jpg";
import logo from "@/assets/logo.jpg";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-amber-500/10 mix-blend-overlay z-10" />
          <img 
            src={aboutHero}
            alt="À propos de SNK-Design"
            className="w-full h-full object-cover brightness-105 contrast-105 saturate-110"
          />
          <div className="absolute inset-0 bg-black/30 z-20" />
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <div className="text-center text-white animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-4">
                Notre Histoire
              </h1>
              <p className="text-sm md:text-base tracking-[0.3em] uppercase">
                Haute Couture Africaine
              </p>
            </div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-12 animate-fade-in">
                <div className="w-24 h-24 md:w-32 md:h-32">
                  <img 
                    src={logo}
                    alt="SNK-Design Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              <div className="text-center space-y-6 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                  SNKDESIGN
                </h2>
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                  Haute Couture Africaine
                </p>
                
                <div className="h-px w-24 bg-primary mx-auto my-8" />
                
                <div className="space-y-6 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  <p className="text-lg">
                    SNK-Design incarne l'excellence de la haute couture africaine, 
                    où chaque création est une œuvre d'art pensée pour célébrer la 
                    beauté et l'élégance de la femme africaine moderne.
                  </p>
                  <p>
                    Fondée sur les valeurs d'authenticité, d'élégance intemporelle et de 
                    fierté culturelle, notre maison s'attache à créer des pièces exceptionnelles 
                    qui transcendent les frontières pour offrir un style résolument unique, 
                    ancré dans l'héritage africain.
                  </p>
                  <p>
                    Notre atelier perpétue les techniques ancestrales de la couture africaine, 
                    tout en intégrant les innovations textiles les plus récentes. Chaque robe 
                    est façonnée avec une attention méticuleuse aux détails, des tissus africains 
                    soigneusement sélectionnés aux finitions parfaites qui racontent une histoire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Nos Valeurs
              </p>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                Ce Qui Nous Définit
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-light tracking-wide">Excellence</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Chaque pièce est conçue avec une exigence sans compromis, 
                  du choix des matières à la finition impeccable.
                </p>
              </div>

              <div className="text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-light tracking-wide">Créativité</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Notre vision artistique fusionne tradition et modernité pour 
                  créer des designs uniques et intemporels.
                </p>
              </div>

              <div className="text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👗</span>
                </div>
                <h3 className="text-xl font-light tracking-wide">Savoir-Faire</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Un héritage artisanal africain transmis de génération en génération, 
                  perpétuant l'art de la haute couture avec authenticité et fierté.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
              Découvrez Nos Collections
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explorez notre univers et laissez-vous séduire par nos créations exclusives
            </p>
            <Button 
              variant="default" 
              className="uppercase tracking-wider text-xs px-8 h-12"
              asChild
            >
              <Link to="/shop">Explorer la Boutique</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
