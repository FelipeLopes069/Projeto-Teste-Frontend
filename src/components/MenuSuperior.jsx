// Importa hooks e ícones necessários
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudSun, FaUsers, FaSignOutAlt } from "react-icons/fa"; // Ícones visuais
import "./MenuSuperior.css"; // Estilo específico do menu

// Componente de menu superior fixo nas páginas privadas
function MenuSuperior() {
  // Estado que controla se o menu hamburguer está aberto ou fechado
  const [menuAberto, setMenuAberto] = useState(false);

  // Hook do React Router para navegação programática
  const navigate = useNavigate();

  // Função para navegar entre rotas e fechar o menu
  const navegar = (rota) => {
    setMenuAberto(false); // Fecha o menu após clicar
    navigate(rota);       // Redireciona para a rota desejada
  };

  // Função de logout do sistema
  const sair = () => {
    localStorage.removeItem("token"); // Remove token salvo
    setMenuAberto(false);             // Fecha o menu
    navigate("/");                    // Volta para tela de login
  };

  return (
    <header className="menu-superior">
      {/* Lado esquerdo do menu (logotipo ou nome do sistema) */}
      <div className="menu-info-esquerda">
        <div className="logo">Projeto Teste</div>
      </div>

      {/* Lado direito com botão de menu mobile (hamburguer) */}
      <div className="menu-direita">
        <button
          className="hamburguer"
          onClick={() => setMenuAberto((prev) => !prev)} // Abre/fecha menu
        >
          ☰
        </button>
      </div>

      {/* Navegação do menu, aparece com classe "aberto" se estiver visível */}
      <nav className={`menu-links ${menuAberto ? "aberto" : ""}`}>
        {/* Botão para ir ao dashboard (ver clima) */}
        <button onClick={() => navegar("/dashboard")}>
          <FaCloudSun /> <span>Ver clima</span>
        </button>

        {/* Botão para ir à tela de usuários */}
        <button onClick={() => navegar("/usuarios")}>
          <FaUsers /> <span>Gerenciar usuários</span>
        </button>

        {/* Botão de logout */}
        <button onClick={sair}>
          <FaSignOutAlt /> <span>Sair</span>
        </button>
      </nav>
    </header>
  );
}

// Exporta o componente para uso no layout principal
export default MenuSuperior;