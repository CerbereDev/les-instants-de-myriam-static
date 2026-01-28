import { useState, useEffect } from "react";
import { Award, Camera, Heart, Users } from "lucide-react";
import { fetchAboutMe } from "../lib/api";
import aboutme1 from "@/assets/aboutme-1.jpg";
import aboutme2 from "@/assets/aboutme-2.jpg";
import aboutworking1 from "@/assets/about-working-1.jpg";
import aboutworking2 from "@/assets/about-working-2.jpg";

interface AboutSectionProps {
  mainImage?: string; // Optional, used as fallback if API fails
  workingImages?: string[]; // Optional, used as fallback if API fails
}

interface ApiData {
  title: string;
  biography: string;
  pictures: {uri: string}[];
}

const stats = [
  { icon: <Camera className="w-5 h-5" />, value: "10+", label: "Années d'expérience" },
  { icon: <Users className="w-5 h-5" />, value: "500+", label: "Clients satisfaits" },
  { icon: <Heart className="w-5 h-5" />, value: "200+", label: "Mariages capturés" },
  { icon: <Award className="w-5 h-5" />, value: "15+", label: "Prix remportés" },
];

const AboutSection = ({ mainImage, workingImages }: AboutSectionProps) => {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   fetchAboutMe(1)
  //     .then((apiData: ApiData) => {
  //       setData(apiData);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setError(true);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return (
  //     <section id="about" className="section-padding bg-secondary">
  //       <div className="container-wide">
  //         <div className="text-center">Loading...</div>
  //       </div>
  //     </section>
  //   );
  // }

  // Fallback to props or hardcoded if API fails
  const finalMainImage = data?.pictures?.[0]?.uri || mainImage || aboutme1; // Add a fallback image path if needed
  const finalWorkingImages = data?.pictures ? [data.pictures[1]?.uri, data.pictures[2]?.uri] : workingImages || [aboutworking1, aboutworking2];
  const finalTitle = data?.title || "L'histoire derrière l'objectif";
  const finalBiography = data?.biography || `Derrière mon appareil, il y a Myriam, une femme qui croit profondément que l’amour se lit dans les détails : une main serrée un peu trop fort, une respiration qui tremble, un sourire qui se cache, une lumière qui effleure une peau...

J’ai commencé la photo en 2008, lors de mes études en arts appliqués et en communication visuelle. À l’époque, je ne savais pas encore que j’étais en train d’apprendre bien plus que des techniques ! J’apprenais à sentir, ressentir, observer et à écouter les émotions. Depuis, je n’ai jamais arrêté. Parce que je suis faite pour ça !

Aujourd’hui, je me consacre entièrement aux mariages, aux fiançailles, aux événements d’amour, aux EVJF  à tout ce qui raconte une histoire qui bat un peu plus fort que le reste.

Ce qui me touche le plus ?
Ces moments que personne ne voit, mais que je vois.
La mariée qui inspire profondément avant d’entrer dans l’allée.
Les regards qui se disent “on y est” sans jamais prononcer un mot.

Mon style est bohème, doux, chaleureux et sincère.
Je photographie ce qui est vrai : les émotions brutes, les gestes qui ne se répètent pas, les instants imparfaits qui deviennent les plus beaux souvenirs.

Grâce à mon regard et à des retouches délicates, je sublime vos images sans les dénaturer. Je veux que vous vous reconnaissiez, que vous vous ressentiez, que vous vous reviviez.

Je ne vous demande pas de poser (sauf si vous le souhaitez)
Je vous invite surtout à vivre.

Et moi, je suis là.
Juste là.
Pour capturer ce qui, demain, sera votre plus beau souvenir.

Prenons rendez-vous et racontez-moi ?

Devis GRATUIT, pour parler de vos projets.`;

  return (
    <section id="about" className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={finalMainImage}
                alt="Portrait de la photographe"
                className="w-full max-w-md mx-auto rounded-lg shadow-medium"
              />
            </div>
            {/* Decorative images */}
            <div className="absolute -bottom-8 -left-4 md:-left-8 w-32 md:w-48 rounded-lg overflow-hidden shadow-soft z-20">
              <img
                src={finalWorkingImages[0]}
                alt="En coulisses"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 md:-right-8 w-28 md:w-40 rounded-lg overflow-hidden shadow-soft z-0">
              <img
                src={finalWorkingImages[1]}
                alt="Équipement photo"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            {/* Accent decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-accent/20 rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div>
            <span className="text-accent text-sm tracking-[0.3em] uppercase">À Propos</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-4 mb-6">
              {finalTitle.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  {index < finalTitle.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
              {finalBiography.split("\n").map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-accent mb-2">
                    {stat.icon}
                    <span className="font-serif text-3xl text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
