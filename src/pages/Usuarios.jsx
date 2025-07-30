// Importa hooks do React e ícones para UI
import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSearch } from "react-icons/fa";
import api from "../api/api"; // Cliente Axios com baseURL já definida
import MenuSuperior from "../components/MenuSuperior"; // Componente de navegação superior
import "../styles/Usuarios.css"; // Estilização da tela de usuários

function Usuarios() {
  // Lista de usuários
  const [usuarios, setUsuarios] = useState([]);

  // Estado para controle dos dados do formulário
  const [form, setForm] = useState({ name: "", email: "", id: null });

  // Mensagem de feedback (sucesso ou erro)
  const [mensagem, setMensagem] = useState("");

  // Se está no modo edição (true) ou criação (false)
  const [modoEdicao, setModoEdicao] = useState(false);

  // Controle da visibilidade do formulário
  const [formVisivel, setFormVisivel] = useState(false);

  // Controle da visibilidade da tabela de usuários
  const [listaVisivel, setListaVisivel] = useState(false);

  // Token JWT recuperado do localStorage
  const token = localStorage.getItem("token");

  // Carrega todos os usuários cadastrados no backend
  const carregarUsuarios = async () => {
    try {
      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data || []);
      setListaVisivel(true);
      setMensagem("✅ Lista carregada.");
    } catch (err) {
      console.error("Erro ao carregar usuários", err);
      setMensagem("❌ Erro ao carregar usuários.");
    }
  };

  // Atualiza o formulário dinamicamente conforme o usuário digita
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envia os dados do formulário (cria ou atualiza)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicao) {
        // Atualiza usuário existente
        await api.put(`/users/${form.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMensagem("✅ Usuário atualizado.");
      } else {
        // Cria novo usuário
        await api.post("/users", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMensagem("✅ Usuário adicionado.");
      }
      // Reseta estados e recarrega a lista
      setForm({ name: "", email: "", id: null });
      setModoEdicao(false);
      setFormVisivel(false);
      await carregarUsuarios();
    } catch (err) {
      console.error("Erro ao salvar", err);
      setMensagem("❌ Erro ao salvar.");
    }
  };

  // Preenche o formulário para edição
  const editarUsuario = (usuario) => {
    setForm({ name: usuario.name, email: usuario.email, id: usuario.id });
    setModoEdicao(true);
    setFormVisivel(true);
  };

  // Remove o usuário da base
  const excluirUsuario = async (id) => {
    try {
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensagem("✅ Usuário removido.");
      await carregarUsuarios();
    } catch (err) {
      console.error("Erro ao excluir", err);
      setMensagem("❌ Erro ao excluir.");
    }
  };

  // Estilo inline padrão para botões de ação
  const estiloBotaoCard = {
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1px solid #00ff99",
    background: "#121212",
    color: "#00ff99",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "0.5rem",
  };

  return (
    <div className="dashboard-fundo">
      {/* Menu do topo */}
      <MenuSuperior />

      <div className="dashboard-conteudo">
        <h2 className="titulo-boasvindas">Gerenciar Usuários</h2>

        {/* Ações principais: adicionar novo e consultar lista */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {/* Botão de adicionar novo usuário */}
          {!formVisivel && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                setFormVisivel(true);
                setModoEdicao(false);
                setForm({ name: "", email: "", id: null });
              }}
              style={estiloBotaoCard}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#1a1a1a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#121212")
              }
            >
              <FaPlus /> Adicionar Usuário
            </div>
          )}

          {/* Botão de consulta */}
          <div
            role="button"
            tabIndex={0}
            onClick={carregarUsuarios}
            style={estiloBotaoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#1a1a1a")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#121212")
            }
          >
            <FaSearch /> Consultar Usuários
          </div>
        </div>

        {/* Formulário visível (criação ou edição) */}
        {formVisivel && (
          <form onSubmit={handleSubmit} className="form-usuarios">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <button type="submit">
              {modoEdicao ? "Salvar Alterações" : "Salvar"}
            </button>
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => {
                setForm({ name: "", email: "", id: null });
                setModoEdicao(false);
                setFormVisivel(false);
              }}
            >
              <FaTimes /> Cancelar
            </button>
          </form>
        )}

        {/* Exibe mensagens de feedback */}
        {mensagem && <p className="mensagem">{mensagem}</p>}

        {/* Renderiza a tabela se estiver visível */}
        {listaVisivel && usuarios.length > 0 && (
          <table className="tabela-usuarios">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Criado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td style={{ display: "flex", gap: "0.5rem" }}>
                    {/* Botão de edição */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => editarUsuario(u)}
                      title="Editar"
                      style={estiloBotaoCard}
                    >
                      <FaEdit /> Editar
                    </div>

                    {/* Botão de exclusão */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => excluirUsuario(u.id)}
                      title="Excluir"
                      style={estiloBotaoCard}
                    >
                      <FaTrash /> Excluir
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Usuarios;