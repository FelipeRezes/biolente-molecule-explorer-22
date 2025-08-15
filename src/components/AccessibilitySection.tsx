import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Keyboard, 
  Eye, 
  Volume2, 
  Type, 
  Image as ImageIcon, 
  MousePointer,
  Accessibility,
  Settings
} from "lucide-react";
import { useState } from "react";

export const AccessibilitySection = () => {
  const [fontSize, setFontSize] = useState(100);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const adjustFontSize = (increase: boolean) => {
    const newSize = increase ? Math.min(fontSize + 10, 150) : Math.max(fontSize - 10, 80);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    if (!isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const accessibilityFeatures = [
    {
      icon: Keyboard,
      title: "Navegação por Teclado",
      description: "Navegue pelo site usando apenas o teclado",
      details: "Use TAB para navegar entre elementos. O primeiro elemento focado é sempre o botão de alto contraste."
    },
    {
      icon: Eye,
      title: "Alto Contraste",
      description: "Modo de alto contraste para usuários com baixa visão",
      details: "Ative o alto contraste para melhorar a legibilidade e facilitar a navegação."
    },
    {
      icon: Volume2,
      title: "Compatível com Leitores de Tela",
      description: "Totalmente compatível com tecnologias assistivas",
      details: "Todos os elementos possuem labels apropriados e estrutura semântica correta."
    },
    {
      icon: Type,
      title: "Ajuste de Fonte",
      description: "Aumente ou diminua o tamanho da fonte",
      details: "Use os controles de acessibilidade para ajustar o tamanho do texto conforme sua necessidade."
    },
    {
      icon: ImageIcon,
      title: "Texto Alternativo",
      description: "Todas as imagens possuem descrição alternativa",
      details: "Imagens científicas e ilustrações incluem descrições detalhadas para leitores de tela."
    },
    {
      icon: MousePointer,
      title: "Navegação Intuitiva",
      description: "Interface clara e consistente",
      details: "Design focado na usabilidade com elementos bem organizados e previsíveis."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-biolente-green/20 rounded-full flex items-center justify-center">
              <Accessibility className="w-8 h-8 text-biolente-green-dark" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Acessibilidade Total
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            O Biolente foi desenvolvido seguindo as melhores práticas de acessibilidade web, 
            garantindo que todos os usuários possam explorar moléculas sem barreiras.
          </p>
        </div>

        {/* Accessibility Controls */}
        <div className="bg-card rounded-lg border p-6 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Controles de Acessibilidade</h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              {/* Font Size Controls */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Tamanho da Fonte:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustFontSize(false)}
                  disabled={fontSize <= 80}
                  aria-label="Diminuir tamanho da fonte"
                >
                  A-
                </Button>
                <Badge variant="secondary">{fontSize}%</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustFontSize(true)}
                  disabled={fontSize >= 150}
                  aria-label="Aumentar tamanho da fonte"
                >
                  A+
                </Button>
              </div>
              
              {/* High Contrast Toggle */}
              <Button
                variant={isHighContrast ? "default" : "outline"}
                onClick={toggleHighContrast}
                className="flex items-center space-x-2"
                aria-label={isHighContrast ? "Desativar alto contraste" : "Ativar alto contraste"}
              >
                <Eye className="w-4 h-4" />
                <span>{isHighContrast ? "Desativar" : "Ativar"} Alto Contraste</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessibilityFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-bold text-foreground">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Accessibility Standards */}
        <div className="mt-16 bg-muted/50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Padrões de Acessibilidade
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              O Biolente segue as diretrizes WCAG 2.1 AA, garantindo compatibilidade 
              com tecnologias assistivas e uma experiência inclusiva para todos os usuários.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                WCAG 2.1 AA Compliant
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                Navegação por Teclado
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                Leitor de Tela
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                Alto Contraste
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};