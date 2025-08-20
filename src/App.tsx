import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Explorar } from "./pages/Explorar";
import { MoleculaDetalhes } from "./pages/MoleculaDetalhes";
import { Visualizar } from "./pages/Visualizar";
import { Contribuir } from "./pages/Contribuir";
import { Contato } from "./pages/Contato";
import { Acessibilidade } from "./pages/Acessibilidade";
import { ImportarMolecula } from "./pages/ImportarMolecula";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/molecula/:id" element={<MoleculaDetalhes />} />
          <Route path="/visualizar" element={<Visualizar />} />
          <Route path="/contribuir" element={<Contribuir />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/acessibilidade" element={<Acessibilidade />} />
          <Route path="/importar" element={<ImportarMolecula />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
