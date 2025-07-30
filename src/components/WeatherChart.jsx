// Importa o componente de linha do react-chartjs-2
import { Line } from 'react-chartjs-2';

// Importa os módulos necessários da Chart.js
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,  // eixo X
  LinearScale,    // eixo Y
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Faz o registro obrigatório dos elementos usados no gráfico
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Componente que exibe o gráfico de temperatura
function WeatherChart({ dados }) {
  // Se não houver dados ou previsão por hora, não renderiza nada
  if (!dados || !dados.previsaoHoras) return null;

  // Extrai os horários (HH:MM) para exibir no eixo X
  const labels = dados.previsaoHoras.map((hora) =>
    hora.hora.split(' ')[1].slice(0, 5)
  );

  // Extrai as temperaturas para cada hora
  const temperaturas = dados.previsaoHoras.map((hora) => hora.temp_c);

  // Dados do gráfico
  const data = {
    labels, // Eixo X: horários
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: temperaturas, // Eixo Y: valores
        fill: true,
        borderColor: '#00ff99',
        backgroundColor: 'rgba(0, 255, 153, 0.08)',
        pointBorderColor: '#00ff99',
        pointBackgroundColor: '#00ff99',
        tension: 0.3, // Curvatura suave da linha
      },
    ],
  };

  // Opções de aparência e comportamento do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ccffcc',
          font: { size: 14 },
          usePointStyle: true,
          pointStyle: 'line',
        },
      },
      tooltip: {
        backgroundColor: '#1a1a2a',
        titleColor: '#00ff99',
        bodyColor: '#ccffcc',
        borderColor: '#00ff99',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: '#88ffaa' },
        grid: { color: 'rgba(0, 255, 153, 0.05)' },
      },
      y: {
        ticks: {
          color: '#88ffaa',
          callback: (value) => `${value}°C`,
        },
        grid: { color: 'rgba(0, 255, 153, 0.05)' },
      },
    },
  };

  // Estrutura visual com estilo personalizado
  return (
    <div
      style={{
        width: '100%',
        padding: '1rem',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          background: 'rgba(0, 255, 100, 0.02)',
          border: '1px solid rgba(0, 255, 100, 0.1)',
          borderRadius: '1rem',
          padding: '1.5rem 1rem',
          boxShadow: '0 0 12px rgba(0, 255, 100, 0.15)',
          boxSizing: 'border-box',
        }}
      >
        {/* Título do gráfico */}
        <h3
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: '#ccffcc',
            fontSize: '1.4rem',
            fontWeight: '600',
            marginBottom: '1.2rem',
            textAlign: 'center',
          }}
        >
          {/* Ícone SVG de clima */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#00ff99"
            viewBox="0 0 24 24"
          >
            <path d="M12 4a5 5 0 0 0-4.546 2.916A4.998 4.998 0 0 0 4 11a5 5 0 1 0 1.708 9.708A6.994 6.994 0 0 0 12 20a6.978 6.978 0 0 0 6.292-4H19a5 5 0 1 0-7-12z" />
          </svg>
          Variação da Temperatura ao Longo do Dia
        </h3>

        {/* Container com scroll horizontal se necessário */}
        <div
          style={{
            width: '100%',
            overflowX: 'auto',
            paddingBottom: '1rem',
          }}
        >
          {/* Container do gráfico com altura e largura mínimas definidas */}
          <div
            style={{
              width: '100%',
              minWidth: '600px', // Garante boa visualização
              height: '300px',
            }}
          >
            {/* Renderiza o gráfico com os dados e opções configuradas */}
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporta o componente para uso nas páginas
export default WeatherChart;