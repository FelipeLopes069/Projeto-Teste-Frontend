// Hooks do React e navegação de rotas
import { useState } from "react";                    // Para controlar os inputs e estados locais
import { useNavigate, Link } from "react-router-dom"; // Hook para redirecionar e Link para navegação

// Instância Axios personalizada para requisições
import api from "../api/api";

// Reaproveita o estilo do login (centralização, campos, cores, etc)
import "../styles/login.css";

// Componente de registro de novo usuário
function Registro() {
  // Estados controlados para os campos do formulário
  const [nome, setNome] = useState("");     // Nome completo
  const [email, setEmail] = useState("");   // E-mail
  const [senha, setSenha] = useState("");   // Senha

  // Controle de exibição da senha (👁️ ou 🙈)
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Armazena mensagem de erro, se ocorrer
  const [erro, setErro] = useState("");

  // Hook para redirecionar o usuário após o cadastro
  const navigate = useNavigate();

  // Função executada ao enviar o formulário
  const handleRegistro = async (e) => {
    e.preventDefault(); // Impede recarregamento da página
    setErro("");        // Limpa erro anterior

    try {
      // Envia os dados para a rota de registro da API
      const response = await api.post("/auth/register", {
        name: nome,       // Nome completo do usuário
        email,            // E-mail informado
        password: senha,  // Senha (a chave esperada é "password")
      });

      // Extrai o token da resposta
      const { token } = response.data;

      // Salva token localmente para manter login
      localStorage.setItem("token", token);
      console.log("[REGISTRO] ✅ Token salvo");

      // Redireciona para o dashboard após sucesso
      navigate("/dashboard");
    } catch (err) {
      // Mostra erro no console e na interface
      console.error("[REGISTRO] ❌", err.response?.data?.erro || err.message);
      setErro("Não foi possível registrar. Tente outro e-mail.");
    }
  };

  // JSX visual do formulário de registro
  return (
    <div className="login-container"> {/* Centraliza o form na tela (mesma classe usada no login) */}
      <form className="formulario" onSubmit={handleRegistro}>
        <h1>Registrar</h1> {/* Título do formulário */}

        {/* Campo: Nome completo */}
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)} // Atualiza estado ao digitar
        />

        {/* Campo: E-mail */}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Campo: Senha + botão de mostrar/ocultar */}
        <div className="senha-container">
          <input
            type={mostrarSenha ? "text" : "password"} // Alterna visibilidade
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <span
            onClick={() => setMostrarSenha(!mostrarSenha)} // Inverte estado
            className="ver-senha"
          >
            {mostrarSenha ? "👁️" : "🙈"} {/* Ícone representativo */}
          </span>
        </div>

        {/* Botão de envio */}
        <button type="submit">Cadastrar</button>

        {/* Mensagem de erro, se houver */}
        {erro && <p style={{ color: "red" }}>{erro}</p>}

        {/* Link para voltar ao login */}
        <p>
          Já tem uma conta? <Link to="/">Faça login</Link>
        </p>
      </form>
    </div>
  );
}

// Exporta o componente para ser usado nas rotas
export default Registro;