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
  return <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Simple Background Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
        
        {/* Left Content */}
        <div className="space-y-10 z-10">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              <span className="text-zinc-950">
                Encontre
              </span>{" "}
              moléculas em{" "}
              <span className="text-zinc-950">
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
              <Input type="text" placeholder="Pesquisar moléculas..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-14 h-16 text-xl border-2 rounded-xl" aria-label="Campo de busca de moléculas" />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primary" />
            </div>
            
            <Button type="submit" className="h-16 px-10 font-bold text-lg rounded-xl">
              <Search className="w-6 h-6 mr-3" />
              Buscar
            </Button>
          </form>
        </div>

        {/* Right Content - Simple Molecule Visualization */}
        <div className="flex justify-center lg:justify-end relative">
          <div className="relative group">
            <div className="w-96 h-96 lg:w-[32rem] lg:h-[32rem] relative">
              <div className="relative w-full h-full bg-white/50 backdrop-blur-sm rounded-3xl border border-border shadow-lg flex items-center justify-center">
                <img src={moleculeHero} alt="Ilustração 3D de uma molécula com esferas azuis e verdes conectadas" className="w-80 h-80 lg:w-96 lg:h-96 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};