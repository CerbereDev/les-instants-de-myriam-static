import { Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-primary text-primary-foreground">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto">
          <span className="text-gold-light text-sm tracking-[0.3em] uppercase">Contact</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
            Créons ensemble
            <br />
            <span className="italic text-gold-light">quelque chose de beau</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-lg">
            Prête à capturer vos moments spéciaux ? Je serais ravie d'entendre votre projet. Contactez-moi et commençons à planifier votre séance idéale.
          </p>

          {/* Contact Info */}
          <div className="space-y-6 mb-10">
            <a
              href="mailto:contact@lesinstantsdemyriam.fr"
              className="flex items-center gap-4 text-primary-foreground/80 hover:text-gold transition-colors group"
            >
              <span className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Mail size={20} />
              </span>
              <span>contact@lesinstantsdemyriam.fr</span>
            </a>
            <a
              href="tel:+33612345678"
              className="flex items-center gap-4 text-primary-foreground/80 hover:text-gold transition-colors group"
            >
              <span className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Phone size={20} />
              </span>
              <span>+33 6 12 34 56 78</span>
            </a>
            <div className="flex items-center gap-4 text-primary-foreground/80">
              <span className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <MapPin size={20} />
              </span>
              <span>France</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/80 hover:bg-gold hover:text-charcoal transition-all"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/80 hover:bg-gold hover:text-charcoal transition-all"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
