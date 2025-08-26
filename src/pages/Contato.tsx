import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Bug } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    tipo: "",
    mensagem: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactTypes = [
    { value: "suporte", label: "Suporte Técnico", icon: HelpCircle },
    { value: "bug", label: "Relatar Bug", icon: Bug },
    { value: "feedback", label: "Feedback", icon: MessageCircle },
    { value: "geral", label: "Dúvida Geral", icon: Mail }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['nome', 'email', 'assunto', 'tipo', 'mensagem'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Responderemos em até 24 horas úteis."
      });
      
      // Reset form
      setFormData({
        nome: "",
        email: "",
        assunto: "",
        tipo: "",
        mensagem: ""
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-biolente-blue py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Entre em Contato
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estamos aqui para ajudar! Entre em contato conosco para suporte técnico, 
              dúvidas ou sugestões sobre o Biolente.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information */}
          <div className="space-y-6">
            
            {/* Contact Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Informações de Contato</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">contato@biolente.org</p>
                    <p className="text-sm text-muted-foreground">suporte@biolente.org</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Telefone</p>
                    <p className="text-sm text-muted-foreground">+55 (11) 3456-7890</p>
                    <p className="text-xs text-muted-foreground">Segunda a sexta, 9h às 18h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Endereço</p>
                    <p className="text-sm text-muted-foreground">
                      Instituto de Biologia Molecular<br/>
                      São Paulo, SP - Brasil
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Horário de Atendimento</p>
                    <p className="text-sm text-muted-foreground">
                      Segunda a Sexta: 9h às 18h<br/>
                      Sábado: 9h às 14h
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Types */}
            <Card>
              <CardHeader>
                <CardTitle>Tipos de Suporte</CardTitle>
                <CardDescription>
                  Selecione o tipo de contato mais adequado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {contactTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-3 p-3 rounded-lg border bg-muted/20">
                    <type.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{type.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {type.value === 'suporte' && 'Ajuda com uso da plataforma'}
                        {type.value === 'bug' && 'Problemas técnicos no sistema'}
                        {type.value === 'feedback' && 'Sugestões e melhorias'}
                        {type.value === 'geral' && 'Outras questões'}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Clock className="w-8 h-8 text-biolente-green mx-auto" />
                  <h4 className="font-semibold text-foreground">Tempo de Resposta</h4>
                  <p className="text-sm text-muted-foreground">
                    Respondemos em até <strong>24 horas</strong> úteis
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Suporte em Português
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Enviar Mensagem</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e entraremos em contato em breve
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        placeholder="Seu nome completo"
                        className="mt-1"
                        required
                      />
                    </div>
                    
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
                  </div>

                  {/* Subject and Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="assunto">Assunto *</Label>
                      <Input
                        id="assunto"
                        value={formData.assunto}
                        onChange={(e) => handleInputChange('assunto', e.target.value)}
                        placeholder="Resumo da sua mensagem"
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tipo">Tipo de Contato *</Label>
                      <select
                        id="tipo"
                        value={formData.tipo}
                        onChange={(e) => handleInputChange('tipo', e.target.value)}
                        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                      >
                        <option value="">Selecione o tipo</option>
                        {contactTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="mensagem">Mensagem *</Label>
                    <Textarea
                      id="mensagem"
                      value={formData.mensagem}
                      onChange={(e) => handleInputChange('mensagem', e.target.value)}
                      placeholder="Descreva sua dúvida, problema ou sugestão em detalhes..."
                      className="mt-1 min-h-32"
                      required
                    />
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground">
                      <strong>Política de Privacidade:</strong> Seus dados pessoais serão utilizados 
                      apenas para responder sua mensagem e não serão compartilhados com terceiros. 
                      Mantemos seus dados seguros conforme nossa política de privacidade.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
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
                          <span>Enviar Mensagem</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AccessibilityPanel />
    </div>
  );
};