import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Upload, Maximize2, RotateCcw, Download, Play, Pause } from "lucide-react";
import { toast } from "sonner";
import * as THREE from "three";

// Componente da molécula 3D
const MoleculeViewer = ({ 
  colorScheme, 
  visualizationMode, 
  atomSize, 
  bondSize, 
  opacity,
  highContrast,
  colorBlindMode,
  backgroundColor
}: {
  colorScheme: string;
  visualizationMode: string;
  atomSize: number;
  bondSize: number;
  opacity: number;
  highContrast: boolean;
  colorBlindMode: string;
  backgroundColor: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Cores baseadas no esquema selecionado
  const getAtomColor = (element: string) => {
    if (highContrast) {
      return element === 'C' ? '#FFFFFF' : '#000000';
    }
    
    if (colorBlindMode === 'protanopia') {
      return element === 'C' ? '#FFD700' : '#0000FF';
    }
    
    if (colorBlindMode === 'deuteranopia') {
      return element === 'C' ? '#FF6347' : '#4169E1';
    }

    switch (colorScheme) {
      case 'cpk':
        return element === 'C' ? '#909090' : '#FF1493';
      case 'element':
        return element === 'C' ? '#404040' : '#FF0000';
      case 'rainbow':
        return element === 'C' ? '#FF0000' : '#00FF00';
      default:
        return '#606060';
    }
  };

  return (
    <group>
      {/* Átomos de exemplo */}
      <mesh position={[-1, 0, 0]} ref={meshRef}>
        <sphereGeometry args={[atomSize, 32, 32]} />
        <meshStandardMaterial 
          color={getAtomColor('C')} 
          opacity={opacity} 
          transparent={opacity < 1}
        />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <sphereGeometry args={[atomSize * 0.8, 32, 32]} />
        <meshStandardMaterial 
          color={getAtomColor('O')} 
          opacity={opacity} 
          transparent={opacity < 1}
        />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[atomSize * 0.6, 32, 32]} />
        <meshStandardMaterial 
          color={getAtomColor('H')} 
          opacity={opacity} 
          transparent={opacity < 1}
        />
      </mesh>
      
      {/* Ligações */}
      {visualizationMode !== 'spacefill' && (
        <>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[bondSize, bondSize, 2, 8]} />
            <meshStandardMaterial color="#808080" opacity={opacity} transparent={opacity < 1} />
          </mesh>
          <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[bondSize, bondSize, 1.4, 8]} />
            <meshStandardMaterial color="#808080" opacity={opacity} transparent={opacity < 1} />
          </mesh>
        </>
      )}
    </group>
  );
};

