import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MusicSection from "@/components/MusicSection";
import MixSection from "@/components/MixSection";
import GallerySection from "@/components/GallerySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MusicSection />
      <MixSection />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default Index;
