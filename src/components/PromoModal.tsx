import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import fashionImage from "@/assets/classy-black-dress-1.jpg";

interface PromoModalProps {
  open: boolean;
  onClose: () => void;
}

export const PromoModal = ({ open, onClose }: PromoModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptsCommunications, setAcceptsCommunications] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Integrate with backend to send promo code via email
      // For now, just show success message
      toast({
        title: "Bienvenue chez SNK Design!",
        description: "Votre code promo SNKDESIGN50 a été envoyé à votre email!",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left side - Image */}
          <div className="hidden md:block bg-muted">
            <img
              src={fashionImage}
              alt="SNK Design Fashion"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Form */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                  Recevez votre code promo exclusif maintenant !
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Inscrivez-vous à notre liste VIP et recevez immédiatement votre code promo par email. Ne manquez pas cette offre exclusive !
                </p>
                <p className="text-xs sm:text-sm text-red-500">
                  * Si vous êtes déjà inscrit, merci de fermer le formulaire !
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">Prénom et Nom</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Miniane Diouf"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Loisbecket@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="communications"
                    checked={acceptsCommunications}
                    onCheckedChange={(checked) => setAcceptsCommunications(checked as boolean)}
                  />
                  <Label
                    htmlFor="communications"
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    J'accepte de recevoir des communications de SNK Design et de bénéficier de mon code promo.
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 sm:h-14 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Recevoir mon code promo"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
