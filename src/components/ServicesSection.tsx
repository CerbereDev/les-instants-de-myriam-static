import { useState, useEffect } from "react";
import { Camera, Heart, Baby, Building2, Sparkles, Users, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchServices } from "../lib/api";

interface ServicePackage {
  title: string;
  description: string;
  price: string;
  features: string[];
}

interface ServiceCategory {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  startingPrice: string;
  packages: ServicePackage[];
}

interface ApiService {
  name: string;
  description: string;
  serviceCategory: {
    name: string;
    description: string;
  };
  price: number;
  features: string[];
}

const getIconForCategory = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case "mariage":
      return <Heart className="w-6 h-6" />;
    case "portrait":
      return <Users className="w-6 h-6" />;
    case "famille":
      return <Baby className="w-6 h-6" />;
    case "corporate":
      return <Building2 className="w-6 h-6" />;
    case "éditorial":
      return <Sparkles className="w-6 h-6" />;
    default:
      return <Camera className="w-6 h-6" />;
  }
};

const ServicesSection = () => {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchServices()
      .then((apiData: ApiService[]) => {
        if (!apiData || apiData.length === 0) {
          // Use default services if API returns nothing
          
          setLoading(false);
          return;
        }
        // Group services by category
        const categoryMap = new Map<string, { name: string; description: string; services: ApiService[] }>();

        apiData.forEach((service) => {
          const catName = service.serviceCategory.name;
          if (!categoryMap.has(catName)) {
            categoryMap.set(catName, {
              name: catName,
              description: service.serviceCategory.description,
              services: [],
            });
          }
          categoryMap.get(catName)!.services.push(service);
        });

        // Convert to ServiceCategory[]
        const categories: ServiceCategory[] = Array.from(categoryMap.entries()).map(([catName, catData], index) => {
          const minPrice = Math.min(...catData.services.map(s => s.price));
          return {
            id: catName.toLowerCase().replace(/\s+/g, '-'),
            icon: getIconForCategory(catName),
            title: catData.name,
            description: catData.description,
            startingPrice: `À partir de ${minPrice}€`,
            packages: catData.services.map((service) => ({
              title: service.name,
              description: service.description, // No description in API, so empty
              price: `${service.price}€`,
              features: service.features,
            })),
          };
        });

        setServiceCategories(categories);
        setLoading(false);
      })
      .catch(() => {
        // On error, use default services
        setServiceCategories(getDefaultServices());
        setLoading(false);
      });
  }, []);

