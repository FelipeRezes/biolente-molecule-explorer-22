import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Type, Settings, X } from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useState } from "react";

export const AccessibilityPanel = () => {
  const { fontSize, isHighContrast, adjustFontSize, toggleHighContrast } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Accessibility Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg"
        size="icon"
        aria-label="Abrir controles de acessibilidade"
      >
        <Settings className="w-6 h-6" />
      </Button>

      {/* Accessibility Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Acessibilidade</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar controles de acessibilidade"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Font Size Controls */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Type className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Tamanho da Fonte</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => adjustFontSize(false)}
                    disabled={fontSize <= 80}
                    aria-label="Diminuir tamanho da fonte"
                  >
                    A-
                  </Button>
                  <Badge variant="secondary" className="min-w-16 text-center">
                    {fontSize}%
                  </Badge>
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
              </div>
              
              {/* High Contrast Toggle */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Contraste</span>
                </div>
                <Button
                  variant={isHighContrast ? "default" : "outline"}
                  onClick={toggleHighContrast}
                  className="w-full flex items-center justify-center space-x-2"
                  aria-label={isHighContrast ? "Desativar alto contraste" : "Ativar alto contraste"}
                >
                  <Eye className="w-4 h-4" />
                  <span>{isHighContrast ? "Desativar" : "Ativar"} Alto Contraste</span>
                </Button>
              </div>

              {/* Info */}
              <div className="text-xs text-muted-foreground pt-2 border-t">
                Use TAB para navegar e ENTER para ativar elementos.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};