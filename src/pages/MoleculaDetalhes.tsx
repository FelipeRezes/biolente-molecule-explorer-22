import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Download, Atom, RotateCcw, ZoomIn, ZoomOut, Move3D, Volume2, Maximize2 } from "lucide-react";

interface Molecule {
  id: string;
  name: string;
  formula: string;
  type: string;
  function: string;
  description: string;
  downloadFormats: string[];
  properties?: {
    molecularWeight: string;
    density: string;
    boilingPoint: string;
    meltingPoint: string;
    solubility: string;
  };
  structure?: {
    atoms: number;
    bonds: number;
    rings: number;
  };
}

export const MoleculaDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rotationSpeed, setRotationSpeed] = useState(1);

  // Mock data - in a real app, this would come from an API
  const molecules: Molecule[] = [
    {
      id: "1",
      name: "Adenosina Trifosfato (ATP)",
      formula: "C₁₀H₁₆N₅O₁₃P₃",
      type: "Nucleotídeo",
      function: "Armazenamento de energia",
      description: "Molécula fundamental para o armazenamento e transferência de energia celular. O ATP é conhecido como a 'moeda energética' das células, fornecendo energia para praticamente todos os processos celulares.",
      downloadFormats: ["PDB", "SDF", "MOL"],
      properties: {
        molecularWeight: "507.18 g/mol",
        density: "1.04 g/cm³",
        boilingPoint: "N/A (decompõe)",
        meltingPoint: "187°C",
        solubility: "Altamente solúvel em água"
      },
      structure: {
        atoms: 47,
        bonds: 49,
        rings: 3
      }
    },
    {
      id: "2", 
      name: "Glicose",
      formula: "C₆H₁₂O₆",
      type: "Carboidrato",
      function: "Fonte de energia",
      description: "Açúcar simples essencial para o metabolismo celular. É a principal fonte de energia para o cérebro e músculos durante atividades de alta intensidade.",
      downloadFormats: ["PDB", "SDF", "MOL", "XYZ"],
      properties: {
        molecularWeight: "180.16 g/mol",
        density: "1.54 g/cm³",
        boilingPoint: "N/A (decompõe)",
        meltingPoint: "146°C",
        solubility: "909 g/L em água"
      },
      structure: {
        atoms: 24,
        bonds: 23,
        rings: 1
      }
    },
    {
      id: "3",
      name: "Hemoglobina",
      formula: "C₂₉₅₂H₄₆₆₄N₈₁₂O₈₃₂S₈Fe₄",
      type: "Proteína",
      function: "Transporte de oxigênio",
      description: "Proteína responsável pelo transporte de oxigênio no sangue. Cada molécula de hemoglobina pode carregar até quatro moléculas de oxigênio.",
      downloadFormats: ["PDB"],
      properties: {
        molecularWeight: "64,500 g/mol",
        density: "1.35 g/cm³",
        boilingPoint: "N/A (proteína)",
        meltingPoint: "N/A (proteína)",
        solubility: "Solúvel em água"
      },
      structure: {
        atoms: 10000,
        bonds: 9500,
        rings: 24
      }
    },
    {
      id: "4",
      name: "DNA (Fragmento)",
      formula: "C₁₅H₃₁N₃O₁₃P₂",
      type: "Ácido Nucleico",
      function: "Armazenamento genético",
      description: "Fragmento de DNA contendo informação genética. O DNA armazena as instruções genéticas necessárias para o desenvolvimento e funcionamento de todos os organismos vivos.",
      downloadFormats: ["PDB", "SDF"],
      properties: {
        molecularWeight: "327.2 g/mol",
        density: "1.7 g/cm³",
        boilingPoint: "N/A (decompõe)",
        meltingPoint: "N/A (decompõe)",
        solubility: "Solúvel em água"
      },
      structure: {
        atoms: 63,
        bonds: 66,
        rings: 4
      }
    },
    {
      id: "5",
      name: "Colesterol",
      formula: "C₂₇H₄₆O",
      type: "Lipídio",
      function: "Componente de membrana",
      description: "Esterol essencial para a estrutura das membranas celulares. Também é precursor de hormônios esteroidais importantes como testosterona e estrogênio.",
      downloadFormats: ["PDB", "SDF", "MOL"],
      properties: {
        molecularWeight: "386.65 g/mol",
        density: "1.05 g/cm³",
        boilingPoint: "360°C",
        meltingPoint: "148-150°C",
        solubility: "Praticamente insolúvel em água"
      },
      structure: {
        atoms: 74,
        bonds: 76,
        rings: 4
      }
    },
    {
      id: "6",
      name: "Insulina",
      formula: "C₂₅₄H₃₇₇N₆₅O₇₆S₆",
      type: "Proteína",
      function: "Regulação de glicose",
      description: "Hormônio responsável pela regulação dos níveis de glicose no sangue. É essencial para o metabolismo de carboidratos, lipídios e proteínas.",
      downloadFormats: ["PDB"],
      properties: {
        molecularWeight: "5,808 g/mol",
        density: "1.3 g/cm³",
        boilingPoint: "N/A (proteína)",
        meltingPoint: "N/A (proteína)",
        solubility: "Solúvel em água"
      },
      structure: {
        atoms: 788,
        bonds: 777,
        rings: 0
      }
    }
  ];

  const molecule = molecules.find(m => m.id === id);

  if (!molecule) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Molécula não encontrada</h2>
          <Button onClick={() => navigate("/explorar")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Explorar
          </Button>
        </div>
      </div>
    );
  }

  const handleDownload = (format: string) => {
    console.log("Downloading molecule:", molecule.id, "in format:", format);
    // Implement download functionality
  };

  const handleAudioDescription = (text: string) => {
    console.log("Playing audio description:", text);
    // Implement audio description functionality
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-biolente-blue py-8">
        <div className="max-w-7xl mx-auto px-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/explorar")}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Explorar
          </Button>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-biolente-green/20 rounded-full flex items-center justify-center">
              <Atom className="w-8 h-8 text-biolente-green-dark" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {molecule.name}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-mono text-lg text-muted-foreground">{molecule.formula}</span>
                <Badge variant="secondary" className="text-sm">{molecule.type}</Badge>
                <Badge variant="outline" className="text-sm">{molecule.function}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Text Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Combined Information Card */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Informações da Molécula</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAudioDescription(`${molecule.description}. Propriedades: peso molecular ${molecule.properties?.molecularWeight}, densidade ${molecule.properties?.density}.`)}
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Informações Completas - {molecule.name}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="font-mono text-lg text-muted-foreground">{molecule.formula}</span>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="secondary">{molecule.type}</Badge>
                              <Badge variant="outline">{molecule.function}</Badge>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAudioDescription(`${molecule.description}. Propriedades: peso molecular ${molecule.properties?.molecularWeight}, densidade ${molecule.properties?.density}.`)}
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            Ouvir Tudo
                          </Button>
                        </div>
                        
                        {/* Description */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Descrição</h3>
                          <p className="text-muted-foreground leading-relaxed text-base">
                            {molecule.description}
                          </p>
                        </div>

                        {/* Properties */}
                        {molecule.properties && (
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Propriedades Químicas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Peso Molecular:</span>
                                  <span className="font-medium">{molecule.properties.molecularWeight}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Densidade:</span>
                                  <span className="font-medium">{molecule.properties.density}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Ponto de Fusão:</span>
                                  <span className="font-medium">{molecule.properties.meltingPoint}</span>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Ponto de Ebulição:</span>
                                  <span className="font-medium">{molecule.properties.boilingPoint}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                  <span className="text-muted-foreground">Solubilidade:</span>
                                  <span className="font-medium text-right">{molecule.properties.solubility}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Structural Info */}
                        {molecule.structure && (
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Informações Estruturais</h3>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold text-primary">{molecule.structure.atoms}</div>
                                <div className="text-sm text-muted-foreground">Átomos</div>
                              </div>
                              <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold text-primary">{molecule.structure.bonds}</div>
                                <div className="text-sm text-muted-foreground">Ligações</div>
                              </div>
                              <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold text-primary">{molecule.structure.rings}</div>
                                <div className="text-sm text-muted-foreground">Anéis</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Descrição</h4>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm">
                    {molecule.description}
                  </p>
                </div>
                
                {molecule.properties && (
                  <div>
                    <h4 className="font-medium mb-2">Propriedades Principais</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Peso Molecular:</span>
                        <span className="font-medium">{molecule.properties.molecularWeight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Densidade:</span>
                        <span className="font-medium">{molecule.properties.density}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Downloads */}
            <Card>
              <CardHeader>
                <CardTitle>Downloads</CardTitle>
                <CardDescription>
                  Baixe a estrutura molecular em diferentes formatos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {molecule.downloadFormats.map((format) => (
                  <Button
                    key={format}
                    variant="outline"
                    onClick={() => handleDownload(format)}
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar {format}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - 3D Viewer */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Move3D className="w-5 h-5" />
                    Visualização 3D
                  </CardTitle>
                  <CardDescription>
                    Clique e arraste para rotacionar. Use a roda do mouse para zoom.
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAudioDescription(`Visualização 3D da molécula ${molecule.name}. Esta molécula possui ${molecule.structure?.atoms} átomos e ${molecule.structure?.bonds} ligações químicas.`)}
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle>Visualização 3D - {molecule.name}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-sm text-muted-foreground">
                            Visualização ampliada da estrutura molecular
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAudioDescription(`Visualização 3D ampliada da molécula ${molecule.name}. Esta molécula possui ${molecule.structure?.atoms} átomos e ${molecule.structure?.bonds} ligações químicas.`)}
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            Audiodescrição
                          </Button>
                        </div>
                        <div className="aspect-video bg-gradient-to-br from-biolente-blue/10 to-biolente-green/10 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center relative overflow-hidden">
                          <div className="text-center">
                            <div className="w-32 h-32 bg-biolente-green/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                              <Atom className="w-16 h-16 text-biolente-green-dark animate-spin" style={{ animationDuration: '4s' }} />
                            </div>
                            <p className="text-muted-foreground text-lg">
                              Visualizador 3D da molécula será implementado aqui
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Use Three.js ou similar para visualização interativa
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* 3D Viewer Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-biolente-blue/10 to-biolente-green/10 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-biolente-green/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Atom className="w-12 h-12 text-biolente-green-dark animate-spin" style={{ animationDuration: '4s' }} />
                    </div>
                    <p className="text-muted-foreground">
                      Visualizador 3D da molécula será implementado aqui
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Use Three.js ou similar para visualização interativa
                    </p>
                  </div>
                </div>
                
                {/* 3D Controls */}
                <div className="flex justify-center gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Resetar
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomIn className="w-4 h-4 mr-2" />
                    Zoom In
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomOut className="w-4 h-4 mr-2" />
                    Zoom Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};