import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Send, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Contribuir = () => {
  const [formData, setFormData] = useState({
    nome: "",
    formula: "",
    tipo: "",
    funcao: "",
    descricao: "",
    email: "",
    instituicao: ""
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const moleculeTypes = [
    "Proteína",
    "Carboidrato", 
    "Lipídio",
    "Ácido Nucleico",
    "Nucleotídeo",
    "Aminoácido",
    "Vitamina",
    "Hormônio",
    "Enzima",
    "Outro"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.toLowerCase().split('.').pop();
    const supportedFormats = ['pdb', 'sdf', 'mol', 'xyz'];

    if (!supportedFormats.includes(fileExt || '')) {
      toast({
        title: "Formato não suportado",
        description: "Por favor, envie um arquivo nos formatos: PDB, SDF, MOL ou XYZ",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    toast({
      title: "Arquivo carregado",
      description: `Arquivo ${file.name} carregado com sucesso.`
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['nome', 'formula', 'tipo', 'funcao', 'descricao', 'email'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (!uploadedFile) {
      toast({
        title: "Arquivo necessário",
        description: "Por favor, faça upload do arquivo estrutural da molécula.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Molécula enviada com sucesso!",
        description: "Sua contribuição será revisada pela nossa equipe científica."
      });
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-biolente-blue py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Contribuição Enviada!
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-16">
          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-biolente-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-biolente-green-dark" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Obrigado pela sua contribuição!
              </h2>
              
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Sua molécula <strong>{formData.nome}</strong> foi enviada com sucesso e será 
                revisada pela nossa equipe científica. Você receberá uma confirmação por email 
                quando a molécula for aprovada e adicionada ao catálogo.
              </p>

              <div className="bg-muted/50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
                <h3 className="font-semibold mb-3">Resumo da Contribuição:</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Nome:</strong> {formData.nome}</div>
                  <div><strong>Fórmula:</strong> {formData.formula}</div>
                  <div><strong>Tipo:</strong> {formData.tipo}</div>
                  <div><strong>Arquivo:</strong> {uploadedFile?.name}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    nome: "",
                    formula: "",
                    tipo: "",
                    funcao: "",
                    descricao: "",
                    email: "",
                    instituicao: ""
                  });
                  setUploadedFile(null);
                }}>
                  Contribuir com Outra Molécula
                </Button>
                
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                  Voltar ao Início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-biolente-blue py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Contribuir com Moléculas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ajude a expandir nosso catálogo científico enviando moléculas para 
              a comunidade. Sua contribuição será revisada por especialistas.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* Instructions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-biolente-yellow-dark" />
              <span>Instruções para Contribuição</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Informações Necessárias:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Nome científico da molécula</li>
                  <li>• Fórmula molecular</li>
                  <li>• Tipo e função biológica</li>
                  <li>• Descrição detalhada</li>
                  <li>• Arquivo estrutural (PDB, SDF, MOL, XYZ)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Processo de Revisão:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Verificação científica da estrutura</li>
                  <li>• Validação dos dados fornecidos</li>
                  <li>• Confirmação por email</li>
                  <li>• Publicação no catálogo</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Formulário de Contribuição</CardTitle>
            <CardDescription>
              Preencha todos os campos obrigatórios marcados com *
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Molecule Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Informações da Molécula
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome da Molécula *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      placeholder="Ex: Adenosina Trifosfato"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="formula">Fórmula Molecular *</Label>
                    <Input
                      id="formula"
                      value={formData.formula}
                      onChange={(e) => handleInputChange('formula', e.target.value)}
                      placeholder="Ex: C₁₀H₁₆N₅O₁₃P₃"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tipo">Tipo de Molécula *</Label>
                    <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {moleculeTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="funcao">Função Biológica *</Label>
                    <Input
                      id="funcao"
                      value={formData.funcao}
                      onChange={(e) => handleInputChange('funcao', e.target.value)}
                      placeholder="Ex: Armazenamento de energia celular"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição *</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange('descricao', e.target.value)}
                    placeholder="Descreva a molécula, sua importância biológica e características relevantes..."
                    className="mt-1 min-h-32"
                    required
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Arquivo Estrutural
                </h3>
                
                <div className="border-2 border-dashed border-border rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-sm font-medium text-foreground">
                        Clique para selecionar o arquivo estrutural *
                      </span>
                      <span className="block text-xs text-muted-foreground mt-1">
                        Formatos aceitos: PDB, SDF, MOL, XYZ (max. 10MB)
                      </span>
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".pdb,.sdf,.mol,.xyz"
                      onChange={handleFileUpload}
                      className="hidden"
                      required
                    />
                  </div>
                  
                  {uploadedFile && (
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {uploadedFile.name}
                      </span>
                      <Badge variant="secondary">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Informações de Contato
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="instituicao">Instituição (opcional)</Label>
                    <Input
                      id="instituicao"
                      value={formData.instituicao}
                      onChange={(e) => handleInputChange('instituicao', e.target.value)}
                      placeholder="Nome da universidade/empresa"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="min-w-32"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Enviar Contribuição</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};