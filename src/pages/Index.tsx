import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      {/* MusicSection (Task 6) */}
      {/* GallerySection (Task 7) */}
      <Footer />
    </div>
  );
};

export default Index;
