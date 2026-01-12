import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create mailto link as fallback
    const mailtoLink = `mailto:snkdesign11@gmail.com?subject=${encodeURIComponent(
      formData.subject || "Message depuis le site"
    )}&body=${encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;

    toast.success("Redirection vers votre client email...", {
      description: "Votre message sera envoyé via votre application email.",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Contactez-nous
              </p>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-6">
                Nous Sommes À Votre Écoute
              </h1>
              <p className="text-muted-foreground">
                Une question, une demande spéciale ou simplement envie de nous
                dire bonjour ? N'hésitez pas à nous contacter.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-10">
                <div>
                  <h2 className="text-2xl font-light tracking-wide mb-6">
                    Informations de Contact
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Notre équipe est disponible pour répondre à toutes vos
                    questions du lundi au vendredi, de 9h à 18h.
                  </p>
                </div>

                <div className="space-y-6">
                  <a
                    href="mailto:snkdesign11@gmail.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium group-hover:text-primary transition-colors">
                        snkdesign11@gmail.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Localisation</p>
                      <p className="font-medium">Montréal, Canada</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-light tracking-wide mb-4">
                    Suivez-nous
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com/snk_design1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="p-6 bg-secondary/30 rounded-lg">
                  <h3 className="text-lg font-light tracking-wide mb-4">
                    Heures d'Ouverture
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lundi - Vendredi</span>
                      <span>9h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Samedi</span>
                      <span>10h00 - 16h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimanche</span>
                      <span>Fermé</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card border rounded-lg p-8 md:p-10">
                <h2 className="text-2xl font-light tracking-wide mb-6">
                  Envoyez-nous un Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="De quoi souhaitez-vous nous parler ?"
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Votre message..."
                      rows={6}
                      required
                      className="bg-background resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 tracking-[0.2em] text-xs uppercase"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Nous vous répondrons dans un délai de 24 à 48 heures ouvrables.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
