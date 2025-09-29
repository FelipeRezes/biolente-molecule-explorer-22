import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Play, FileText, HelpCircle, Target } from "lucide-react";

interface Aula {
  id: number;
  titulo: string;
  objetivo: string;
  nivel: string;
  categoria: string;
  premium: boolean;
  conteudo: {
    teoria: string;
    videos: string[];
    links: { titulo: string; url: string }[];
  };
  atividade: string;
  materiais: string[];
  quiz: {
    pergunta: string;
    alternativas: string[];
    respostaCerta: number;
  }[];
}

const aulasMock: { [key: number]: Aula } = {
  1: {
    id: 1,
    titulo: "Introdução às Moléculas Orgânicas",
    objetivo: "Compreender os conceitos fundamentais das moléculas orgânicas, suas estruturas e propriedades básicas.",
    nivel: "Iniciante",
    categoria: "Química Orgânica",
    premium: false,
    conteudo: {
      teoria: `As moléculas orgânicas são compostos químicos baseados em carbono que formam a base de toda vida na Terra. 

Características principais:
• Contêm átomos de carbono ligados covalentemente
• Podem formar cadeias longas e complexas
• Incluem grupos funcionais específicos
• Apresentam isomerismo (mesma fórmula, estruturas diferentes)

Tipos principais:
1. Hidrocarbonetos: apenas C e H
2. Álcoois: contêm grupo -OH
3. Aldeídos: contêm grupo -CHO
4. Cetonas: contêm grupo C=O
5. Ácidos carboxílicos: contêm grupo -COOH`,
      videos: ["Vídeo 1: Estruturas básicas", "Vídeo 2: Grupos funcionais"],
      links: [
        { titulo: "Química Orgânica - Khan Academy", url: "#" },
        { titulo: "Estruturas Moleculares 3D", url: "#" }
      ]
    },
    atividade: "Pesquise 5 moléculas orgânicas diferentes encontradas no cotidiano (ex: cafeína, aspirina) e identifique seus grupos funcionais usando o visualizador molecular.",
    materiais: [
      "Lista de moléculas orgânicas comum.pdf",
      "Exercícios práticos.pdf",
      "Tabela de grupos funcionais.pdf"
    ],
    quiz: [
      {
        pergunta: "Qual é o elemento químico base das moléculas orgânicas?",
        alternativas: ["Oxigênio", "Hidrogênio", "Carbono", "Nitrogênio"],
        respostaCerta: 2
      },
      {
        pergunta: "O que caracteriza um grupo funcional álcool?",
        alternativas: ["-COOH", "-CHO", "-OH", "C=O"],
        respostaCerta: 2
      }
    ]
  },
  2: {
    id: 2,
    titulo: "Proteínas: Estrutura e Função",
    objetivo: "Analisar as estruturas proteicas e compreender como elas determinam as funções biológicas.",
    nivel: "Intermediário",
    categoria: "Bioquímica",
    premium: true,
    conteudo: {
      teoria: `As proteínas são macromoléculas essenciais compostas por aminoácidos ligados por ligações peptídicas.

Níveis estruturais:
• Estrutura primária: sequência de aminoácidos
• Estrutura secundária: α-hélices e folhas-β
• Estrutura terciária: dobramento tridimensional
• Estrutura quaternária: múltiplas cadeias polipeptídicas

Funções principais:
1. Enzimas: catálise de reações
2. Estruturais: suporte e forma
3. Transporte: hemoglobina, albumina
4. Defesa: anticorpos
5. Regulação: hormônios proteicos`,
      videos: ["Vídeo 1: Níveis estruturais", "Vídeo 2: Dobramento proteico"],
      links: [
        { titulo: "Protein Data Bank", url: "#" },
        { titulo: "Estruturas proteicas 3D", url: "#" }
      ]
    },
    atividade: "Analise a estrutura tridimensional da hemoglobina e identifique as subunidades alfa e beta, explicando como a estrutura permite o transporte de oxigênio.",
    materiais: [
      "Atlas de estruturas proteicas.pdf",
      "Exercícios de dobramento.pdf",
      "Modelos 3D para download.zip"
    ],
    quiz: [
      {
        pergunta: "Quantos níveis estruturais existem nas proteínas?",
        alternativas: ["2", "3", "4", "5"],
        respostaCerta: 2
      }
    ]
  }
};

