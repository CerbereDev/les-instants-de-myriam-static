import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { fetchPortfolio } from "../lib/api";

interface PortfolioItem {
  id: number;
  uri: string;
  image: string;
}

interface PortfolioSectionProps {
  items?: PortfolioItem[]; // Optional, used as fallback if API fails
}

const PortfolioSection = ({ items: propItems = [] }: PortfolioSectionProps) => {
  const [fetchedItems, setFetchedItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    fetchPortfolio(1)
      .then((apiData: { pictures: PortfolioItem[] }) => {
        setFetchedItems(apiData.pictures);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Use fetched items if available, otherwise fallback to props
  console.log('fetchedItems:', fetchedItems);
  const items = fetchedItems.length > 0 ? fetchedItems.map((pic) => (pic)) : propItems;

  if (loading) {
    return (
      <section id="portfolio" className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center">Loading portfolio...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent text-sm tracking-[0.3em] uppercase">Mon Travail</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
            Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Une sélection de moments figés dans le temps, chacun racontant sa propre belle histoire
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`group relative overflow-hidden rounded-lg cursor-pointer ${
                index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className="aspect-square">
                <img
                  src={item.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-serif text-lg md:text-xl text-primary-foreground mt-1"></h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-primary-foreground/70 hover:text-gold transition-colors"
            aria-label="Fermer"
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl max-h-[90vh] animate-scale-in">
            <img
              src={selectedImage.image}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="text-center mt-4">
              <h3 className="font-serif text-2xl text-primary-foreground mt-1"></h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
