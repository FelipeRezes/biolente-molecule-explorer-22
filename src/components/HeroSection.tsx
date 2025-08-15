import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import moleculeHero from "@/assets/molecule-hero.png";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <section className="min-h-[60vh] bg-gradient-to-br from-background to-muted flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Encontre moléculas em segundos.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Digite o nome ou fórmula da molécula que deseja e explore 
              modelos 3D interativos, ideias para aprendizado, pesquisa e 
              descobertas científicas.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-lg">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Pesquisar moléculas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-border bg-background"
                aria-label="Campo de busca de moléculas"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            
            <Button 
              type="submit"
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Buscar
            </Button>
          </form>
        </div>

        {/* Right Content - Molecule Illustration */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-biolente-blue/20 to-biolente-green/20 rounded-3xl flex items-center justify-center transform rotate-12 hover:rotate-6 transition-transform duration-500">
              <img 
                src={moleculeHero}
                alt="Ilustração 3D de uma molécula com esferas azuis e verdes conectadas"
                className="w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-biolente-yellow rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-biolente-green rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};