export const AulaDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [respostasQuiz, setRespostasQuiz] = useState<{ [key: number]: number }>({});
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const aula = id ? aulasMock[parseInt(id)] : null;

  if (!aula) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Aula não encontrada</h1>
          <Button onClick={() => navigate("/plano-aulas")}>
            <ArrowLeft className="mr-2" size={16} />
            Voltar às Aulas
          </Button>
        </div>
      </div>
    );
  }

  const handleRespostaQuiz = (perguntaIndex: number, resposta: number) => {
    setRespostasQuiz(prev => ({ ...prev, [perguntaIndex]: resposta }));
  };

  const verificarQuiz = () => {
    setMostrarResultados(true);
  };

  const acertos = aula.quiz.filter((pergunta, index) => 
    respostasQuiz[index] === pergunta.respostaCerta
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Cabeçalho da Aula */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/plano-aulas")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Voltar às Aulas
          </Button>
          
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-foreground">{aula.titulo}</h1>
            <Badge variant={aula.premium ? "default" : "secondary"} className="text-sm">
              {aula.premium ? "Premium" : "Gratuito"}
            </Badge>
          </div>
          
          <div className="flex gap-4 text-sm text-muted-foreground mb-4">
            <span>Nível: <strong>{aula.nivel}</strong></span>
            <span>Categoria: <strong>{aula.categoria}</strong></span>
          </div>
          
          <div className="bg-card p-4 rounded-lg border-l-4 border-l-primary">
            <div className="flex items-start gap-3">
              <Target className="text-primary mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-2">Objetivo da Aula</h3>
                <p className="text-muted-foreground">{aula.objetivo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo em Tabs */}
        <Tabs defaultValue="teoria" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="teoria">Teoria</TabsTrigger>
            <TabsTrigger value="atividade">Atividade</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="materiais">Materiais</TabsTrigger>
          </TabsList>

          <TabsContent value="teoria">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-primary" />
                  Conteúdo Teórico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-foreground">
                    {aula.conteudo.teoria}
                  </pre>
                </div>
                
                {aula.conteudo.videos.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Play className="text-primary" size={18} />
                      Vídeos Complementares
                    </h4>
                    <div className="space-y-2">
                      {aula.conteudo.videos.map((video, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Play size={16} />
                          <span>{video}</span>
                          <Button size="sm" variant="outline" className="ml-auto">
                            Assistir
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {aula.conteudo.links.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Links Úteis</h4>
                    <div className="space-y-2">
                      {aula.conteudo.links.map((link, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <span>{link.titulo}</span>
                          <Button size="sm" variant="link" className="ml-auto">
                            Acessar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="atividade">
            <Card>
              <CardHeader>
                <CardTitle>Atividade Prática</CardTitle>
                <CardDescription>Coloque em prática o que aprendeu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-foreground">{aula.atividade}</p>
                </div>
                <div className="mt-4">
                  <Button>Abrir Visualizador Molecular</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="text-primary" />
                  Quiz de Conhecimento
                </CardTitle>
                <CardDescription>Teste seus conhecimentos sobre o conteúdo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {aula.quiz.map((pergunta, perguntaIndex) => (
                  <div key={perguntaIndex} className="space-y-3">
                    <h4 className="font-semibold">
                      {perguntaIndex + 1}. {pergunta.pergunta}
                    </h4>
                    <div className="space-y-2">
                      {pergunta.alternativas.map((alternativa, altIndex) => (
                        <label key={altIndex} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                          <input
                            type="radio"
                            name={`pergunta-${perguntaIndex}`}
                            value={altIndex}
                            onChange={() => handleRespostaQuiz(perguntaIndex, altIndex)}
                            className="text-primary"
                          />
                          <span>{alternativa}</span>
                          {mostrarResultados && (
                            <Badge 
                              variant={altIndex === pergunta.respostaCerta ? "default" : "secondary"}
                              className="ml-auto"
                            >
                              {altIndex === pergunta.respostaCerta ? "Correta" : ""}
                            </Badge>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-4">
                  <Button onClick={verificarQuiz}>
                    Verificar Respostas
                  </Button>
                  {mostrarResultados && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        Acertos: {acertos}/{aula.quiz.length}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materiais">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="text-primary" />
                  Material para Download
                </CardTitle>
                <CardDescription>Baixe os materiais complementares da aula</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aula.materiais.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{material}</span>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2" size={16} />
                        Baixar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};