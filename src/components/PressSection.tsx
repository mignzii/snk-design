import { ExternalLink } from "lucide-react";

const pressFeatures = [
  {
    publication: "Vogue Paris",
    title: "Les Créateurs à Suivre en 2025",
    excerpt: "Une maison de couture qui réinvente l'élégance moderne avec des pièces intemporelles.",
    date: "Janvier 2025",
  },
  {
    publication: "Elle France",
    title: "Haute Couture: L'Excellence Française",
    excerpt: "Des robes d'exception qui célèbrent la féminité avec raffinement et audace.",
    date: "Décembre 2024",
  },
  {
    publication: "Harper's Bazaar",
    title: "Les Plus Belles Collections Printemps",
    excerpt: "Une attention aux détails et un savoir-faire artisanal qui font toute la différence.",
    date: "Février 2025",
  },
];

export const PressSection = () => {
  return (
    <section className="py-20 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Vu Dans La Presse
          </p>
          <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase">
            Ils Parlent De Nous
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pressFeatures.map((feature, index) => (
            <article key={index} className="group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-medium">
                    {feature.publication}
                  </span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="text-lg font-light leading-tight group-hover:underline transition-all">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{feature.excerpt}"
                </p>
                
                <p className="text-xs text-muted-foreground">{feature.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
