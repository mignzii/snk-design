import { Truck, Shield, RotateCcw, Heart } from "lucide-react";

export const ProductBenefitsSection = () => {
  const benefits = [
    {
      icon: Truck,
      title: "Livraison Offerte",
      description: "À l'achat de 3 articles"
    },
    {
      icon: RotateCcw,
      title: "Retours Gratuits",
      description: "Sous 30 jours"
    },
    {
      icon: Shield,
      title: "Paiement Sécurisé",
      description: "Transactions protégées"
    },
    {
      icon: Heart,
      title: "Service Client",
      description: "À votre écoute 7j/7"
    }
  ];

  return (
    <section className="bg-secondary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="text-center space-y-3 animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xs uppercase tracking-widest font-medium">
                {benefit.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
