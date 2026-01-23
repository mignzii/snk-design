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
      question: "Est-ce que la tenue sera à ma taille ?",
      answer: (
        <>
          <p className="mb-3">Toutes nos robes offrent la possibilité de choisir votre taille et de préciser votre longueur, afin d'assurer un ajustement précis et confortable.</p>
          <p className="mb-3">Certaines de nos tenues sont également équipées de ceintures intérieures discrètes, conçues pour mouler la taille à la perfection tout en restant invisibles. Ces ceintures permettent à la robe de s'adapter harmonieusement à chaque silhouette.</p>
          <p>Les modèles dotés de ce système portent une mention « ajustable » au bas de leur fiche produit.</p>
        </>
      )
    },
    {
      question: "Returns & Refunds (Retours et remboursements)",
      answer: (
        <>
          <p className="mb-3">Nous acceptons les retours dans un délai de 10 jours après réception de la commande, aux frais du client.</p>
          <p className="mb-3 font-semibold">Les articles doivent être :</p>
          <ul className="list-disc pl-5 mb-3 space-y-1">
            <li>Non portés, non lavés et sans parfum ajouté.</li>
            <li>Conservés dans leur emballage d'origine (packaging SNK Design).</li>
          </ul>
          <p className="mb-3">Une fois la tenue reçue et vérifiée, un remboursement ou échange sera effectué selon votre choix.</p>
          <p className="font-semibold">Note : Les articles en promotion ou soldés (ex. Black Friday) ne sont pas remboursables, mais peuvent être échangés.</p>
        </>
      )
    },
    {
      question: "Shipping (Livraison)",
      answer: (
        <>
          <p className="mb-3">Les livraisons standards prennent <strong>3 à 5 jours ouvrables</strong> à partir de la date d'expédition.</p>
          <p className="mb-2">Un service express (24 à 48 h) est également disponible dans les régions suivantes :</p>
          <ul className="list-disc pl-5 mb-3 space-y-1">
            <li>Montréal</li>
            <li>Ottawa / Gatineau</li>
            <li>Québec City</li>
          </ul>
          <p className="mb-3">Ce service est offert moyennant 15 $ de frais supplémentaires.</p>
          <p className="font-semibold">La livraison est gratuite dès l'achat de trois articles ou plus.</p>
        </>
      )
    },
    {
      question: "Payments (Paiements)",
      answer: (
        <>
          <p className="mb-3">Nous acceptons les paiements par :</p>
          <ul className="list-disc pl-5 mb-3 space-y-1">
            <li>Carte de crédit (Visa, MasterCard, American Express)</li>
            <li>Apple Pay</li>
            <li>PayPal</li>
          </ul>
          <p>Tous les paiements sont 100 % sécurisés et traités en dollars canadiens (CAD) via des plateformes certifiées.</p>
        </>
      )
    },
    {
      question: "Orders (Commandes)",
      answer: (
        <>
          <p className="mb-3">Une fois votre commande validée, vous recevrez un courriel de confirmation contenant le récapitulatif de votre achat.</p>
          <p className="mb-3">Lorsque votre commande est expédiée, un numéro de suivi vous est envoyé.</p>
          <p className="mb-3">Pour modifier ou annuler une commande, contactez-nous rapidement à <a href="mailto:snkdesign11@gmail.com" className="text-primary hover:underline">snkdesign11@gmail.com</a> avant l'expédition.</p>
          <p className="font-semibold">Après expédition, les modifications ne sont plus possibles.</p>
        </>
      )
    },
    {
      question: "Help with My Order (Aide pour ma commande)",
      answer: (
        <>
          <p className="mb-3">Si vous avez reçu un article incorrect, une mauvaise taille ou un colis endommagé, veuillez :</p>
          <ul className="list-disc pl-5 mb-3 space-y-1">
            <li>Envoyer un courriel à <a href="mailto:snkdesign11@gmail.com" className="text-primary hover:underline">snkdesign11@gmail.com</a></li>
            <li>Indiquer votre numéro de commande</li>
            <li>Joindre, si possible, une photo du problème</li>
          </ul>
          <p>Notre équipe vous répondra dans un délai de 24 à 48 heures ouvrables.</p>
        </>
      )
    },
    {
      question: "Check Gift Card Balance (Solde des cartes-cadeaux)",
      answer: (
        <>
          <p className="mb-3">Vous pouvez vérifier le solde de votre carte-cadeau directement au moment du paiement, en saisissant le code dans la section « Carte cadeau / Code promo ».</p>
          <p className="mb-3">Le montant restant s'affichera automatiquement.</p>
          <p>Les cartes-cadeaux sont valables <strong>5 mois</strong> après la date d'achat et ne sont pas remboursables.</p>
        </>
      )
    },
    {
      question: "Payments & General Questions (Paiements et questions générales)",
      answer: (
        <>
          <p className="mb-3">Tous les paiements sont sécurisés et confidentiels.</p>
          <p className="mb-3">Les codes promo doivent être appliqués avant de valider le paiement.</p>
          <p className="mb-3">Si un article est temporairement en rupture de stock, vous pouvez activer une alerte de retour directement sur sa page.</p>
          <p>Pour toute autre question, contactez-nous à <a href="mailto:snkdesign11@gmail.com" className="text-primary hover:underline">snkdesign11@gmail.com</a>.</p>
        </>
      )
    },
    {
      question: "Get More Information (En savoir plus)",
      answer: (
        <>
          <p className="mb-3">Pour découvrir notre histoire, notre vision et notre démarche créative, consultez la page « À propos ».</p>
          <p>Vous pouvez également suivre nos nouveautés et lancements exclusifs sur Instagram : <a href="https://instagram.com/snk_design1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@snk_design1</a></p>
        </>
      )
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
                  href="mailto:snkdesign11@gmail.com"
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
