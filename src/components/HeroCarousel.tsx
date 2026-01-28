import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { fetchHeroBanner } from "../lib/api";

interface HeroCarouselProps {
  images?: string[]; // Optional, used as fallback if API fails
}

interface ApiHeroData {
  pictures: { uri: string }[];
}

const HeroCarousel = ({ images: propImages = [] }: HeroCarouselProps) => {
  const [fetchedImages, setFetchedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   fetchHeroBanner(1)
  //     .then((data: ApiHeroData) => {
  //       const uris = data.pictures.map((p) => (`http://localhost:3333${p.uri}`));
  //       setFetchedImages(uris);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setError(true);
  //       setLoading(false);
  //     });
  // }, []);

  // Use fetched images if available, otherwise fallback to props
  const images = fetchedImages.length > 0 ? fetchedImages : propImages;

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  // if (loading && images.length === 0) {
  //   return (
  //     <section className="relative h-screen w-full overflow-hidden bg-charcoal flex items-center justify-center">
  //       <div className="text-primary-foreground">Loading hero banner...</div>
  //     </section>
  //   );
  // }

  // if (error && images.length === 0) {
  //   return (
  //     <section className="relative h-screen w-full overflow-hidden bg-charcoal flex items-center justify-center">
  //       <div className="text-primary-foreground">Error loading hero banner.</div>
  //     </section>
  //   );
  // }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <img
            src={image}
            alt={`Photography showcase ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <span className="text-gold-light text-sm md:text-base tracking-[0.3em] uppercase mb-4 animate-fade-up opacity-0 delay-200">
          Photographe Professionnelle
        </span>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-primary-foreground font-medium leading-tight mb-6 animate-fade-up opacity-0 delay-300">
          Capturer vos
          <br />
          <span className="italic text-gold-light">Instants Précieux</span>
        </h1>
        <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mb-10 animate-fade-up opacity-0 delay-400">
          Une photographie intemporelle qui raconte votre histoire unique avec élégance et sensibilité
        </p>

        {/* Carousel Indicators */}
        <div className="flex gap-3 mb-12 animate-fade-up opacity-0 delay-500">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-8 bg-gold"
                  : "w-4 bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/70 hover:text-gold transition-colors animate-bounce"
        aria-label="Scroll to services"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroCarousel;
