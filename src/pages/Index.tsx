import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { AccessibilitySection } from "@/components/AccessibilitySection";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { Footer } from "@/components/Footer";
import { Explorar } from "./Explorar";
import { Visualizar } from "./Visualizar";
import { Contribuir } from "./Contribuir";
import { Contato } from "./Contato";
import { Acessibilidade } from "./Acessibilidade";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  if (currentPage === "explorar") {
    return (
      <>
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <Explorar />
        <Footer />
      </>
    );
  }

  if (currentPage === "visualizar") {
    return (
      <>
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <Visualizar />
        <Footer />
      </>
    );
  }

  if (currentPage === "contribua") {
    return (
      <>
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <Contribuir />
        <Footer />
      </>
    );
  }

  if (currentPage === "contato") {
    return (
      <>
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <Contato />
        <Footer />
      </>
    );
  }

  if (currentPage === "importar") {
    return (
      <>
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <div className="min-h-screen">
          <iframe 
            src="/importar" 
            className="w-full h-screen border-0"
            title="Importar Molécula"
          />
        </div>
        <Footer />
      </>
    );
  }

  if (currentPage === "acessibilidade") {
    return (
      <>
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <Acessibilidade />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
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
