import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Merci pour votre inscription!", {
        description: "Vous recevrez 10% de réduction sur votre première commande.",
      });
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase mb-4">
            Rejoignez Notre Communauté
          </h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Inscrivez-vous à notre newsletter et recevez 10% de réduction sur votre première commande.
            Découvrez en avant-première nos nouvelles collections et offres exclusives.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 border-border focus:border-foreground"
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="h-12 px-8 uppercase tracking-wider text-xs"
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
