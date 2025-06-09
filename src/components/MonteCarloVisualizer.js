import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MonteCarloVisualizer({
  isSimulating,
  currentSimulation,
  totalSimulations,
  initialTimes = [],
}) {
  const [simulationHistory, setSimulationHistory] = useState([]);
  const [sampledResults, setSampledResults] = useState([]);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const maxStoredResults = 100; // Limite de resultados para não sobrecarregar a memória

  // Zerar o histórico quando uma nova simulação começar
  useEffect(() => {
    if (isSimulating && currentSimulation === 0) {
      setSimulationHistory([]);
      setSampledResults([]);
    }
  }, [isSimulating, currentSimulation]);

  // Gerar um resultado simulado cada vez que currentSimulation mudar
  useEffect(() => {
    if (!isSimulating || currentSimulation === 0 || initialTimes.length === 0)
      return;

    // Criamos uma simulação falsa em tempo real para demonstração
    const generateRandomResult = () => {
      // Selecionar um time aleatório como campeão da simulação atual
      const campeaoIndex = Math.floor(Math.random() * initialTimes.length);
      const times = initialTimes.map((time, index) => {
        // A probabilidade de ser campeão é influenciada pela força do time
        const probabilidade = time.forca / 100;
        const isCampeao = index === campeaoIndex;

        return {
          ...time,
          isCampeao,
          pontos: Math.floor(Math.random() * 20) + (isCampeao ? 10 : 0),
        };
      });

      // Ordenar por pontos para criar um ranking mais realista
      return times.sort((a, b) => b.pontos - a.pontos);
    };

    // Gera um novo resultado e o adiciona ao histórico
    const novoResultado = {
      simulacaoNumero: currentSimulation,
      times: generateRandomResult(),
      timestamp: Date.now(),
    };

    // Adicionar ao histórico completo
    setSimulationHistory((prev) => {
      const newHistory = [...prev, novoResultado];
      // Manter apenas os últimos maxStoredResults para não sobrecarregar a memória
      return newHistory.slice(-maxStoredResults);
    });

    // Amostrar alguns resultados para visualização
    // A cada X simulações, guardamos uma para mostrar a evolução
    if (currentSimulation % Math.ceil(totalSimulations / 20) === 0) {
      setSampledResults((prev) => [...prev, novoResultado]);
    }
  }, [currentSimulation, isSimulating, initialTimes, totalSimulations]);

  // Calcula estatísticas em tempo real a partir do histórico
  const calcularEstatisticas = () => {
    if (simulationHistory.length === 0) return [];

    // Inicializar contadores para cada time
    const estatisticas = {};
    initialTimes.forEach((time) => {
      estatisticas[time.id] = {
        id: time.id,
        nome: time.nome,
        cor: time.cor,
        forca: time.forca,
        titulos: 0,
        simulacoes: simulationHistory.length,
      };
    });

    // Contar os títulos de cada time no histórico
    simulationHistory.forEach((simulacao) => {
      const campeao = simulacao.times.find((time) => time.isCampeao);
      if (campeao && estatisticas[campeao.id]) {
        estatisticas[campeao.id].titulos += 1;
      }
    });

    // Converter para array e calcular probabilidades
    return Object.values(estatisticas)
      .map((time) => ({
        ...time,
        probabilidade: (time.titulos / time.simulacoes) * 100,
      }))
      .sort((a, b) => b.probabilidade - a.probabilidade);
  };

  const estatisticasAtuais = calcularEstatisticas();
  const top5Times = estatisticasAtuais.slice(0, 5);

  // Simulações por segundo (estimativa)
  const estimatedSimulationsPerSecond = simulationSpeed * 10;

  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-4 my-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Visualizador Monte Carlo em Tempo Real
        </h3>

        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-300">Velocidade:</label>
          <select
            value={simulationSpeed}
            onChange={(e) => setSimulationSpeed(Number(e.target.value))}
            className="bg-gray-700 rounded px-2 py-1 text-sm"
            disabled={isSimulating}
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={5}>5x</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Progresso da simulação */}
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">Progresso</h4>

          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm">Simulação atual</span>
              <span className="text-sm font-bold">
                {currentSimulation.toLocaleString()} /{" "}
                {totalSimulations.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{
                  width: `${(currentSimulation / totalSimulations) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Velocidade estimada:</span>
              <span className="text-sm font-bold">
                {estimatedSimulationsPerSecond.toFixed(1)} sim/s
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Tempo estimado restante:</span>
              <span className="text-sm font-bold">
                {isSimulating
                  ? (
                      (totalSimulations - currentSimulation) /
                      estimatedSimulationsPerSecond
                    ).toFixed(1) + "s"
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Resultados parciais */}
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">
            Probabilidades Parciais
          </h4>

          {top5Times.length > 0 ? (
            <div className="space-y-3">
              {top5Times.map((time) => (
                <div key={time.id} className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: time.cor }}
                      ></div>
                      {time.nome}
                    </span>
                    <span className="text-sm font-bold">
                      {time.probabilidade.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${time.probabilidade}%`,
                        backgroundColor: time.cor,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-center py-4">
              Aguardando dados da simulação...
            </div>
          )}
        </div>
      </div>

      {/* Gráfico de evolução das probabilidades */}
      {sampledResults.length > 1 && (
        <div className="mt-4 bg-gray-700/50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">
            Evolução das Probabilidades
          </h4>

          <div className="h-60 relative">
            {/* Linhas horizontais de referência */}
            {[0, 25, 50, 75, 100].map((percent) => (
              <div
                key={percent}
                className="absolute w-full h-px bg-gray-600"
                style={{ bottom: `${percent}%`, left: 0 }}
              >
                <span
                  className="absolute text-xs text-gray-400"
                  style={{ left: -25, bottom: 2 }}
                >
                  {100 - percent}%
                </span>
              </div>
            ))}

            {/* Trajetória de cada time do top 5 */}
            {top5Times.map((time, timeIndex) => {
              // Calcular pontos do gráfico para este time
              const dataPoints = sampledResults.map((result, index) => {
                // Encontrar este time nos resultados desta amostra
                const timeData = result.times.find((t) => t.id === time.id);
                const isCampeao = timeData?.isCampeao || false;

                // Calcular a posição x e y de cada ponto
                const x = (index / (sampledResults.length - 1)) * 100;

                // A probabilidade é baseada na frequência de vitórias até este ponto
                const previousResults = sampledResults.slice(0, index + 1);
                const wins = previousResults.filter((r) =>
                  r.times.find((t) => t.id === time.id && t.isCampeao)
                ).length;

                const probability = (wins / previousResults.length) * 100;
                const y = 100 - probability; // Inverter para desenhar de baixo para cima

                return { x, y, isCampeao };
              });

              // Converter os pontos para um path de SVG
              const pathD = dataPoints
                .map(
                  (point, i) => `${i === 0 ? "M" : "L"} ${point.x}% ${point.y}%`
                )
                .join(" ");

              return (
                <svg
                  key={time.id}
                  className="absolute inset-0 h-full w-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <path
                    d={pathD}
                    fill="none"
                    stroke={time.cor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Círculos nos pontos onde o time foi campeão */}
                  {dataPoints.map(
                    (point, i) =>
                      point.isCampeao && (
                        <circle
                          key={i}
                          cx={`${point.x}%`}
                          cy={`${point.y}%`}
                          r="3"
                          fill={time.cor}
                        />
                      )
                  )}
                </svg>
              );
            })}

            {/* Legenda */}
            <div className="absolute top-2 right-2 bg-gray-800/80 p-2 rounded-md">
              {top5Times.map((time) => (
                <div key={time.id} className="flex items-center text-xs mb-1">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: time.cor }}
                  ></div>
                  <span>{time.nome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400 italic">
        * As probabilidades são calculadas com base nas simulações realizadas
        até o momento. Quanto mais simulações, mais precisos serão os resultados
        finais.
      </div>
    </motion.div>
  );
}
