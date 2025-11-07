import { Truck, RefreshCw, Shield, Award } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Livraison Gratuite",
    description: "À l'achat de deux articles",
  },
  {
    icon: RefreshCw,
    title: "Retours",
    description: "Retour à vos frais",
  },
  {
    icon: Shield,
    title: "Délai de Livraison",
    description: "3 à 5 jours ouvrables",
  },
  {
    icon: Award,
    title: "Qualité Premium",
    description: "Matériaux d'exception sélectionnés",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                <feature.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs uppercase tracking-widest font-medium mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
