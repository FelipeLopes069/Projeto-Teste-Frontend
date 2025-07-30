// Importa o Axios, biblioteca HTTP para fazer requisições de forma simples
import axios from "axios";

// Cria uma instância personalizada do Axios com configurações pré-definidas
const api = axios.create({
  // Define a URL base de todas as requisições — isso evita repetir em cada chamada
  // ⚠️ Em produção, trocar para a URL real do backend (ex: https://api.seuprojeto.com/api)
  baseURL: "http://localhost:3333/api", // ✅ Inclui "/api" para já bater direto nas rotas da API

  // Essa opção envia cookies automaticamente nas requisições (útil se usar autenticação via sessão)
  // Pode ser desnecessário se você estiver usando apenas JWT no header Authorization
  withCredentials: true, // 🔒 Garante que cookies sejam incluídos, se usados
});

// Exporta essa instância para ser usada em todo o projeto (frontend)
export default api;