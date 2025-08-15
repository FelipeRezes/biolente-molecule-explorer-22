import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye, Atom } from "lucide-react";

interface Molecule {
  id: string;
  name: string;
  formula: string;
  type: string;
  function: string;
  description: string;
  downloadFormats: string[];
}

export const Explorar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedFunction, setSelectedFunction] = useState("all");

  // Mock data for molecules
  const molecules: Molecule[] = [
    {
      id: "1",
      name: "Adenosina Trifosfato (ATP)",
      formula: "C₁₀H₁₆N₅O₁₃P₃",
      type: "Nucleotídeo",
      function: "Armazenamento de energia",
      description: "Molécula fundamental para o armazenamento e transferência de energia celular.",
      downloadFormats: ["PDB", "SDF", "MOL"]
    },
    {
      id: "2", 
      name: "Glicose",
      formula: "C₆H₁₂O₆",
      type: "Carboidrato",
      function: "Fonte de energia",
      description: "Açúcar simples essencial para o metabolismo celular.",
      downloadFormats: ["PDB", "SDF", "MOL", "XYZ"]
    },
    {
      id: "3",
      name: "Hemoglobina",
      formula: "C₂₉₅₂H₄₆₶₄N₈₁₂O₈₃₂S₈Fe₄",
      type: "Proteína",
      function: "Transporte de oxigênio",
      description: "Proteína responsável pelo transporte de oxigênio no sangue.",
      downloadFormats: ["PDB"]
    },
    {
      id: "4",
      name: "DNA (Fragmento)",
      formula: "C₁₅H₃₁N₃O₁₃P₂",
      type: "Ácido Nucleico",
      function: "Armazenamento genético",
      description: "Fragmento de DNA contendo informação genética.",
      downloadFormats: ["PDB", "SDF"]
    },
    {
      id: "5",
      name: "Colesterol",
      formula: "C₂₇H₄₆O",
      type: "Lipídio",
      function: "Componente de membrana",
      description: "Esterol essencial para a estrutura das membranas celulares.",
      downloadFormats: ["PDB", "SDF", "MOL"]
    },
    {
      id: "6",
      name: "Insulina",
      formula: "C₂₅₄H₃₇₇N₆₅O₇₆S₆",
      type: "Proteína",
      function: "Regulação de glicose",
      description: "Hormônio responsável pela regulação dos níveis de glicose no sangue.",
      downloadFormats: ["PDB"]
    }
  ];

  const moleculeTypes = ["Nucleotídeo", "Carboidrato", "Proteína", "Ácido Nucleico", "Lipídio"];
  const moleculeFunctions = ["Armazenamento de energia", "Fonte de energia", "Transporte de oxigênio", "Armazenamento genético", "Componente de membrana", "Regulação de glicose"];

  const filteredMolecules = molecules.filter(molecule => {
    const matchesSearch = molecule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         molecule.formula.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || molecule.type === selectedType;
    const matchesFunction = selectedFunction === "all" || molecule.function === selectedFunction;
    
    return matchesSearch && matchesType && matchesFunction;
  });

  const handleViewMolecule = (moleculeId: string) => {
    navigate(`/molecula/${moleculeId}`);
  };

  const handleDownload = (moleculeId: string, format: string) => {
    console.log("Downloading molecule:", moleculeId, "in format:", format);
    // Implement download functionality
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-biolente-blue py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explorar Moléculas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Navegue por nosso catálogo de biomoléculas com filtros avançados e 
              visualização 3D interativa.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-80 flex-shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Buscar
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Nome ou fórmula..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Tipo de Molécula
                  </label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      {moleculeTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Function Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Função Biológica
                  </label>
                  <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as funções</SelectItem>
                      {moleculeFunctions.map(func => (
                        <SelectItem key={func} value={func}>{func}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Results count */}
                <div className="text-sm text-muted-foreground pt-4 border-t">
                  {filteredMolecules.length} de {molecules.length} moléculas
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Molecules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMolecules.map((molecule) => (
                <Card key={molecule.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => handleViewMolecule(molecule.id)}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-12 h-12 bg-biolente-green/20 rounded-full flex items-center justify-center">
                        <Atom className="w-6 h-6 text-biolente-green-dark" />
                      </div>
                      <Badge variant="secondary">{molecule.type}</Badge>
                    </div>
                    
                    <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {molecule.name}
                    </CardTitle>
                    
                    <CardDescription>
                      <span className="font-mono text-sm">{molecule.formula}</span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {molecule.function}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {molecule.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewMolecule(molecule.id);
                        }}
                        className="w-full"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar 3D
                      </Button>
                      
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-muted-foreground mr-2">Download:</span>
                        {molecule.downloadFormats.map((format) => (
                          <Button
                            key={format}
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(molecule.id, format);
                            }}
                            className="text-xs h-6 px-2"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            {format}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No results */}
            {filteredMolecules.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Nenhuma molécula encontrada
                </h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou termo de busca para encontrar moléculas.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};