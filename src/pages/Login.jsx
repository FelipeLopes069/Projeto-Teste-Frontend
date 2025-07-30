// Hooks do React e ferramentas do React Router
import { useState } from "react";               // Hook para controlar estado local (email, senha, etc)
import { useNavigate, Link } from "react-router-dom"; // Hook para redirecionamento de rotas + componente de navegação

// Instância configurada do Axios para chamadas HTTP
import api from "../api/api";

// Importa os estilos CSS específicos do login (visual, centralização, etc)
import "../styles/login.css";

// Componente funcional que representa a página de Login
function Login() {
  // Estados para armazenar os valores digitados no formulário
  const [email, setEmail] = useState("");         // E-mail digitado pelo usuário
  const [senha, setSenha] = useState("");         // Senha digitada

  // Controla se a senha será visível ou oculta
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Mensagem de erro exibida ao usuário, se necessário
  const [erro, setErro] = useState("");

  // Hook de navegação para redirecionar após login
  const navigate = useNavigate();

  // Função chamada quando o formulário é submetido
  const handleLogin = async (e) => {
    e.preventDefault();   // Evita o recarregamento da página
    setErro("");          // Limpa erro anterior

    try {
      // Faz POST para a API com e-mail e senha
      const response = await api.post("/auth/login", {
        email,
        password: senha,  // A API espera o campo como 'password'
      });

      // Extrai o token do corpo da resposta
      const { token } = response.data;

      // Armazena o token no localStorage para manter a sessão
      localStorage.setItem("token", token);
      console.log("[LOGIN] ✅ Token salvo");

      // Redireciona para o dashboard após login bem-sucedido
      navigate("/dashboard");
    } catch (err) {
      // Em caso de erro, mostra mensagem para o usuário
      console.error("[LOGIN] ❌", err.response?.data?.erro || err.message);
      setErro("E-mail ou senha incorretos.");
    }
  };

  // JSX: estrutura visual do formulário
  return (
    <div className="login-container"> {/* Envolve o form e centraliza no meio da tela */}
      <form className="formulario" onSubmit={handleLogin}>
        <h1>login</h1> {/* Título do formulário */}

        {/* Campo de e-mail */}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza estado conforme digita
        />

        {/* Campo de senha com ícone para mostrar/ocultar */}
        <div className="senha-container">
          <input
            type={mostrarSenha ? "text" : "password"} // Alterna entre texto e senha
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <span
            onClick={() => setMostrarSenha(!mostrarSenha)} // Toggle visibilidade da senha
            className="ver-senha"
          >
            {mostrarSenha ? "👁️" : "🙈"} {/* Ícone visual de visibilidade */}
          </span>
        </div>

        {/* Botão de envio */}
        <button type="submit">Entrar</button>

        {/* Exibe mensagem de erro, se houver */}
        {erro && <p style={{ color: "red" }}>{erro}</p>}

        {/* Link para redirecionar ao registro */}
        <p>
          Não tem uma conta? <Link to="/registro">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}

// Exporta o componente para ser usado em rotas
export default Login;