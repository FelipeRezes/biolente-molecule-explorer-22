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
    <section className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Animated Background Effects */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-molecule)' }}></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-biolente-blue/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-biolente-green/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-biolente-yellow/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
        
        {/* Left Content */}
        <div className="space-y-10 z-10">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              <span className="bg-gradient-to-r from-biolente-blue via-biolente-green to-biolente-yellow bg-clip-text text-transparent">
                Encontre
              </span>{" "}
              moléculas em{" "}
              <span className="bg-gradient-to-r from-biolente-yellow via-biolente-green to-biolente-blue bg-clip-text text-transparent">
                segundos.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed">
              Digite o nome ou fórmula da molécula que deseja e explore 
              modelos 3D interativos, ideias para aprendizado, pesquisa e 
              descobertas científicas.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Pesquisar moléculas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-16 text-xl border-2 border-border/30 bg-card/50 backdrop-blur-sm rounded-2xl text-foreground placeholder:text-muted-foreground/70"
                style={{ boxShadow: 'var(--glow-primary)' }}
                aria-label="Campo de busca de moléculas"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primary" />
            </div>
            
            <Button 
              type="submit"
              className="h-16 px-10 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-bold text-lg rounded-2xl transition-all duration-300"
              style={{ boxShadow: 'var(--glow-secondary)' }}
            >
              <Search className="w-6 h-6 mr-3" />
              Buscar
            </Button>
          </form>
        </div>

        {/* Right Content - Enhanced Molecule Visualization */}
        <div className="flex justify-center lg:justify-end relative">
          <div className="relative group">
            {/* Main molecule container with enhanced effects */}
            <div className="w-96 h-96 lg:w-[32rem] lg:h-[32rem] relative">
              {/* Glowing background */}
              <div 
                className="absolute inset-0 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                style={{ background: 'var(--gradient-cosmic)' }}
              ></div>
              
              {/* Molecule container */}
              <div className="relative w-full h-full bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-xl rounded-3xl border border-border/20 flex items-center justify-center transform rotate-12 group-hover:rotate-6 transition-all duration-700 group-hover:scale-105">
                <img 
                  src={moleculeHero}
                  alt="Ilustração 3D de uma molécula com esferas azuis e verdes conectadas"
                  className="w-80 h-80 lg:w-96 lg:h-96 object-contain filter drop-shadow-2xl group-hover:drop-shadow-3xl transition-all duration-500"
                  style={{ filter: 'drop-shadow(0 0 30px hsl(var(--biolente-blue) / 0.4))' }}
                />
              </div>
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-biolente-yellow to-biolente-yellow-dark rounded-full animate-pulse" style={{ boxShadow: 'var(--glow-accent)' }}></div>
            <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-biolente-green to-biolente-green-dark rounded-full animate-pulse delay-300" style={{ boxShadow: 'var(--glow-secondary)' }}></div>
            <div className="absolute top-1/4 -left-8 w-8 h-8 bg-gradient-to-br from-biolente-blue to-biolente-blue-dark rounded-full animate-pulse delay-700" style={{ boxShadow: 'var(--glow-primary)' }}></div>
            <div className="absolute bottom-1/4 -right-8 w-6 h-6 bg-gradient-to-br from-biolente-molecule-blue to-biolente-blue rounded-full animate-pulse delay-1000"></div>
            
            {/* Floating particles */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-biolente-yellow rounded-full animate-bounce delay-500"></div>
            <div className="absolute bottom-16 right-16 w-3 h-3 bg-biolente-green rounded-full animate-bounce delay-1200"></div>
            <div className="absolute top-1/2 right-4 w-2 h-2 bg-biolente-blue rounded-full animate-bounce delay-800"></div>
          </div>
        </div>
      </div>
    </section>
  );
};