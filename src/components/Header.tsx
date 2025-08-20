import { Button } from "@/components/ui/button";
import { Search, Eye, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Header = ({ currentPage = "home", onNavigate }: HeaderProps) => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isAudioMode, setIsAudioMode] = useState(false);

  useEffect(() => {
    // Focus on accessibility button first for accessibility
    const button = document.getElementById('accessibility-btn');
    if (button) {
      button.focus();
    }
  }, []);

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    if (!isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const handleAudioDescription = () => {
    // Implementar audiodescrição da página
    console.log('Iniciando audiodescrição da página');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      setIsAudioMode(!isAudioMode);
    }
  };

  const handleButtonClick = () => {
    if (isAudioMode) {
      handleAudioDescription();
    } else {
      toggleHighContrast();
    }
  };

  const menuItems = [
    { id: 'home', label: 'HOME' },
    { id: 'explorar', label: 'EXPLORAR' },
    { id: 'importar', label: 'IMPORTAR' },
    { id: 'contato', label: 'CONTATO' },
    { id: 'contribua', label: 'CONTRIBUA' },
  ];

  return (
    <header className="w-full bg-biolente-blue shadow-sm">
      {/* Accessibility Button - First in tab order */}
      <div className="w-full flex justify-center py-2">
        <Button
          id="accessibility-btn"
          onClick={handleButtonClick}
          onKeyDown={handleKeyDown}
          className="bg-biolente-yellow hover:bg-biolente-yellow-dark text-foreground font-bold px-6 py-2 rounded-md transition-colors"
          aria-label={
            isAudioMode 
              ? "Audiodescrição da página" 
              : isHighContrast 
                ? "Desativar alto contraste" 
                : "Ativar alto contraste"
          }
        >
          {isAudioMode ? (
            <>
              <Volume2 className="w-4 h-4 mr-2" />
              AUDIODESCRIÇÃO DA PÁGINA
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              {isHighContrast ? "DESATIVAR ALTO CONTRASTE" : "ATIVAR ALTO CONTRASTE"}
            </>
          )}
        </Button>
      </div>

      {/* Main Navigation */}
      <div className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-biolente-green rounded-full flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">BIOLENTE</span>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                className={`text-foreground hover:text-biolente-blue-dark font-medium transition-colors ${
                  currentPage === item.id ? 'text-biolente-blue-dark font-bold' : ''
                }`}
                aria-current={currentPage === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
            
            <Button
              onClick={() => onNavigate?.('acessibilidade')}
              className="bg-biolente-yellow hover:bg-biolente-yellow-dark text-foreground font-bold px-4 py-2 rounded-md"
            >
              ACESSIBILIDADE
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button variant="outline" className="md:hidden">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};