import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Palette, Eye, Contrast } from "lucide-react";
import { useMoleculeColorPalettes, ColorPalette } from "@/hooks/useMoleculeColorPalettes";

export const MoleculeColorControls = () => {
  const {
    activePalette,
    isHighContrast,
    monochromaticBase,
    changePalette,
    toggleHighContrast,
    changeMonochromaticBase,
    getCurrentScheme,
    paletteLabels
  } = useMoleculeColorPalettes();

  const currentScheme = getCurrentScheme();
  const monochromaticColors = ['#0072B2', '#E69F00', '#009E73', '#CC79A7', '#D55E00', '#56B4E9'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="w-5 h-5" />
          <span>Paletas de Cores</span>
        </CardTitle>
        <CardDescription>
          Configure as cores da visualização e acessibilidade
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Alto Contraste */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Contrast className="w-4 h-4" />
            <Label htmlFor="high-contrast" className="font-medium">
              Modo Alto Contraste
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="high-contrast"
              checked={isHighContrast}
              onCheckedChange={toggleHighContrast}
            />
            <Label htmlFor="high-contrast" className="text-sm text-muted-foreground">
              {isHighContrast ? 'Ativado' : 'Desativado'}
            </Label>
          </div>
          {isHighContrast && (
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">
                Fundo preto com cores vibrantes e acessíveis para melhor visibilidade
              </p>
            </div>
          )}
        </div>

        {/* Seletor de Paletas */}
        {!isHighContrast && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <Label className="font-medium">Paleta de Cores</Label>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(paletteLabels) as ColorPalette[]).map((palette) => (
                <Button
                  key={palette}
                  variant={activePalette === palette ? "default" : "outline"}
                  size="sm"
                  onClick={() => changePalette(palette)}
                  className="text-xs"
                >
                  {paletteLabels[palette]}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Base Monocromática */}
        {!isHighContrast && activePalette === 'monochromatic' && (
          <div className="space-y-3">
            <Label className="font-medium">Cor Base Monocromática</Label>
            <div className="grid grid-cols-3 gap-2">
              {monochromaticColors.map((color) => (
                <Button
                  key={color}
                  variant={monochromaticBase === color ? "default" : "outline"}
                  size="sm"
                  onClick={() => changeMonochromaticBase(color)}
                  className="h-8 p-1"
                >
                  <div 
                    className="w-full h-full rounded"
                    style={{ backgroundColor: color }}
                  />
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Preview das Cores */}
        <div className="space-y-3">
          <Label className="font-medium">Preview da Paleta</Label>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(currentScheme).filter(([key]) => key !== 'background').map(([element, color]) => (
              <div key={element} className="text-center space-y-1">
                <div 
                  className="w-full h-8 rounded border"
                  style={{ 
                    backgroundColor: color,
                    border: color === '#FFFFFF' ? '1px solid #e5e7eb' : 'none'
                  }}
                />
                <Badge variant="outline" className="text-xs">
                  {element === 'carbon' ? 'C' :
                   element === 'hydrogen' ? 'H' :
                   element === 'oxygen' ? 'O' :
                   element === 'nitrogen' ? 'N' :
                   element === 'sulfur' ? 'S' :
                   element === 'phosphorus' ? 'P' :
                   element === 'halogen' ? 'X' : '?'}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Informações de Acessibilidade */}
        {(activePalette === 'protanopia' || activePalette === 'deuteranopia' || activePalette === 'tritanopia') && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Acessibilidade:</strong> Esta paleta foi otimizada para pessoas com 
              {activePalette === 'protanopia' ? ' protanopia (dificuldade com vermelho)' :
               activePalette === 'deuteranopia' ? ' deuteranopia (dificuldade com verde)' :
               ' tritanopia (dificuldade com azul)'}.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};