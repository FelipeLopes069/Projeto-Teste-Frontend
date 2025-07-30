// Importa os componentes essenciais do React Router para SPA
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas da aplicação
import Login from "./pages/Login";           // Tela inicial de login
import Registro from "./pages/Registro";     // Tela de criação de conta
import Dashboard from "./pages/Dashboard";   // Página principal pós-login
import Usuarios from "./pages/Usuarios";     // Tela de gerenciamento de usuários

// Componente visual de menu que será exibido nas rotas privadas
import MenuSuperior from "./components/MenuSuperior";

// Componente auxiliar que encapsula páginas protegidas com o menu fixo
function LayoutComMenu({ children }) {
  return (
    <>
      <MenuSuperior />   {/* Exibe o menu superior fixo */}
      {children}         {/* Renderiza o conteúdo da página protegida */}
    </>
  );
}

// Componente principal da aplicação
function App() {
  return (
    <Router>
      <Routes>
        {/* === ROTAS PÚBLICAS (sem MenuSuperior) === */}

        {/* Página de login: acessível diretamente */}
        <Route path="/" element={<Login />} />

        {/* Página de registro: também pública */}
        <Route path="/registro" element={<Registro />} />


        {/* === ROTAS PRIVADAS (com MenuSuperior fixo) === */}

        {/* Dashboard: renderiza o conteúdo + menu */}
        <Route
          path="/dashboard"
          element={
            <LayoutComMenu>
              <Dashboard />
            </LayoutComMenu>
          }
        />

        {/* Página de gerenciamento de usuários */}
        <Route
          path="/usuarios"
          element={
            <LayoutComMenu>
              <Usuarios />
            </LayoutComMenu>
          }
        />
      </Routes>
    </Router>
  );
}

// Exporta o App para ser renderizado no index.js
export default App;