import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, RotateCcw, ZoomIn, ZoomOut, Download, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Visualizar = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [moleculeData, setMoleculeData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const supportedFormats = [
    { ext: ".pdb", desc: "Protein Data Bank" },
    { ext: ".sdf", desc: "Structure Data File" },
    { ext: ".mol", desc: "MDL Molfile" },
    { ext: ".xyz", desc: "XYZ Coordinates" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.toLowerCase().split('.').pop();
    const isSupported = supportedFormats.some(format => format.ext.includes(fileExt || ''));

    if (!isSupported) {
      toast({
        title: "Formato não suportado",
        description: "Por favor, envie um arquivo nos formatos: PDB, SDF, MOL ou XYZ",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);

    // Simulate file processing
    setTimeout(() => {
      setMoleculeData({
        name: file.name.replace(/\.[^/.]+$/, ""),
        format: fileExt?.toUpperCase(),
        atoms: Math.floor(Math.random() * 500) + 50,
        bonds: Math.floor(Math.random() * 800) + 100,
        molecularWeight: (Math.random() * 1000 + 100).toFixed(2)
      });
      setIsProcessing(false);
      
      toast({
        title: "Arquivo carregado com sucesso!",
        description: "Sua molécula está pronta para visualização 3D.",
      });
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Simulate file input change
      const event = { target: { files: [file] } } as any;
      handleFileUpload(event);
    }
  };

  const resetVisualization = () => {
    setUploadedFile(null);
    setMoleculeData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-biolente-blue py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Visualizar Moléculas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Importe seus arquivos de moléculas e visualize estruturas 3D interativas 
              em tempo real no seu navegador.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload de Arquivo</span>
                </CardTitle>
                <CardDescription>
                  Envie um arquivo de molécula para visualização 3D
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Upload Area */}
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  
                  <p className="text-sm text-foreground font-medium mb-2">
                    Clique para selecionar ou arraste um arquivo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tamanho máximo: 10MB
                  </p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdb,.sdf,.mol,.xyz"
                    onChange={handleFileUpload}
                    className="hidden"
                    aria-label="Selecionar arquivo de molécula"
                  />
                </div>

                {/* Supported Formats */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Formatos Suportados:
                  </h4>
                  <div className="space-y-2">
                    {supportedFormats.map((format, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Badge variant="outline" className="w-12 text-xs">
                          {format.ext.replace('.', '').toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {format.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* File Info */}
                {uploadedFile && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    
                    {isProcessing && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span>Processando arquivo...</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Reset Button */}
                {moleculeData && (
                  <Button 
                    variant="outline" 
                    onClick={resetVisualization}
                    className="w-full"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Carregar Nova Molécula
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Visualization Section */}
          <div className="lg:col-span-2">
            {!moleculeData ? (
              /* Instructions */
              <Card className="h-full">
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center space-y-4 max-w-md">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <AlertCircle className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Pronto para Visualizar
                    </h3>
                    <p className="text-muted-foreground">
                      Carregue um arquivo de molécula para começar a visualização 3D. 
                      Você poderá girar, ampliar e inspecionar a estrutura molecular.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* 3D Viewer */
              <div className="space-y-6">
                {/* Molecule Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>{moleculeData.name}</CardTitle>
                    <CardDescription>
                      Formato: {moleculeData.format} • {moleculeData.atoms} átomos • {moleculeData.bonds} ligações
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        Peso Molecular: {moleculeData.molecularWeight} Da
                      </Badge>
                      <Badge variant="outline">
                        {moleculeData.atoms} Átomos
                      </Badge>
                      <Badge variant="outline">
                        {moleculeData.bonds} Ligações
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* 3D Viewer */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Visualização 3D</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <ZoomOut className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg h-96 flex items-center justify-center border">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-biolente-green/20 rounded-full flex items-center justify-center mx-auto">
                          <div className="w-16 h-16 bg-biolente-green/40 rounded-full flex items-center justify-center">
                            <div className="w-8 h-8 bg-biolente-green rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            Visualizador 3D Ativo
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Use o mouse para girar, o scroll para ampliar.<br/>
                            Clique nos átomos para mais informações.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};