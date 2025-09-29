import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { AccessibilitySection } from "@/components/AccessibilitySection";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main role="main">
        <HeroSection />
        <HowItWorksSection />
        <AccessibilitySection />
      </main>
      <Footer />
      <AccessibilityPanel />
    </div>
  );
};

export default Index;
