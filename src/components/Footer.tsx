import { Search } from "lucide-react";

export const Footer = () => {
  const quickLinks = [
    { label: "Sobre o Biolente", href: "#" },
    { label: "Como Usar", href: "#" },
    { label: "Documentação", href: "#" },
    { label: "API", href: "#" },
  ];

  const resources = [
    { label: "Explorar Moléculas", href: "#" },
    { label: "Visualizador 3D", href: "#" },
    { label: "Contribuir", href: "#" },
    { label: "Download", href: "#" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-biolente-green rounded-full flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">BIOLENTE</span>
            </div>
            <p className="text-primary-foreground/80 max-w-md leading-relaxed">
              Plataforma científica para exploração e visualização de moléculas em 3D. 
              Democratizando o acesso ao conhecimento molecular através de tecnologia acessível.
            </p>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Contato</h4>
              <p className="text-primary-foreground/80 text-sm">
                Email: contato@biolente.org<br />
                Suporte: suporte@biolente.org
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/80 text-sm">
              © 2024 Biolente. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Acessibilidade
              </a>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-primary-foreground/60 text-xs">
              Desenvolvido com ❤️ para a comunidade científica brasileira
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};