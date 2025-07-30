// React hooks e ícones
import { useEffect, useState } from "react";
import { FiMapPin, FiAlertTriangle } from "react-icons/fi";
import { WiThermometer, WiHumidity, WiDayCloudy } from "react-icons/wi";
import { ImSpinner8 } from "react-icons/im";

// Componentes personalizados do projeto
import MenuSuperior from "../components/MenuSuperior";      // Menu fixo no topo
import WeatherChart from "../components/WeatherChart";      // Gráfico com previsão horária
import api from "../api/api";                               // Instância de requisições axios
import "../styles/dashboard.css";                           // Estilo da página

// Componente principal do Dashboard
function Dashboard() {
  // Estado para armazenar os dados de clima retornados da API
  const [clima, setClima] = useState(null);

  // Estado para a cidade selecionada no dropdown
  const [cidade, setCidade] = useState("São Paulo");

  // Estado para controle de carregamento enquanto busca os dados
  const [carregando, setCarregando] = useState(false);

  // Função para buscar o clima da cidade selecionada
  const buscarClima = async () => {
    try {
      setCarregando(true); // Ativa o loading/spinner

      // Faz requisição GET para o endpoint de clima com token JWT
      const res = await api.get(`/weather/${cidade}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Atualiza o estado com os dados recebidos da API
      setClima(res.data);
    } catch (err) {
      console.error("Erro ao buscar clima:", err); // Loga erros, se houver
    } finally {
      setCarregando(false); // Finaliza o loading, com sucesso ou erro
    }
  };

  // useEffect dispara toda vez que a cidade muda
  useEffect(() => {
    buscarClima();
  }, [cidade]); // 🔁 Atualiza o clima sempre que o valor de `cidade` mudar

  // JSX da página
  return (
    <div className="pagina-dashboard">
      <MenuSuperior /> {/* Menu no topo */}
      <div style={{ height: "4rem" }} /> {/* Espaço para não sobrepor o menu */}

      <div className="dashboard-corpo">
        {/* Coluna da esquerda */}
        <div className="dashboard-esquerda">
          {/* Cabeçalho com título e ícone */}
          <div className="dashboard-header">
            <WiDayCloudy size={32} />
            <h1>Clima nas Cidades</h1>
          </div>

          {/* Dropdown com seleção de cidade */}
          <select
            className="dashboard-select"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          >
            <option value="São Paulo">São Paulo</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
            <option value="Salvador">Salvador</option>
            <option value="Curitiba">Curitiba</option>
            <option value="Fortaleza">Fortaleza</option>
            <option value="Belo Horizonte">Belo Horizonte</option>
          </select>

          {/* Bloco de informações do clima */}
          <div className="dashboard-info">
            {/* Exibe spinner enquanto carrega */}
            {carregando ? (
              <div className="dashboard-info-item">
                <ImSpinner8 className="icon-spin" size={18} />
                Carregando clima...
              </div>
            ) : clima ? (
              <>
                {/* Exibe dados de clima caso existam */}
                <div className="dashboard-info-item">
                  <FiMapPin size={18} />
                  {clima.cidade}
                </div>
                <div className="dashboard-info-item">
                  <WiThermometer size={24} />
                  Temperatura: {clima.temperatura} °C
                </div>
                <div className="dashboard-info-item">
                  <WiHumidity size={24} />
                  Umidade: {clima.umidade}%
                </div>
                <div className="dashboard-info-item">
                  <WiDayCloudy size={24} />
                  Condição: {clima.condicao}
                </div>

                {/* Se houver alertas, exibe-os */}
                {clima.alertas?.length > 0 && (
                  <div className="dashboard-info-item">
                    <FiAlertTriangle size={18} />
                    {clima.alertas.join(", ")}
                  </div>
                )}
              </>
            ) : (
              // Caso não haja dados disponíveis
              <div className="dashboard-info-item">
                <FiAlertTriangle size={18} />
                Nenhum dado disponível.
              </div>
            )}
          </div>
        </div>

        {/* Coluna da direita com o gráfico */}
        {!carregando && clima && (
          <div className="dashboard-direita">
            <div className="grafico-clima">
              {/* Componente de gráfico com dados do clima */}
              <WeatherChart dados={clima} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Exporta o componente para ser usado nas rotas
export default Dashboard;