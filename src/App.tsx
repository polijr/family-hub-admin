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

// App Mobile Pages
import AppLogin from "./pages/app/AppLogin";
import AppCadastro from "./pages/app/AppCadastro";
import AppEsqueciSenha from "./pages/app/AppEsqueciSenha";
import AppRecuperarSenha from "./pages/app/AppRecuperarSenha";
import AppPaginaInicial from "./pages/app/AppPaginaInicial";
import AppEventos from "./pages/app/AppEventos";
import AppEncontros from "./pages/app/AppEncontros";
import AppEncontrosAdd from "./pages/app/AppEncontrosAdd";
import AppEncontrosMeus from "./pages/app/AppEncontrosMeus";
import AppCompromissos from "./pages/app/AppCompromissos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Login Admin */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* App Mobile Routes */}
          <Route path="/app/login" element={<AppLogin />} />
          <Route path="/app/cadastro" element={<AppCadastro />} />
          <Route path="/app/esqueci-senha" element={<AppEsqueciSenha />} />
          <Route path="/app/recuperar-senha" element={<AppRecuperarSenha />} />
          <Route path="/app/paginainicial" element={<AppPaginaInicial />} />
          <Route path="/app/eventos" element={<AppEventos />} />
          <Route path="/app/encontros" element={<AppEncontros />} />
          <Route path="/app/encontros/add" element={<AppEncontrosAdd />} />
          <Route path="/app/encontros/meus" element={<AppEncontrosMeus />} />
          <Route path="/app/compromissos" element={<AppCompromissos />} />

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
