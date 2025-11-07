import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "Quelle est la politique de retour ?",
      answer: "Nous acceptons les retours dans les 14 jours suivant la réception de votre commande. Les articles doivent être non portés, avec leurs étiquettes d'origine. Pour initier un retour, veuillez nous contacter à contact@snkdesign.com avec votre numéro de commande."
    },
    {
      question: "Comment choisir la bonne taille ?",
      answer: "Nous vous recommandons de consulter notre guide des tailles disponible sur chaque page produit. Si vous êtes entre deux tailles, nous conseillons de choisir la taille supérieure. Pour des mesures personnalisées ou des questions spécifiques, n'hésitez pas à nous contacter."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Les délais de livraison varient selon votre localisation. En général, comptez 3-5 jours ouvrables pour la France métropolitaine, 7-10 jours pour l'Europe, et 10-15 jours pour le reste du monde. Vous recevrez un numéro de suivi dès l'expédition de votre commande."
    },
    {
      question: "Quels modes de paiement sont acceptés ?",
      answer: "Nous acceptons les cartes de crédit (Visa, Mastercard, American Express), PayPal, et les virements bancaires. Tous les paiements sont sécurisés et cryptés pour garantir la protection de vos informations."
    },
    {
      question: "Puis-je commander une création sur mesure ?",
      answer: "Absolument ! Nous proposons un service de création sur mesure pour des pièces uniques adaptées à vos mensurations et préférences. Contactez-nous pour discuter de votre projet et recevoir un devis personnalisé."
    },
    {
      question: "Comment entretenir mes vêtements SNK-Design ?",
      answer: "Nos créations étant confectionnées avec des tissus africains délicats, nous recommandons un nettoyage à sec pour préserver leur qualité. Si vous préférez laver à la main, utilisez de l'eau froide et un détergent doux, puis séchez à plat à l'ombre."
    },
    {
      question: "Proposez-vous la livraison internationale ?",
      answer: "Oui, nous expédions dans le monde entier ! Les frais de livraison sont calculés automatiquement lors du passage de commande en fonction de votre destination. La livraison est gratuite pour toute commande supérieure à 100€ en France."
    },
    {
      question: "Comment puis-je suivre ma commande ?",
      answer: "Une fois votre commande expédiée, vous recevrez un email avec un numéro de suivi. Vous pourrez suivre l'acheminement de votre colis en temps réel via le lien fourni dans l'email de confirmation d'expédition."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Aide & Support
              </p>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-6">
                Foire Aux Questions
              </h1>
              <p className="text-muted-foreground">
                Trouvez rapidement les réponses à vos questions les plus fréquentes
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border rounded-lg px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="font-medium pr-4">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Contact Section */}
              <div className="mt-16 text-center p-8 bg-secondary/5 rounded-lg">
                <h3 className="text-xl font-light tracking-wide mb-4">
                  Vous ne trouvez pas votre réponse ?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.
                </p>
                <a 
                  href="mailto:contact@snkdesign.com"
                  className="inline-block px-8 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors tracking-[0.2em] text-xs uppercase rounded-sm"
                >
                  Nous Contacter
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
