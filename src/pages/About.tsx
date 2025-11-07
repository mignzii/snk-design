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
                  L'histoire de SNK DESIGN
                </h2>
                
                <div className="h-px w-24 bg-primary mx-auto my-8" />
                
                <div className="space-y-6 text-muted-foreground leading-relaxed max-w-3xl mx-auto text-left">
                  <p className="text-lg">
                    SNK DESIGN est bien plus qu'une marque de vêtements. C'est l'histoire d'une famille de créateurs déterminés, portée par la passion, la créativité et la volonté de s'affirmer dans un nouveau pays.
                  </p>
                  
                  <p>
                    Il y a quelques années, un frère passionné par la mode masculine a lancé la marque au Sénégal. Rapidement, sa sœur a ajouté une touche féminine, donnant naissance à des collections uniques pour femmes, alliant modernité et élégance. Ce mélange de visions a été le point de départ d'une aventure extraordinaire : créer des vêtements qui racontent une histoire, reflètent une identité et célèbrent la diversité.
                  </p>
                  
                  <p>
                    Il y a trois ans, la famille a quitté le Sénégal pour s'installer au Canada, apportant avec elle son savoir-faire, ses rêves et son énergie créative. L'immigration a été un défi, mais aussi une source d'inspiration : chaque vêtement SNK DESIGN porte en lui l'audace et la détermination nécessaires pour réussir dans un nouveau pays, tout en restant fidèle à ses racines.
                  </p>
                  
                  <p className="font-semibold text-foreground">
                    Aujourd'hui, SNK DESIGN est portée par une famille unie et complémentaire :
                  </p>
                  
                  <ul className="space-y-3 pl-6">
                    <li className="list-disc">
                      <strong className="text-foreground">La maman</strong> supervise le choix des tissus et les ateliers de confection au Canada et au Sénégal, veillant à ce que chaque pièce soit réalisée avec soin et précision.
                    </li>
                    <li className="list-disc">
                      <strong className="text-foreground">L'une des sœurs</strong> est la designer principale, dessinant chaque modèle pour créer des vêtements uniques, modernes et audacieux.
                    </li>
                    <li className="list-disc">
                      <strong className="text-foreground">L'autre sœur</strong> gère le marketing, les ventes et l'administration, s'assurant que la marque touche et inspire ses clientes.
                    </li>
                    <li className="list-disc">
                      <strong className="text-foreground">Le frère</strong>, expert-comptable, garantit la solidité financière de l'entreprise.
                    </li>
                  </ul>
                  
                  <p>
                    Chaque création SNK DESIGN est une célébration du métissage culturel, de l'originalité et de la modernité. Nos robes et vêtements uniques reflètent notre héritage afro et notre vision contemporaine, tout en s'adaptant à toutes les silhouettes et à tous les styles.
                  </p>
                  
                  <p className="text-lg font-medium text-foreground">
                    SNK DESIGN, c'est l'histoire d'une famille d'immigrants qui a osé rêver grand, qui transforme chaque défi en opportunité, et qui crée des vêtements authentiques, élégants et inspirants, pour toutes les femmes qui veulent se sentir confiantes et uniques.
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
