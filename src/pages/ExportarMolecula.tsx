import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Download, Volume2, Eye, Palette, Settings, FileImage, FileType } from "lucide-react";

export const ExportarMolecula = () => {
  const [visualizationMode, setVisualizationMode] = useState("ball-stick");
  const [colorScheme, setColorScheme] = useState("cpk");
  const [highContrast, setHighContrast] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState("none");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [atomSize, setAtomSize] = useState([1.0]);
  const [bondSize, setBondSize] = useState([0.3]);
  const [opacity, setOpacity] = useState([1.0]);
  const [quality, setQuality] = useState("high");
  const [exportFormat, setExportFormat] = useState("png");
  const [resolution, setResolution] = useState("1920x1080");

  const handleAudioDescription = () => {
    console.log("Iniciando audiodescrição das configurações de visualização");
  };

  const handleExport = () => {
    console.log("Exportando molécula com configurações:", {
      visualizationMode,
      colorScheme,
      highContrast,
      colorBlindMode,
      backgroundColor,
      atomSize: atomSize[0],
      bondSize: bondSize[0],
      opacity: opacity[0],
      quality,
      exportFormat,
      resolution
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="exportar" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Exportar e Configurar Molécula
          </h1>
          <p className="text-lg text-muted-foreground">
            Configure a visualização da molécula e exporte com as configurações personalizadas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Painel de Configurações */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Configurações de Visualização */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Visualização
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAudioDescription}
                  aria-label="Audiodescrição das configurações"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="visualization-mode">Modo de Visualização</Label>
                  <Select value={visualizationMode} onValueChange={setVisualizationMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ball-stick">Bola e Bastão</SelectItem>
                      <SelectItem value="spacefill">Preenchimento Espacial</SelectItem>
                      <SelectItem value="wireframe">Estrutura de Arame</SelectItem>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="surface">Superfície</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="color-scheme">Esquema de Cores</Label>
                  <Select value={colorScheme} onValueChange={setColorScheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpk">CPK (Cores Padrão)</SelectItem>
                      <SelectItem value="element">Por Elemento</SelectItem>
                      <SelectItem value="residue">Por Resíduo</SelectItem>
                      <SelectItem value="chain">Por Cadeia</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="background-color">Cor de Fundo</Label>
                  <Input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-full h-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Configurações de Acessibilidade */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Acessibilidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast">Alto Contraste</Label>
                  <Switch
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                  />
                </div>

                <div>
                  <Label htmlFor="colorblind-mode">Modo Daltônico</Label>
                  <Select value={colorBlindMode} onValueChange={setColorBlindMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhum</SelectItem>
                      <SelectItem value="protanopia">Protanopia</SelectItem>
                      <SelectItem value="deuteranopia">Deuteranopia</SelectItem>
                      <SelectItem value="tritanopia">Tritanopia</SelectItem>
                      <SelectItem value="monochromacy">Monocromacia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Configurações Avançadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Configurações Avançadas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tamanho dos Átomos: {atomSize[0]}</Label>
                  <Slider
                    value={atomSize}
                    onValueChange={setAtomSize}
                    min={0.1}
                    max={3.0}
                    step={0.1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Espessura das Ligações: {bondSize[0]}</Label>
                  <Slider
                    value={bondSize}
                    onValueChange={setBondSize}
                    min={0.1}
                    max={1.0}
                    step={0.05}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Opacidade: {Math.round(opacity[0] * 100)}%</Label>
                  <Slider
                    value={opacity}
                    onValueChange={setOpacity}
                    min={0.1}
                    max={1.0}
                    step={0.05}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="quality">Qualidade de Renderização</Label>
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="ultra">Ultra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Configurações de Exportação */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Exportação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="export-format">Formato</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpg">JPG</SelectItem>
                      <SelectItem value="svg">SVG</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="pdb">PDB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="resolution">Resolução</Label>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1280x720">HD (1280x720)</SelectItem>
                      <SelectItem value="1920x1080">Full HD (1920x1080)</SelectItem>
                      <SelectItem value="2560x1440">2K (2560x1440)</SelectItem>
                      <SelectItem value="3840x2160">4K (3840x2160)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleExport}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Molécula
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Área de Visualização */}
          <div className="lg:col-span-2">
            <Card className="h-full min-h-[600px]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Visualização da Molécula</CardTitle>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FileImage className="w-4 h-4 mr-2" />
                        Tela Cheia
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-7xl w-full h-[90vh]">
                      <DialogHeader>
                        <DialogTitle>Visualização Ampliada</DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 bg-gradient-to-br from-background to-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="w-32 h-32 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                            <FileType className="w-16 h-16 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Visualizador 3D da Molécula</h3>
                          <p className="text-muted-foreground">
                            Aqui será renderizada a molécula 3D com as configurações aplicadas
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAudioDescription}
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] bg-gradient-to-br from-background to-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <FileType className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Visualizador 3D</h3>
                    <p className="text-muted-foreground mb-4">
                      Carregue uma molécula para começar a visualização
                    </p>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <p>Modo: {visualizationMode === "ball-stick" ? "Bola e Bastão" : visualizationMode}</p>
                      <p>Cores: {colorScheme === "cpk" ? "CPK" : colorScheme}</p>
                      <p>Alto Contraste: {highContrast ? "Ativo" : "Inativo"}</p>
                      <p>Daltonismo: {colorBlindMode === "none" ? "Nenhum" : colorBlindMode}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};