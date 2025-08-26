import { AccessibilitySection } from "@/components/AccessibilitySection";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";

export const Acessibilidade = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-biolente-blue py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recursos de Acessibilidade
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              O Biolente foi desenvolvido seguindo as melhores práticas de acessibilidade web 
              para garantir uma experiência inclusiva para todos os usuários.
            </p>
          </div>
        </div>
      </div>

      {/* Accessibility Content */}
      <AccessibilitySection />
      <AccessibilityPanel />
    </div>
  );
};