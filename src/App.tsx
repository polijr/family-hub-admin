import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import UsuarioDetalhe from "./pages/UsuarioDetalhe";
import Organizadores from "./pages/Organizadores";
import Eventos from "./pages/Eventos";
import Configuracoes from "./pages/Configuracoes";
import ConfigMoods from "./pages/ConfigMoods";
import ConfigCategorias from "./pages/ConfigCategorias";
import ConfigAfinidades from "./pages/ConfigAfinidades";
import ConfigPrecos from "./pages/ConfigPrecos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Admin routes */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/:id" element={<UsuarioDetalhe />} />
            <Route path="/organizadores" element={<Organizadores />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/configuracoes" element={<Configuracoes />}>
              <Route path="moods" element={<ConfigMoods />} />
              <Route path="categorias" element={<ConfigCategorias />} />
              <Route path="afinidades" element={<ConfigAfinidades />} />
              <Route path="precos" element={<ConfigPrecos />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
