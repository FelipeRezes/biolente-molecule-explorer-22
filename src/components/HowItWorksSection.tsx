import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Eye, Upload, Microscope, Filter, Download } from "lucide-react";

export const HowItWorksSection = () => {
  const features = [
    {
      icon: Search,
      title: "Explorar Moléculas",
      description: "Acesse nosso catálogo completo de biomoléculas com filtros avançados",
      details: [
        "Filtros por tipo, nome, fórmula e função biológica",
        "Visualização 3D interativa de cada molécula", 
        "Download em formatos padrão (PDB, SDF, MOL)",
        "Informações detalhadas sobre propriedades químicas"
      ]
    },
    {
      icon: Eye,
      title: "Visualizar Moléculas",
      description: "Importe e visualize seus próprios arquivos de moléculas",
      details: [
        "Suporte para formatos PDB, SDF, MOL e XYZ",
        "Visualização 3D em tempo real",
        "Controles para rotação, zoom e inspeção",
        "Análise de estrutura molecular interativa"
      ]
    },
    {
      icon: Upload,
      title: "Contribuir com Moléculas",
      description: "Envie moléculas para expandir nosso catálogo científico",
      details: [
        "Formulário simples e intuitivo",
        "Campos para nome, fórmula e descrição",
        "Upload de arquivo estrutural",
        "Revisão científica antes da publicação"
      ]
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como Funciona o Biolente
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Descubra as três principais funcionalidades que tornam o Biolente uma ferramenta 
            poderosa para exploração e pesquisa molecular.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-biolente-green rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4 p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-biolente-blue/20 rounded-full flex items-center justify-center">
              <Filter className="w-6 h-6 text-biolente-blue-dark" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Filtros Avançados</h3>
              <p className="text-sm text-muted-foreground">Encontre exatamente o que procura</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-biolente-green/20 rounded-full flex items-center justify-center">
              <Microscope className="w-6 h-6 text-biolente-green-dark" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Análise Detalhada</h3>
              <p className="text-sm text-muted-foreground">Propriedades químicas completas</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-biolente-yellow/20 rounded-full flex items-center justify-center">
              <Download className="w-6 h-6 text-biolente-yellow-dark" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Download Fácil</h3>
              <p className="text-sm text-muted-foreground">Formatos padrão da indústria</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};