export const ImportarMolecula = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImage, setIsImage] = useState(false);
  const [visualizationMode, setVisualizationMode] = useState("ballstick");
  const [colorScheme, setColorScheme] = useState("cpk");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [atomSize, setAtomSize] = useState([0.3]);
  const [bondSize, setBondSize] = useState([0.1]);
  const [opacity, setOpacity] = useState([1]);
  const [highContrast, setHighContrast] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState("none");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      const moleculeFormats = ['.pdb', '.sdf', '.mol', '.xyz', '.cif'];
      const imageFormats = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
      const fileExtension = uploadedFile.name.toLowerCase().slice(uploadedFile.name.lastIndexOf('.'));
      
      if (moleculeFormats.includes(fileExtension)) {
        setFile(uploadedFile);
        setIsImage(false);
        setImageUrl(null);
        toast.success(`Arquivo molecular ${uploadedFile.name} carregado com sucesso!`);
      } else if (imageFormats.includes(fileExtension)) {
        const url = URL.createObjectURL(uploadedFile);
        setFile(uploadedFile);
        setImageUrl(url);
        setIsImage(true);
        toast.success(`Imagem ${uploadedFile.name} carregada com sucesso!`);
      } else {
        toast.error("Formato de arquivo não suportado!");
      }
    }
  };

  const handleReset = () => {
    setVisualizationMode("ballstick");
    setColorScheme("cpk");
    setBackgroundColor("#ffffff");
    setAtomSize([0.3]);
    setBondSize([0.1]);
    setOpacity([1]);
    setHighContrast(false);
    setColorBlindMode("none");
    setFile(null);
    setIsImage(false);
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
    toast.success("Configurações resetadas!");
  };

  const handleExport = () => {
    toast.success("Imagem exportada com sucesso!");
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    toast.info(isAnimating ? "Animação pausada" : "Animação iniciada");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Importar e Visualizar Conteúdo
          </h1>
          <p className="text-xl text-muted-foreground">
            Carregue arquivos moleculares para visualização 3D ou imagens para exibição personalizada
          </p>
        </div>

        {/* Upload de Arquivo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Importar Arquivo
            </CardTitle>
            <CardDescription>
              Formatos suportados: PDB, SDF, MOL, XYZ, CIF (moléculas) | JPG, PNG, GIF, WEBP, SVG (imagens)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept=".pdb,.sdf,.mol,.xyz,.cif,.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg"
                onChange={handleFileUpload}
                className="cursor-pointer flex-1"
              />
              {file && (
                <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                  <Badge variant="secondary">{file.name}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Visualizador 3D com Controles Integrados */}
        <Card className="h-[800px]">
          <CardContent className="p-0 h-full relative">
            {/* Barra de Controles Integrada */}
            <div className="absolute top-4 left-4 right-4 z-10 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg">
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Modo de Visualização */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm whitespace-nowrap">Estilo:</Label>
                    <Select value={visualizationMode} onValueChange={setVisualizationMode}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ballstick">Ball & Stick</SelectItem>
                        <SelectItem value="spacefill">Space Fill</SelectItem>
                        <SelectItem value="wireframe">Wireframe</SelectItem>
                        <SelectItem value="cartoon">Cartoon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator orientation="vertical" className="h-6" />

                  {/* Esquema de Cores */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm whitespace-nowrap">Cores:</Label>
                    <Select value={colorScheme} onValueChange={setColorScheme}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cpk">CPK</SelectItem>
                        <SelectItem value="element">Por Elemento</SelectItem>
                        <SelectItem value="rainbow">Rainbow</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator orientation="vertical" className="h-6" />

                  {/* Cor de Fundo */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm whitespace-nowrap">Fundo:</Label>
                    <Input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-8 p-1 cursor-pointer"
                    />
                  </div>

                  <Separator orientation="vertical" className="h-6" />

                  {/* Configurações de Acessibilidade */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm whitespace-nowrap">Alto Contraste:</Label>
                    <Switch
                      checked={highContrast}
                      onCheckedChange={setHighContrast}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm whitespace-nowrap">Daltonismo:</Label>
                    <Select value={colorBlindMode} onValueChange={setColorBlindMode}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhum</SelectItem>
                        <SelectItem value="protanopia">Protanopia</SelectItem>
                        <SelectItem value="deuteranopia">Deuteranopia</SelectItem>
                        <SelectItem value="tritanopia">Tritanopia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    {/* Botões de Ação */}
                    <Button onClick={toggleAnimation} size="sm" variant="outline">
                      {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button onClick={handleReset} size="sm" variant="outline">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleExport} size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-7xl h-[90vh]">
                        <DialogHeader>
                          <DialogTitle>Visualizador 3D - Tela Cheia</DialogTitle>
                        </DialogHeader>
                        <div className="flex-1 rounded-lg overflow-hidden relative">
                          {/* Barra de Controles na Tela Cheia */}
                          <div className="absolute top-4 left-4 right-4 z-10 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg">
                            <div className="p-4">
                              <div className="flex flex-wrap items-center gap-4">
                                {/* Modo de Visualização */}
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm whitespace-nowrap">Estilo:</Label>
                                  <Select value={visualizationMode} onValueChange={setVisualizationMode}>
                                    <SelectTrigger className="w-32">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="ballstick">Ball & Stick</SelectItem>
                                      <SelectItem value="spacefill">Space Fill</SelectItem>
                                      <SelectItem value="wireframe">Wireframe</SelectItem>
                                      <SelectItem value="cartoon">Cartoon</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <Separator orientation="vertical" className="h-6" />

                                {/* Esquema de Cores */}
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm whitespace-nowrap">Cores:</Label>
                                  <Select value={colorScheme} onValueChange={setColorScheme}>
                                    <SelectTrigger className="w-32">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="cpk">CPK</SelectItem>
                                      <SelectItem value="element">Por Elemento</SelectItem>
                                      <SelectItem value="rainbow">Rainbow</SelectItem>
                                      <SelectItem value="custom">Personalizado</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <Separator orientation="vertical" className="h-6" />

                                {/* Cor de Fundo */}
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm whitespace-nowrap">Fundo:</Label>
                                  <Input
                                    type="color"
                                    value={backgroundColor}
                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                    className="w-12 h-8 p-1 cursor-pointer"
                                  />
                                </div>

                                <Separator orientation="vertical" className="h-6" />

                                {/* Configurações de Acessibilidade */}
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm whitespace-nowrap">Alto Contraste:</Label>
                                  <Switch
                                    checked={highContrast}
                                    onCheckedChange={setHighContrast}
                                  />
                                </div>

                                <div className="flex items-center gap-2">
                                  <Label className="text-sm whitespace-nowrap">Daltonismo:</Label>
                                  <Select value={colorBlindMode} onValueChange={setColorBlindMode}>
                                    <SelectTrigger className="w-32">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="none">Nenhum</SelectItem>
                                      <SelectItem value="protanopia">Protanopia</SelectItem>
                                      <SelectItem value="deuteranopia">Deuteranopia</SelectItem>
                                      <SelectItem value="tritanopia">Tritanopia</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="ml-auto flex items-center gap-2">
                                  {/* Botões de Ação */}
                                  <Button onClick={toggleAnimation} size="sm" variant="outline">
                                    {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                  </Button>
                                  <Button onClick={handleReset} size="sm" variant="outline">
                                    <RotateCcw className="h-4 w-4" />
                                  </Button>
                                  <Button onClick={handleExport} size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Controles Avançados (Segunda Linha) */}
                              <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t">
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm whitespace-nowrap">Tamanho Átomos:</Label>
                                  <div className="w-24">
                                    <Slider
                                      value={atomSize}
                                      onValueChange={setAtomSize}
                                      max={1}
                                      min={0.1}
                                      step={0.1}
                                      className="w-full"
                                    />
                                  </div>
                                  <span className="text-xs text-muted-foreground w-8">{atomSize[0]}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Label className="text-sm whitespace-nowrap">Ligações:</Label>
                                  <div className="w-24">
                                    <Slider
                                      value={bondSize}
                                      onValueChange={setBondSize}
                                      max={0.3}
                                      min={0.05}
                                      step={0.05}
                                      className="w-full"
                                    />
                                  </div>
                                  <span className="text-xs text-muted-foreground w-8">{bondSize[0]}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Label className="text-sm whitespace-nowrap">Opacidade:</Label>
                                  <div className="w-24">
                                    <Slider
                                      value={opacity}
                                      onValueChange={setOpacity}
                                      max={1}
                                      min={0.1}
                                      step={0.1}
                                      className="w-full"
                                    />
                                  </div>
                                  <span className="text-xs text-muted-foreground w-8">{Math.round(opacity[0] * 100)}%</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {isImage && imageUrl ? (
                            <div 
                              className="w-full h-full flex items-center justify-center overflow-hidden"
                              style={{ backgroundColor: backgroundColor }}
                            >
                              <img 
                                src={imageUrl} 
                                alt="Imagem carregada" 
                                className="max-w-full max-h-full object-contain"
                                style={{
                                  filter: highContrast ? 'contrast(200%) brightness(120%)' : 'none'
                                }}
                              />
                            </div>
                          ) : (
                            <Canvas style={{ background: backgroundColor }}>
                              <PerspectiveCamera makeDefault position={[5, 5, 5]} />
                              <OrbitControls enablePan enableZoom enableRotate autoRotate={isAnimating} />
                              <ambientLight intensity={0.6} />
                              <directionalLight position={[10, 10, 5]} intensity={1} />
                              <Environment preset="studio" />
                              {file && (
                                <MoleculeViewer
                                  colorScheme={colorScheme}
                                  visualizationMode={visualizationMode}
                                  atomSize={atomSize[0]}
                                  bondSize={bondSize[0]}
                                  opacity={opacity[0]}
                                  highContrast={highContrast}
                                  colorBlindMode={colorBlindMode}
                                  backgroundColor={backgroundColor}
                                />
                              )}
                            </Canvas>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Controles Avançados (Segunda Linha) */}
                <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm whitespace-nowrap">Tamanho Átomos:</Label>
                    <div className="w-24">
                      <Slider
                        value={atomSize}
                        onValueChange={setAtomSize}
                        max={1}
                        min={0.1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{atomSize[0]}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm whitespace-nowrap">Ligações:</Label>
                    <div className="w-24">
                      <Slider
                        value={bondSize}
                        onValueChange={setBondSize}
                        max={0.3}
                        min={0.05}
                        step={0.05}
                        className="w-full"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{bondSize[0]}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm whitespace-nowrap">Opacidade:</Label>
                    <div className="w-24">
                      <Slider
                        value={opacity}
                        onValueChange={setOpacity}
                        max={1}
                        min={0.1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{Math.round(opacity[0] * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Área do Canvas 3D ou Imagem */}
            <div className="h-full rounded-lg overflow-hidden">
              {file ? (
                isImage && imageUrl ? (
                  <div 
                    className="w-full h-full flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <img 
                      src={imageUrl} 
                      alt="Imagem carregada" 
                      className="max-w-full max-h-full object-contain"
                      style={{
                        filter: highContrast ? 'contrast(200%) brightness(120%)' : 'none'
                      }}
                    />
                  </div>
                ) : (
                  <Canvas style={{ background: backgroundColor }}>
                    <PerspectiveCamera makeDefault position={[5, 5, 5]} />
                    <OrbitControls enablePan enableZoom enableRotate autoRotate={isAnimating} />
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Environment preset="studio" />
                    <MoleculeViewer
                      colorScheme={colorScheme}
                      visualizationMode={visualizationMode}
                      atomSize={atomSize[0]}
                      bondSize={bondSize[0]}
                      opacity={opacity[0]}
                      highContrast={highContrast}
                      colorBlindMode={colorBlindMode}
                      backgroundColor={backgroundColor}
                    />
                  </Canvas>
                )
              ) : (
                <div className="h-full flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/25">
                  <div className="text-center">
                    <Upload className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum arquivo carregado</h3>
                    <p className="text-muted-foreground">
                      Faça upload de um arquivo molecular ou imagem para começar a visualização
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

            {/* Informações do Arquivo */}
            {file && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Informações do Arquivo</CardTitle>
                </CardHeader>
                <CardContent>
                  {isImage ? (
                    <div className="space-y-2">
                      <p><strong>Tipo:</strong> Imagem</p>
                      <p><strong>Arquivo:</strong> {file.name}</p>
                      <p><strong>Tamanho:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                      <p><strong>Formato:</strong> {file.type || 'Imagem'}</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <Badge variant="secondary">Átomos</Badge>
                          <p className="text-2xl font-bold mt-1">42</p>
                        </div>
                        <div className="text-center">
                          <Badge variant="secondary">Ligações</Badge>
                          <p className="text-2xl font-bold mt-1">48</p>
                        </div>
                        <div className="text-center">
                          <Badge variant="secondary">Massa Mol.</Badge>
                          <p className="text-2xl font-bold mt-1">180.16</p>
                        </div>
                        <div className="text-center">
                          <Badge variant="secondary">Fórmula</Badge>
                          <p className="text-2xl font-bold mt-1">C₆H₁₂O₆</p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-2">
                        <p><strong>Nome:</strong> Glicose</p>
                        <p><strong>Arquivo:</strong> {file.name}</p>
                        <p><strong>Tamanho:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
      </main>
      <Footer />
    </div>
  );
};