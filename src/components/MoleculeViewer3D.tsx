import { useEffect, useRef, useState } from 'react';
import { useMoleculeColorPalettes } from '@/hooks/useMoleculeColorPalettes';

declare global {
  interface Window {
    $3Dmol: any;
  }
}

interface MoleculeViewer3DProps {
  fileContent: string;
  fileFormat: string;
  onAnalysis?: (data: any) => void;
}

export const MoleculeViewer3D = ({ fileContent, fileFormat, onAnalysis }: MoleculeViewer3DProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getCurrentScheme, isHighContrast, activePalette } = useMoleculeColorPalettes();

  // Load 3Dmol.js script
  useEffect(() => {
    const loadScript = () => {
      if (window.$3Dmol) {
        initializeViewer();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.5.2/3Dmol-min.js';
      script.onload = () => {
        initializeViewer();
      };
      document.head.appendChild(script);
    };

    const initializeViewer = () => {
      if (!viewerRef.current || !window.$3Dmol) return;

      const config = {
        backgroundColor: isHighContrast ? 'black' : 'white'
      };

      const newViewer = window.$3Dmol.createViewer(viewerRef.current, config);
      setViewer(newViewer);
      loadMolecule(newViewer);
    };

    loadScript();
  }, []);

  // Update colors when palette changes
  useEffect(() => {
    if (viewer && fileContent) {
      updateMoleculeColors();
    }
  }, [activePalette, isHighContrast, viewer]);

  // Update background when high contrast changes
  useEffect(() => {
    if (viewer) {
      viewer.setBackgroundColor(isHighContrast ? 'black' : 'white');
      viewer.render();
    }
  }, [isHighContrast, viewer]);

  const loadMolecule = (viewerInstance: any) => {
    if (!viewerInstance || !fileContent) return;

    setIsLoading(true);
    
    try {
      // Clear previous models
      viewerInstance.removeAllModels();

      // Add molecule based on format
      const model = viewerInstance.addModel(fileContent, fileFormat.toLowerCase());
      
      // Apply initial styling
      applyMoleculeStyle(viewerInstance, model);
      
      // Zoom to fit
      viewerInstance.zoomTo();
      viewerInstance.render();

      // Extract molecule data for analysis
      const atoms = model.selectedAtoms({});
      const analysis = {
        atoms: atoms.length,
        bonds: countBonds(atoms),
        molecularWeight: calculateMolecularWeight(atoms),
        elements: getUniqueElements(atoms)
      };

      onAnalysis?.(analysis);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading molecule:', error);
      setIsLoading(false);
    }
  };

  const applyMoleculeStyle = (viewerInstance: any, model: any) => {
    const scheme = getCurrentScheme();
    
    if (isHighContrast) {
      // High contrast coloring
      model.setStyle({}, {
        stick: { 
          radius: 0.15,
          colorscheme: {
            'C': scheme.carbon,
            'H': scheme.hydrogen,
            'O': scheme.oxygen,
            'N': scheme.nitrogen,
            'S': scheme.sulfur,
            'P': scheme.phosphorus
          }
        },
        sphere: { 
          scale: 0.3,
          colorscheme: {
            'C': scheme.carbon,
            'H': scheme.hydrogen,
            'O': scheme.oxygen,
            'N': scheme.nitrogen,
            'S': scheme.sulfur,
            'P': scheme.phosphorus
          }
        }
      });
    } else if (activePalette === 'cpk') {
      // CPK coloring
      model.setStyle({}, {
        stick: { radius: 0.15 },
        sphere: { scale: 0.3 }
      });
      model.setColorByElement({}, {
        'C': scheme.carbon,
        'H': scheme.hydrogen,
        'O': scheme.oxygen,
        'N': scheme.nitrogen,
        'S': scheme.sulfur,
        'P': scheme.phosphorus,
        'F': scheme.halogen,
        'Cl': scheme.halogen,
        'Br': scheme.halogen,
        'I': scheme.halogen
      });
    } else if (activePalette === 'monochromatic') {
      // Monochromatic coloring with intensity based on element
      const baseColor = scheme.carbon;
      model.setStyle({}, {
        stick: { radius: 0.15, color: baseColor },
        sphere: { scale: 0.3, color: baseColor }
      });
    } else {
      // Default CPK coloring
      model.setStyle({}, {
        stick: { radius: 0.15 },
        sphere: { scale: 0.3 }
      });
    }
  };

  const updateMoleculeColors = () => {
    if (!viewer) return;
    
    const models = viewer.getModels();
    models.forEach((model: any) => {
      applyMoleculeStyle(viewer, model);
    });
    
    viewer.render();
  };

  const countBonds = (atoms: any[]) => {
    let bondCount = 0;
    atoms.forEach(atom => {
      bondCount += atom.bonds?.length || 0;
    });
    return Math.floor(bondCount / 2); // Each bond is counted twice
  };

  const calculateMolecularWeight = (atoms: any[]) => {
    const atomicWeights: { [key: string]: number } = {
      'H': 1.008, 'C': 12.011, 'N': 14.007, 'O': 15.999,
      'P': 30.974, 'S': 32.065, 'F': 18.998, 'Cl': 35.453,
      'Br': 79.904, 'I': 126.90
    };

    let totalWeight = 0;
    atoms.forEach(atom => {
      const element = atom.element || atom.elem;
      totalWeight += atomicWeights[element] || 0;
    });

    return totalWeight.toFixed(2);
  };

  const getUniqueElements = (atoms: any[]) => {
    const elements = new Set();
    atoms.forEach(atom => {
      const element = atom.element || atom.elem;
      if (element) elements.add(element);
    });
    return Array.from(elements);
  };

  const handleZoomIn = () => {
    if (viewer) {
      viewer.zoom(1.2);
      viewer.render();
    }
  };

  const handleZoomOut = () => {
    if (viewer) {
      viewer.zoom(0.8);
      viewer.render();
    }
  };

  const handleReset = () => {
    if (viewer) {
      viewer.zoomTo();
      viewer.render();
    }
  };

  const handleDownload = () => {
    if (viewer) {
      const imgData = viewer.pngURI();
      const link = document.createElement('a');
      link.download = 'molecule.png';
      link.href = imgData;
      link.click();
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-muted-foreground">Carregando molécula...</span>
          </div>
        </div>
      )}
      
      <div 
        ref={viewerRef} 
        className="molecule-viewer w-full h-96 rounded-lg border"
        style={{
          minHeight: '400px'
        }}
      />
      
      {/* Viewer Controls */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
        <button
          onClick={handleZoomOut}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-md border hover:bg-muted transition-colors"
          title="Diminuir zoom"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <button
          onClick={handleReset}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-md border hover:bg-muted transition-colors"
          title="Resetar visualização"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        
        <button
          onClick={handleZoomIn}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-md border hover:bg-muted transition-colors"
          title="Aumentar zoom"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        
        <button
          onClick={handleDownload}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-md border hover:bg-muted transition-colors"
          title="Baixar imagem"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};