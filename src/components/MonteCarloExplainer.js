import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MonteCarloExplainer({
  isLoading,
  simulationCount,
  currentSimulation,
  results,
  topTeams = 5,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);

  // Simular progresso durante carregamento
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setSimulationProgress((prev) => {
          const newProgress = prev + Math.random() * 5;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 150);

      return () => clearInterval(interval);
    } else {
      setSimulationProgress(0);
    }
  }, [isLoading]);

  // Preparar dados para visualização
  const topTeamsData = results?.times?.slice(0, topTeams) || [];

  // Calcular a margem de erro para o Monte Carlo
  // Fórmula: margem de erro = 1 / raiz(n), onde n é o número de simulações
  const marginOfError = simulationCount
    ? ((1 / Math.sqrt(simulationCount)) * 100).toFixed(2)
    : 0;

  return (
    <motion.div
      className="card mt-8"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Método de Monte Carlo: Matemática por Trás das Simulações
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm"
        >
          {showDetails ? "Ocultar Detalhes" : "Mostrar Detalhes"}
        </button>
      </div>

      {isLoading ? (
        <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
          <h4 className="text-lg font-semibold mb-3">Simulação em Andamento</h4>

          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm">Progresso da Simulação</span>
              <span className="text-sm">{Math.round(simulationProgress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${simulationProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                Cada simulação gera um resultado aleatório baseado na força de
                cada time.
              </p>
              <p className="text-sm text-gray-400">
                Quanto mais simulações, maior a precisão dos resultados.
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{simulationCount}</div>
              <div className="text-xs text-gray-400">Simulações</div>
            </div>
          </div>
        </div>
      ) : results ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">
                Resultados do Monte Carlo
              </h4>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Número de Simulações</span>
                  <span className="font-bold">{simulationCount}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Margem de Erro (95% confiança)</span>
                  <span className="font-bold">±{marginOfError}%</span>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                A precisão aumenta com a raiz quadrada do número de simulações.
                Duplicar o número de simulações melhora a precisão em ~1.4x.
              </p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">
                Distribuição de Probabilidades
              </h4>

              <div className="space-y-2">
                {topTeamsData.map((team, index) => (
                  <div key={team.id} className="flex items-center">
                    <div className="w-6 h-6 mr-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: team.cor }}
                      ></div>
                    </div>
                    <div className="flex-1 flex items-center">
                      <span className="text-sm mr-2">{team.nome}</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${team.probabilidadeTitulo}%`,
                            backgroundColor: team.cor,
                            maxWidth: "100%",
                          }}
                        ></div>
                      </div>
                      <span className="text-sm ml-2 font-bold">
                        {team.probabilidadeTitulo.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showDetails && (
            <motion.div
              className="mt-6 bg-gray-800/30 p-4 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-3">
                Detalhes Matemáticos
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2">
                    Cálculo da Probabilidade
                  </h5>
                  <div className="bg-gray-900/70 p-3 rounded mb-2 font-mono">
                    <p>P(time campeão) = N(vitórias) / N(simulações)</p>
                    <p className="mt-2 text-gray-400">
                      Exemplo para o {topTeamsData[0]?.nome || "time líder"}:
                    </p>
                    <p>
                      P = {topTeamsData[0]?.titulos || 0} / {simulationCount} ={" "}
                      {topTeamsData[0]?.probabilidadeTitulo.toFixed(4) || 0}%
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">
                    A frequência relativa de um evento converge para sua
                    probabilidade real quando o número de simulações tende ao
                    infinito.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">
                    Erro e Intervalo de Confiança
                  </h5>
                  <div className="bg-gray-900/70 p-3 rounded mb-2 font-mono">
                    <p>Erro padrão = √(p(1-p)/n)</p>
                    <p>onde p = probabilidade e n = número de simulações</p>
                    <p className="mt-2">
                      Margem de erro (95% confiança) ≈ 1/√n
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Com {simulationCount} simulações, a margem de erro é de
                    aproximadamente ±{marginOfError}%. Isso significa que os
                    resultados reais provavelmente estão dentro dessa margem.
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="font-semibold mb-2">
                  Método de Monte Carlo na Simulação
                </h5>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>
                    Para cada simulação, geramos resultados aleatórios com base
                    nas forças dos times
                  </li>
                  <li>
                    Cada partida é simulada independentemente com probabilidades
                    baseadas na diferença de força
                  </li>
                  <li>
                    Agregamos os resultados de todas as simulações para calcular
                    probabilidades
                  </li>
                  <li>
                    Quanto maior o número de simulações, mais precisos são os
                    resultados (Lei dos Grandes Números)
                  </li>
                </ol>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="text-gray-400 text-center py-4">
          Inicie uma simulação para visualizar os dados matemáticos
        </div>
      )}
    </motion.div>
  );
}
