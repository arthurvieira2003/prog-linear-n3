"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import TeamCard from "@/components/TeamCard";
import TeamLogo from "@/components/TeamLogo";
import ChampionshipChart from "@/components/ChampionshipChart";
import ChampionsLigaTable from "@/components/ChampionsLigaTable";
import ChampionsPlayoffBracket from "@/components/ChampionsPlayoffBracket";
import ChampionsBracket from "@/components/ChampionsBracket";
import { timesChampions } from "@/lib/times-champions";
import { simularMultiplasChampions } from "@/lib/simulacao";
import MonteCarloExplainer from "@/components/MonteCarloExplainer";
import MonteCarloVisualizer from "@/components/MonteCarloVisualizer";
import SimulationStepVisualizer from "@/components/SimulationStepVisualizer";

export default function ChampionsLeaguePage() {
  const [times, setTimes] = useState(
    [...timesChampions].sort((a, b) => a.nome.localeCompare(b.nome))
  );
  const [resultado, setResultado] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numSimulacoes, setNumSimulacoes] = useState(1000);
  const [showResults, setShowResults] = useState(false);
  const [tabMode, setTabMode] = useState("probabilidades");
  const [currentSimulation, setCurrentSimulation] = useState(0);
  const [showStepVisualizer, setShowStepVisualizer] = useState(false);
  const [simulatedTeams, setSimulatedTeams] = useState({
    home: null,
    away: null,
  });

  const handleForceChange = (id, novaForca) => {
    setTimes((prevTimes) =>
      prevTimes.map((time) =>
        time.id === id ? { ...time, forca: novaForca } : time
      )
    );

    setResultado(null);
    setShowResults(false);
  };

  const randomizarForcas = () => {
    setTimes((prevTimes) =>
      prevTimes
        .map((time) => ({
          ...time,
          ataque: Math.floor(Math.random() * 30) + 70,
          meio: Math.floor(Math.random() * 30) + 70,
          defesa: Math.floor(Math.random() * 30) + 70,
          forca: Math.floor(Math.random() * 30) + 70,
        }))
        .sort((a, b) => a.nome.localeCompare(b.nome))
    );

    setResultado(null);
    setShowResults(false);
  };

  const simularCampeonato = () => {
    setIsLoading(true);
    setShowResults(false);
    setCurrentSimulation(0);

    // Simulamos um progresso artificial para a visualização
    const interval = setInterval(() => {
      setCurrentSimulation((prev) => {
        const next = prev + Math.floor(Math.random() * 50) + 10;
        return next >= numSimulacoes ? numSimulacoes : next;
      });
    }, 100);

    // Selecionar dois times aleatórios para a visualização passo a passo
    const timesSorteados = [...times].sort(() => Math.random() - 0.5);
    setSimulatedTeams({
      home: timesSorteados[0],
      away: timesSorteados[1],
    });
    setShowStepVisualizer(true);

    setTimeout(() => {
      const resultadoSimulacao = simularMultiplasChampions(
        times,
        numSimulacoes
      );
      setResultado(resultadoSimulacao);
      setIsLoading(false);
      setShowResults(true);
      clearInterval(interval);
    }, 1500);
  };

  const chartData = resultado?.times
    ? resultado.times.slice(0, 10).map((time) => ({
        nome: time.nome,
        valor: time.probabilidadeTitulo,
      }))
    : [];

  const chartColors = resultado?.times
    ? resultado.times.slice(0, 10).map((time) => `${time.cor}CC`)
    : [];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            UEFA Champions League 2024/25
          </h1>
        </motion.div>

        <div className="card mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Configuração da Simulação
              </h2>
            </div>

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-300">Simulações:</label>
                <select
                  value={numSimulacoes}
                  onChange={(e) => setNumSimulacoes(Number(e.target.value))}
                  className="input-field"
                >
                  <option value={100}>100</option>
                  <option value={500}>500</option>
                  <option value={1000}>1.000</option>
                  <option value={5000}>5.000</option>
                  <option value={10000}>10.000</option>
                </select>
              </div>

              <button onClick={randomizarForcas} className="btn-secondary">
                Randomizar Forças
              </button>

              <button
                onClick={simularCampeonato}
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Simulando...
                  </span>
                ) : (
                  "Simular Champions League"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Visualizador de Monte Carlo em tempo real (sempre visível durante a simulação) */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MonteCarloVisualizer
              isSimulating={isLoading}
              currentSimulation={currentSimulation}
              totalSimulations={numSimulacoes}
              initialTimes={times}
            />

            <SimulationStepVisualizer
              isVisible={showStepVisualizer}
              timeMandante={simulatedTeams.home}
              timeVisitante={simulatedTeams.away}
            />
          </motion.div>
        )}

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Times da Champions League</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {times.map((time, index) => (
              <TeamCard
                key={time.id}
                time={time}
                showStats={!!resultado}
                editable={true}
                onForceChange={handleForceChange}
                animationDelay={index * 0.05}
              />
            ))}
          </div>
        </div>

        {resultado && showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Resultados da Simulação</h2>

            <div className="flex justify-center mb-6">
              <div className="tab-navigation">
                <button
                  onClick={() => setTabMode("probabilidades")}
                  className={`tab-button ${
                    tabMode === "probabilidades" ? "active" : ""
                  }`}
                >
                  Probabilidades
                </button>
                <button
                  onClick={() => setTabMode("fase-liga")}
                  className={`tab-button ${
                    tabMode === "fase-liga" ? "active" : ""
                  }`}
                >
                  Fase de Liga
                </button>
                <button
                  onClick={() => setTabMode("playoffs")}
                  className={`tab-button ${
                    tabMode === "playoffs" ? "active" : ""
                  }`}
                >
                  Playoffs
                </button>
                <button
                  onClick={() => setTabMode("chaveamento")}
                  className={`tab-button ${
                    tabMode === "chaveamento" ? "active" : ""
                  }`}
                >
                  Eliminatórias
                </button>
                <button
                  onClick={() => {
                    setTabMode("monte-carlo");
                    setShowStepVisualizer(true);
                  }}
                  className={`tab-button ${
                    tabMode === "monte-carlo" ? "active" : ""
                  }`}
                >
                  Monte Carlo
                </button>
              </div>
            </div>

            {tabMode === "probabilidades" && (
              <div className="grid grid-cols-1 gap-8 mb-8">
                <ChampionshipChart
                  data={chartData}
                  title="Probabilidade de Título (%)"
                  colors={chartColors}
                  isLoading={isLoading}
                />

                <MonteCarloExplainer
                  isLoading={isLoading}
                  simulationCount={numSimulacoes}
                  currentSimulation={currentSimulation}
                  results={resultado}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card overflow-x-auto"
                >
                  <h3 className="text-xl font-bold mb-4">
                    Probabilidades Completas
                  </h3>

                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          #
                        </th>
                        <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Força
                        </th>
                        <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Títulos
                        </th>
                        <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Top 8
                        </th>
                        <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Eliminação
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {resultado.times.map((time, index) => (
                        <tr
                          key={time.id}
                          className={
                            index < 8
                              ? "bg-green-900/20"
                              : index >= resultado.times.length - 8
                              ? "bg-red-900/20"
                              : ""
                          }
                        >
                          <td className="py-2 text-sm">{index + 1}</td>
                          <td className="py-2 text-sm">
                            <div className="flex items-center">
                              <div className="w-6 h-6 mr-2 relative">
                                <TeamLogo team={time} size={24} />
                              </div>
                              {time.nome}
                            </div>
                          </td>
                          <td className="py-2 text-sm text-center">
                            {time.forca}
                          </td>
                          <td className="py-2 text-sm text-center font-bold text-green-500">
                            {time.titulos} (
                            {time.probabilidadeTitulo.toFixed(1)}%)
                          </td>
                          <td className="py-2 text-sm text-center">
                            {time.top8} ({time.probabilidadeTop8.toFixed(1)}%)
                          </td>
                          <td className="py-2 text-sm text-center font-bold text-red-500">
                            {time.eliminadoLiga} (
                            {time.probabilidadeEliminacao.toFixed(1)}%)
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              </div>
            )}

            {tabMode === "fase-liga" && (
              <ChampionsLigaTable
                classificacao={
                  resultado.simulacaoDetalhada.faseLiga.classificacao
                }
              />
            )}

            {tabMode === "playoffs" && (
              <ChampionsPlayoffBracket
                confrontos={resultado.simulacaoDetalhada.playoff.confrontos}
              />
            )}

            {tabMode === "chaveamento" && (
              <ChampionsBracket
                chaveamento={resultado.simulacaoDetalhada.faseEliminatoria}
              />
            )}

            {tabMode === "monte-carlo" && (
              <div className="grid grid-cols-1 gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="card mb-6">
                    <h3 className="text-xl font-bold mb-4">
                      Visualização do Método Monte Carlo
                    </h3>
                    <p className="mb-4">
                      Esta visualização mostra como o método Monte Carlo é
                      aplicado para simular os resultados da Champions League.
                      Cada simulação gera milhares de resultados aleatórios
                      baseados nas forças dos times, permitindo calcular
                      probabilidades reais.
                    </p>

                    <div className="bg-blue-900/20 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold mb-2">Como funciona:</h4>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>
                          <strong>Simulação de partidas</strong>: Cada partida é
                          simulada usando probabilidades baseadas na força dos
                          times
                        </li>
                        <li>
                          <strong>Simulação completa</strong>: Todo o torneio é
                          simulado do início ao fim
                        </li>
                        <li>
                          <strong>Repetição</strong>: O processo é repetido
                          milhares de vezes (Monte Carlo)
                        </li>
                        <li>
                          <strong>Estatísticas</strong>: Os resultados são
                          agregados para calcular probabilidades
                        </li>
                      </ol>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          const timesSorteados = [...times].sort(
                            () => Math.random() - 0.5
                          );
                          setSimulatedTeams({
                            home: timesSorteados[0],
                            away: timesSorteados[1],
                          });
                          setShowStepVisualizer(true);
                        }}
                        className="btn-primary"
                      >
                        Simular Nova Partida
                      </button>
                    </div>
                  </div>

                  <SimulationStepVisualizer
                    isVisible={showStepVisualizer}
                    timeMandante={simulatedTeams.home}
                    timeVisitante={simulatedTeams.away}
                  />
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
