import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Hero images
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";

// About images
import aboutMain from "@/assets/aboutme-1.jpg";
import aboutWorking1 from "@/assets/about-working-1.jpg";
import aboutWorking2 from "@/assets/about-working-2.jpg";

// Portfolio images
import portfolio3 from "@/assets/portfolio_3.png";
import portfolio4 from "@/assets/portfolio_4.png";
import portfolio5 from "@/assets/portfolio_5.jpg";
import portfolio6 from "@/assets/portfolio_6.jpg";
import portfolio7 from "@/assets/portfolio_7.jpg";
import portfolio8 from "@/assets/portfolio_8.jpg";
import portfolio10 from "@/assets/portfolio_10.jpg";
import portfolio11 from "@/assets/portfolio_11.jpg";
import portfolio12 from "@/assets/portfolio_12.jpg";


const heroImages = [hero1, hero2, hero3, hero4];

const portfolioItems = [
  { id: 1, image: portfolio3, title: "Promesses Éternelles", category: "Mariage" },
  { id: 2, image: portfolio4, title: "Excellence Corporate", category: "Mariage" },
  { id: 3, image: portfolio5, title: "Nouveaux Départs", category: "Mariage" },
  { id: 4, image: portfolio6, title: "Élégance Dorée", category: "Éditorial" },
  { id: 5, image: portfolio7, title: "Première Danse", category: "Mariage" },
  { id: 6, image: portfolio8, title: "Lumière Dorée", category: "Mariage" },
  { id: 7, image: portfolio10, title: "Joie Automnale", category: "Mariage" },
  { id: 8, image: portfolio11, title: "Rêves en Mouvement", category: "Mariage" },
  { id: 9, image: portfolio12, title: "Amour sous les Étoiles", category: "Mariage" },
];

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroCarousel images={heroImages} />
      <ServicesSection />
      <PortfolioSection items={portfolioItems} />
      <AboutSection 
        mainImage={aboutMain} 
        workingImages={[aboutWorking1, aboutWorking2]} 
      />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
