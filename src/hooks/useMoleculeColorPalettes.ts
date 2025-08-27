import { useState, useEffect } from 'react';

export type ColorPalette = 'cpk' | 'rainbow' | 'monochromatic' | 'protanopia' | 'deuteranopia' | 'tritanopia';

interface ColorScheme {
  background: string;
  carbon: string;
  hydrogen: string;
  oxygen: string;
  nitrogen: string;
  sulfur: string;
  phosphorus: string;
  halogen: string;
  other: string;
}

export const useMoleculeColorPalettes = () => {
  const [activePalette, setActivePalette] = useState<ColorPalette>('cpk');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [monochromaticBase, setMonochromaticBase] = useState('#0072B2');

  // Paletas de cores
  const colorSchemes: Record<ColorPalette, ColorScheme> = {
    cpk: {
      background: '#f8f9fa',
      carbon: '#808080',
      hydrogen: '#FFFFFF',
      oxygen: '#FF0000',
      nitrogen: '#0000FF',
      sulfur: '#FFFF00',
      phosphorus: '#FFA500',
      halogen: '#00FF00',
      other: '#FF69B4'
    },
    rainbow: {
      background: '#f8f9fa',
      carbon: '#FF0000',
      hydrogen: '#FF7F00',
      oxygen: '#FFFF00',
      nitrogen: '#00FF00',
      sulfur: '#0000FF',
      phosphorus: '#4B0082',
      halogen: '#9400D3',
      other: '#FF1493'
    },
    monochromatic: {
      background: '#f8f9fa',
      carbon: monochromaticBase,
      hydrogen: adjustBrightness(monochromaticBase, 0.8),
      oxygen: adjustBrightness(monochromaticBase, 0.6),
      nitrogen: adjustBrightness(monochromaticBase, 0.4),
      sulfur: adjustBrightness(monochromaticBase, 0.2),
      phosphorus: adjustBrightness(monochromaticBase, -0.2),
      halogen: adjustBrightness(monochromaticBase, -0.4),
      other: adjustBrightness(monochromaticBase, -0.6)
    },
    protanopia: {
      background: '#f8f9fa',
      carbon: '#0072B2',
      hydrogen: '#F0E442',
      oxygen: '#E69F00',
      nitrogen: '#56B4E9',
      sulfur: '#CC79A7',
      phosphorus: '#009E73',
      halogen: '#D55E00',
      other: '#999999'
    },
    deuteranopia: {
      background: '#f8f9fa',
      carbon: '#0072B2',
      hydrogen: '#F0E442',
      oxygen: '#E69F00',
      nitrogen: '#56B4E9',
      sulfur: '#CC79A7',
      phosphorus: '#009E73',
      halogen: '#D55E00',
      other: '#999999'
    },
    tritanopia: {
      background: '#f8f9fa',
      carbon: '#E69F00',
      hydrogen: '#56B4E9',
      oxygen: '#009E73',
      nitrogen: '#F0E442',
      sulfur: '#0072B2',
      phosphorus: '#D55E00',
      halogen: '#CC79A7',
      other: '#999999'
    }
  };

  // Paleta de Alto Contraste
  const highContrastScheme: ColorScheme = {
    background: '#000000',
    carbon: '#FFFFFF',
    hydrogen: '#F0E442',
    oxygen: '#0072B2',
    nitrogen: '#E69F00',
    sulfur: '#CC79A7',
    phosphorus: '#009E73',
    halogen: '#D55E00',
    other: '#56B4E9'
  };

  // Função para ajustar brilho
  function adjustBrightness(hex: string, factor: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * factor * 100);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  // Carregar preferências salvas
  useEffect(() => {
    const savedPalette = localStorage.getItem('biolente-molecule-palette');
    const savedHighContrast = localStorage.getItem('biolente-high-contrast');
    const savedMonoBase = localStorage.getItem('biolente-mono-base');
    
    if (savedPalette && Object.keys(colorSchemes).includes(savedPalette)) {
      setActivePalette(savedPalette as ColorPalette);
    }
    
    if (savedHighContrast === 'true') {
      setIsHighContrast(true);
    }
    
    if (savedMonoBase) {
      setMonochromaticBase(savedMonoBase);
    }
  }, []);

  // Aplicar cores ao DOM
  useEffect(() => {
    const scheme = isHighContrast ? highContrastScheme : colorSchemes[activePalette];
    
    // Aplicar variáveis CSS customizadas
    const root = document.documentElement;
    root.style.setProperty('--molecule-bg', scheme.background);
    root.style.setProperty('--molecule-carbon', scheme.carbon);
    root.style.setProperty('--molecule-hydrogen', scheme.hydrogen);
    root.style.setProperty('--molecule-oxygen', scheme.oxygen);
    root.style.setProperty('--molecule-nitrogen', scheme.nitrogen);
    root.style.setProperty('--molecule-sulfur', scheme.sulfur);
    root.style.setProperty('--molecule-phosphorus', scheme.phosphorus);
    root.style.setProperty('--molecule-halogen', scheme.halogen);
    root.style.setProperty('--molecule-other', scheme.other);
    
    // Aplicar fundo específico para modo alto contraste
    if (isHighContrast) {
      root.style.setProperty('--molecule-viewer-bg', '#000000');
    } else {
      root.style.removeProperty('--molecule-viewer-bg');
    }
  }, [activePalette, isHighContrast, monochromaticBase]);

  const changePalette = (palette: ColorPalette) => {
    setActivePalette(palette);
    localStorage.setItem('biolente-molecule-palette', palette);
  };

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    localStorage.setItem('biolente-high-contrast', newValue.toString());
  };

  const changeMonochromaticBase = (color: string) => {
    setMonochromaticBase(color);
    localStorage.setItem('biolente-mono-base', color);
  };

  const getCurrentScheme = () => {
    return isHighContrast ? highContrastScheme : colorSchemes[activePalette];
  };

  const paletteLabels: Record<ColorPalette, string> = {
    cpk: 'CPK (Padrão)',
    rainbow: 'Arco-íris',
    monochromatic: 'Monocromático',
    protanopia: 'Protanopia',
    deuteranopia: 'Deuteranopia',
    tritanopia: 'Tritanopia'
  };

  return {
    activePalette,
    isHighContrast,
    monochromaticBase,
    changePalette,
    toggleHighContrast,
    changeMonochromaticBase,
    getCurrentScheme,
    paletteLabels,
    colorSchemes,
    highContrastScheme
  };
};