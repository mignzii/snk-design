import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const reviews = [
  {
    name: "Sophie Martin",
    rating: 5,
    comment: "Qualité exceptionnelle, la robe est magnifique et la coupe parfaite. Service client irréprochable.",
    date: "Il y a 2 jours",
  },
  {
    name: "Léa Dubois",
    rating: 5,
    comment: "J'ai reçu tellement de compliments lors de mon événement. Le tissu est luxueux et confortable.",
    date: "Il y a 1 semaine",
  },
  {
    name: "Emma Bernard",
    rating: 5,
    comment: "Livraison rapide et soignée. La robe correspond exactement aux photos. Je recommande vivement!",
    date: "Il y a 2 semaines",
  },
];

export const SocialProofSection = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase mb-4">
            Ce Que Disent Nos Clientes
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-foreground text-foreground" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">4.9/5 basé sur 2,847 avis</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6 border-none shadow-sm bg-background">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4">{review.comment}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{review.name}</span>
                <span>{review.date}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