// Default services based on formules.txt
const getDefaultServices = (): ServiceCategory[] => [
  {
    id: "mariage",
    icon: getIconForCategory("mariage"),
    title: "Mariage",
    description: "Des formules adaptées à chaque moment de votre mariage, pour des souvenirs inoubliables.",
    startingPrice: "À partir de 200€",
    packages: [
      {
        title: "After Day",
        description: "Séance photo extérieure d'environ 1H30. Toutes les photos travaillées en haute qualité remises sur clé USB. Minimum de 60 photos couleurs et noir et blanc.",
        price: "300€",
        features: [
          "Séance intimiste post-mariage",
          "1h30 de prise de vue",
          "Minimum 60 photos",
          "Photos couleurs et N&B",
          "Remise sur clé USB avec packaging"
        ]
      },
      {
        title: "La Nina",
        description: "Photographies de la cérémonie et 3h de présence au vin d'honneur. Minimum de 200 photos couleurs et noir et blanc.",
        price: "600€",
        features: [
          "Cérémonie laïque ou religieuse",
          "3h au vin d'honneur",
          "Portraits invités et mariés",
          "Minimum 200 photos",
          "Remise sur clé USB avec packaging"
        ]
      },
      {
        title: "La Myna",
        description: "Des préparatifs jusqu'à la fin du vin d'honneur (18h). Minimum de 350 photos couleurs et noir et blanc.",
        price: "800€",
        features: [
          "Des préparatifs à 18h",
          "Portraits, groupes, ambiance",
          "Minimum 350 photos",
          "Remise sur clé USB avec packaging"
        ]
      },
      {
        title: "La Ultima",
        description: "Formule complète : des préparatifs à l'ouverture de bal ou jusqu'au dessert. Minimum de 400 photos couleurs et noir et blanc.",
        price: "900€",
        features: [
          "Des préparatifs à la soirée",
          "Jusqu'à l'ouverture de bal, repas ou dessert",
          "Minimum 400 photos",
          "1100€ ( jusqu'au repas )",
          "1300€ ( jusqu'au dessert )",
          "Remise sur clé USB avec packaging",
          "Supplément 60€/demi-heure après 3h30 du matin",
          "Frais kilométriques au-delà de 20km",
        ]
      }
    ]
  },
  {
    id: "video",
    icon: getIconForCategory("corporate"),
    title: "Vidéo Mariage",
    description: "Des vidéos pour immortaliser votre mariage, du teaser au film complet.",
    startingPrice: "À partir de 500€",
    packages: [
      {
        title: "Vidéo Film",
        description: "Montage vidéo longue (30 à 80 min) des grands moments du mariage.",
        price: "850€",
        features: [
          "Vidéo stabilisée HD",
          "Montage studio 3 jours",
          "30 à 80 minutes de film"
        ]
      },
      {
        title: "Vidéo Clip Teaser",
        description: "Teaser vidéo de 5 à 10 minutes des moments forts du mariage.",
        price: "500€",
        features: [
          "Vidéo stabilisée HD",
          "Montage studio 1 jour",
          "5 à 10 minutes de teaser"
        ]
      }
    ]
  },
  {
    id: "famille",
    icon: getIconForCategory("famille"),
    title: "Famille & Maternité",
    description: "Des séances pour immortaliser les moments précieux en famille ou pendant la grossesse.",
    startingPrice: "À partir de 300€",
    packages: [
      {
        title: "Mommy love",
        description: "Séance photo extérieure d'environ 2h. Minimum de 60 photos couleurs et noir et blanc.",
        price: "300€",
        features: [
          "Séance future maman",
          "2h de prise de vue",
          "Minimum 60 photos",
          "Photos couleurs et N&B",
          "Remise sur clé USB avec packaging"
        ]
      }
    ]
  }
];

  // if (loading) {
  //   return (
  //     <section id="services" className="section-padding bg-secondary">
  //       <div className="container-wide">
  //         <div className="text-center">Loading services...</div>
  //       </div>
  //     </section>
  //   );
  // }

  // if (error) {
  //   return (
  //     <section id="services" className="section-padding bg-secondary">
  //       <div className="container-wide">
  //         <div className="text-center">Error loading services. Please try again later.</div>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section id="services" className="section-padding bg-secondary">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent text-sm tracking-[0.3em] uppercase">Mes Prestations</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
            Services & Tarifs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Chaque séance est réalisée avec soin, pour que vos souvenirs soient préservés magnifiquement pour les générations à venir
          </p>
        </div>

        {/* Services Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {serviceCategories.map((category) => (
              <AccordionItem
                key={category.id}
                value={category.id}
                className="bg-background rounded-xl border-none shadow-soft overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-6 hover:no-underline hover:bg-accent/5 transition-colors data-[state=open]:bg-accent/5">
                  <div className="flex items-center gap-4 text-left w-full">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      {category.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 hidden sm:block">
                      <span className="text-accent font-serif text-lg font-medium">
                        {category.startingPrice}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  {/* Mobile price display */}
                  <div className="sm:hidden mb-4 pt-2">
                    <span className="text-accent font-serif text-lg font-medium">
                      {category.startingPrice}
                    </span>
                  </div>
                  
                  {/* Packages Grid */}
                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    {category.packages.map((pkg, index) => (
                      <div
                        key={pkg.title}
                        className="bg-secondary/50 rounded-lg p-5 hover:bg-secondary transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-serif text-lg text-foreground font-medium">
                              {pkg.title}
                            </h4>
                            <p className="text-muted-foreground text-sm mt-1">
                              {pkg.description}
                            </p>
                          </div>
                          <span className="text-accent font-serif font-medium text-lg whitespace-nowrap ml-4">
                            {pkg.price}
                          </span>
                        </div>
                        <ul className="space-y-2 mt-4">
                          {pkg.features.map((feature) => (
                            <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                              <Check className="w-4 h-4 text-accent flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#contact"
                          className="inline-block mt-4 text-sm text-accent hover:text-accent/80 font-medium transition-colors"
                        >
                          Demander un devis →
                        </a>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-medium text-sm tracking-wide uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            Réserver votre séance
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
