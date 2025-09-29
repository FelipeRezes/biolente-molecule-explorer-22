import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Aula {
  id: number;
  titulo: string;
  resumo: string;
  nivel: "Iniciante" | "Intermediário" | "Avançado";
  categoria: string;
  premium: boolean;
}

const aulasMock: Aula[] = [
  {
    id: 1,
    titulo: "Introdução às Moléculas Orgânicas",
    resumo: "Conceitos básicos sobre estruturas moleculares e ligações químicas",
    nivel: "Iniciante",
    categoria: "Química Orgânica",
    premium: false
  },
  {
    id: 2,
    titulo: "Proteínas: Estrutura e Função",
    resumo: "Estudo detalhado das estruturas proteicas e suas funções biológicas",
    nivel: "Intermediário",
    categoria: "Bioquímica",
    premium: true
  },
  {
    id: 3,
    titulo: "DNA e RNA: Moléculas da Vida",
    resumo: "Análise das estruturas dos ácidos nucleicos e sua importância",
    nivel: "Avançado",
    categoria: "Biologia Molecular",
    premium: false
  },
  {
    id: 4,
    titulo: "Farmacologia Molecular",
    resumo: "Como as drogas interagem com alvos moleculares específicos",
    nivel: "Avançado",
    categoria: "Farmacologia",
    premium: true
  },
  {
    id: 5,
    titulo: "Carboidratos: Energia e Estrutura",
    resumo: "Estruturas dos carboidratos e suas funções energéticas e estruturais",
    nivel: "Iniciante",
    categoria: "Bioquímica",
    premium: false
  }
];

export const PlanoAulas = () => {
  const navigate = useNavigate();
  const [filtroCategoria, setFiltroCategoria] = useState<string>("");
  const [filtroNivel, setFiltroNivel] = useState<string>("");
  const [filtroTipo, setFiltroTipo] = useState<string>("");

  const aulasFiltradas = aulasMock.filter(aula => {
    return (
      (filtroCategoria === "" || aula.categoria === filtroCategoria) &&
      (filtroNivel === "" || aula.nivel === filtroNivel) &&
      (filtroTipo === "" || 
        (filtroTipo === "gratuito" && !aula.premium) ||
        (filtroTipo === "premium" && aula.premium)
      )
    );
  });

  const categorias = [...new Set(aulasMock.map(aula => aula.categoria))];
  const niveis = ["Iniciante", "Intermediário", "Avançado"];

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="plano-aulas" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <BookOpen className="text-primary" />
            Plano de Aulas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore nossa coleção de planos de aula sobre moléculas, com conteúdos gratuitos e premium
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="text-primary" size={20} />
            <h2 className="text-lg font-semibold">Filtros</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Categoria</label>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  {categorias.map(categoria => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Nível</label>
              <Select value={filtroNivel} onValueChange={setFiltroNivel}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os níveis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os níveis</SelectItem>
                  {niveis.map(nivel => (
                    <SelectItem key={nivel} value={nivel}>
                      {nivel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tipo de Acesso</label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  <SelectItem value="gratuito">Gratuito</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Lista de Aulas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aulasFiltradas.map(aula => (
            <Card key={aula.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{aula.titulo}</CardTitle>
                  <Badge variant={aula.premium ? "default" : "secondary"}>
                    {aula.premium ? "Premium" : "Gratuito"}
                  </Badge>
                </div>
                <CardDescription>{aula.resumo}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nível:</span>
                    <Badge variant="outline">{aula.nivel}</Badge>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Categoria:</span>
                    <span className="font-medium">{aula.categoria}</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    onClick={() => navigate(`/aula/${aula.id}`)}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {aulasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma aula encontrada com os filtros selecionados.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};