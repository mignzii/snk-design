import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const AboutSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="aspect-[3/4] bg-secondary/10 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80"
                alt="Notre atelier"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="order-1 md:order-2 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Notre Histoire
              </p>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
                L'Excellence de la Haute Couture
              </h2>
            </div>
            
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Depuis notre création, nous nous consacrons à l'art de la haute couture, 
                créant des pièces exceptionnelles qui célèbrent la féminité et l'élégance 
                intemporelle.
              </p>
              <p>
                Chaque création est le fruit d'un savoir-faire artisanal unique, 
                alliant tradition et modernité. Nous sélectionnons minutieusement 
                les plus beaux tissus pour vous offrir des robes d'exception.
              </p>
              <p>
                Notre atelier perpétue les techniques ancestrales de la couture française, 
                garantissant une qualité irréprochable et un souci du détail qui fait 
                toute la différence.
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="mt-8 uppercase tracking-wider text-xs px-8 h-12"
              asChild
            >
              <Link to="/about">Découvrir Notre Histoire</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
