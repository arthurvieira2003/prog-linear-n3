"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TeamCard from "@/components/TeamCard";
import ChampionshipChart from "@/components/ChampionshipChart";
import { timesCopa } from "@/lib/times-copa";
import {
  simularMultiplasCopas,
  simularCopaMundo,
  simularPartidaComGols,
} from "@/lib/simulacao";
import TeamLogo from "@/components/TeamLogo";
import Navbar from "@/components/Navbar";
import GroupTable from "@/components/GroupTable";
import WorldCupBracket from "@/components/WorldCupBracket";

export default function CopaMundoPage() {
  const [times, setTimes] = useState([...timesCopa]);
  const [resultado, setResultado] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numSimulacoes, setNumSimulacoes] = useState(1000);
  const [showResults, setShowResults] = useState(false);
  const [ultimaCopa, setUltimaCopa] = useState(null);
  const [tabMode, setTabMode] = useState("times");

  const handleForceChange = (id, novaForca) => {
    setTimes((prevTimes) =>
      prevTimes.map((time) =>
        time.id === id ? { ...time, forca: novaForca } : time
      )
    );

    setResultado(null);
    setUltimaCopa(null);
  };

  const handleAttributeChange = (id, atributo, novoValor) => {
    setTimes((prevTimes) =>
      prevTimes.map((time) => {
        if (time.id === id) {
          const timeAtualizado = { ...time, [atributo]: novoValor };

          timeAtualizado.forca = Math.round(
            (timeAtualizado.ataque +
              timeAtualizado.meio +
              timeAtualizado.defesa) /
              3
          );

          return timeAtualizado;
        }
        return time;
      })
    );

    setResultado(null);
    setUltimaCopa(null);
  };

  const randomizarForcas = () => {
    setTimes((prevTimes) =>
      prevTimes.map((time) => {
        const ataque = Math.floor(Math.random() * 30) + 70;
        const meio = Math.floor(Math.random() * 30) + 70;
        const defesa = Math.floor(Math.random() * 30) + 70;

        return {
          ...time,
          ataque,
          meio,
          defesa,
          forca: Math.round((ataque + meio + defesa) / 3),
        };
      })
    );

    setResultado(null);
    setUltimaCopa(null);
  };

  const simularCopas = () => {
    setIsLoading(true);
    setShowResults(false);

    setTimeout(() => {
      const resultadoSimulacao = simularMultiplasCopas(times, numSimulacoes);

      const resultadoCompleto = resultadoSimulacao.map((time) => ({
        ...time,

        oitavas: time.oitavas || 0,
        quartas: time.quartas || 0,
        semifinais: time.semifinais || 0,
        vices: time.vices || 0,
        titulos: time.titulos || 0,
        probabilidadeOitavas:
          time.probabilidadeOitavas ||
          (time.oitavas / numSimulacoes) * 100 ||
          0,
        probabilidadeQuartas:
          time.probabilidadeQuartas ||
          (time.quartas / numSimulacoes) * 100 ||
          0,
        probabilidadeSemi:
          time.probabilidadeSemi ||
          (time.semifinais / numSimulacoes) * 100 ||
          0,
        probabilidadeVice:
          time.probabilidadeVice || (time.vices / numSimulacoes) * 100 || 0,
        probabilidadeTitulo:
          time.probabilidadeTitulo || (time.titulos / numSimulacoes) * 100 || 0,
      }));

      setResultado(resultadoCompleto);

      const umaCopa = simularCopaMundo(times);

      if (umaCopa && umaCopa.faseGrupos) {
        Object.entries(umaCopa.faseGrupos).forEach(([grupo, times]) => {
          times.forEach((time) => {
            if (
              time.vitorias === 0 &&
              time.empates === 0 &&
              time.derrotas === 0
            ) {
              console.warn(
                `Time com estatísticas zeradas: ${time.nome} (Grupo ${grupo})`
              );
            }
          });
        });
      }

      const faseGruposProcessada = {};

      if (umaCopa && umaCopa.faseGrupos) {
        Object.entries(umaCopa.faseGrupos).forEach(([grupo, dadosGrupo]) => {
          const partidas = [];
          for (let i = 0; i < dadosGrupo.length; i++) {
            for (let j = i + 1; j < dadosGrupo.length; j++) {
              const timeA = dadosGrupo[i];
              const timeB = dadosGrupo[j];

              const resultado = simularPartidaComGols(timeA, timeB);

              partidas.push({
                timeA,
                timeB,
                golsA: resultado.golsA,
                golsB: resultado.golsB,
              });
            }
          }

          const timesRecalculados = dadosGrupo.map((time) => ({
            ...time,
            pontos: 0,
            jogos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            golsPro: 0,
            golsContra: 0,
            saldoGols: 0,
          }));

          partidas.forEach((partida) => {
            const idxTimeA = timesRecalculados.findIndex(
              (t) => t.id === partida.timeA.id
            );
            const idxTimeB = timesRecalculados.findIndex(
              (t) => t.id === partida.timeB.id
            );

            if (idxTimeA === -1 || idxTimeB === -1) return;

            timesRecalculados[idxTimeA].jogos++;
            timesRecalculados[idxTimeB].jogos++;

            timesRecalculados[idxTimeA].golsPro += partida.golsA;
            timesRecalculados[idxTimeA].golsContra += partida.golsB;
            timesRecalculados[idxTimeB].golsPro += partida.golsB;
            timesRecalculados[idxTimeB].golsContra += partida.golsA;

            if (partida.golsA > partida.golsB) {
              timesRecalculados[idxTimeA].vitorias++;
              timesRecalculados[idxTimeA].pontos += 3;
              timesRecalculados[idxTimeB].derrotas++;
            } else if (partida.golsA < partida.golsB) {
              timesRecalculados[idxTimeB].vitorias++;
              timesRecalculados[idxTimeB].pontos += 3;
              timesRecalculados[idxTimeA].derrotas++;
            } else {
              timesRecalculados[idxTimeA].empates++;
              timesRecalculados[idxTimeB].empates++;
              timesRecalculados[idxTimeA].pontos += 1;
              timesRecalculados[idxTimeB].pontos += 1;
            }
          });

          timesRecalculados.forEach((time) => {
            time.saldoGols = time.golsPro - time.golsContra;
          });

          timesRecalculados.sort((a, b) => {
            if (a.pontos !== b.pontos) return b.pontos - a.pontos;
            if (a.saldoGols !== b.saldoGols) return b.saldoGols - a.saldoGols;
            if (a.golsPro !== b.golsPro) return b.golsPro - a.golsPro;
            return 0;
          });

          const verificarInconsistencias = (times, partidas, grupo) => {
            times.forEach((time) => {
              let vitorias = 0;
              let empates = 0;
              let derrotas = 0;
              let golsPro = 0;
              let golsContra = 0;

              partidas.forEach((partida) => {
                if (partida.timeA.id === time.id) {
                  if (partida.golsA > partida.golsB) vitorias++;
                  else if (partida.golsA === partida.golsB) empates++;
                  else derrotas++;
                  golsPro += partida.golsA;
                  golsContra += partida.golsB;
                } else if (partida.timeB.id === time.id) {
                  if (partida.golsB > partida.golsA) vitorias++;
                  else if (partida.golsB === partida.golsA) empates++;
                  else derrotas++;
                  golsPro += partida.golsB;
                  golsContra += partida.golsA;
                }
              });

              if (
                vitorias !== time.vitorias ||
                empates !== time.empates ||
                derrotas !== time.derrotas ||
                golsPro !== time.golsPro ||
                golsContra !== time.golsContra
              ) {
                console.warn(
                  `Inconsistência encontrada para ${time.nome} no grupo ${grupo}:`
                );
                console.warn(
                  `Na tabela: V=${time.vitorias}, E=${time.empates}, D=${time.derrotas}, GP=${time.golsPro}, GC=${time.golsContra}`
                );
                console.warn(
                  `Nas partidas: V=${vitorias}, E=${empates}, D=${derrotas}, GP=${golsPro}, GC=${golsContra}`
                );
              }
            });
          };

          verificarInconsistencias(timesRecalculados, partidas, grupo);

          faseGruposProcessada[grupo] = {
            classificacao: timesRecalculados,
            partidas,
          };
        });

        umaCopa.faseGrupos = faseGruposProcessada;

        if (umaCopa && umaCopa.faseGrupos) {
          const classificados = {};
          Object.entries(umaCopa.faseGrupos).forEach(([grupo, dados]) => {
            classificados[grupo] = dados.classificacao.slice(0, 2);
          });

          const oitavas = [
            {
              id: 1,
              timeA: classificados["A"][0],
              timeB: classificados["B"][1],
            },
            {
              id: 2,
              timeA: classificados["C"][0],
              timeB: classificados["D"][1],
            },
            {
              id: 3,
              timeA: classificados["E"][0],
              timeB: classificados["F"][1],
            },
            {
              id: 4,
              timeA: classificados["G"][0],
              timeB: classificados["H"][1],
            },
            {
              id: 5,
              timeA: classificados["B"][0],
              timeB: classificados["A"][1],
            },
            {
              id: 6,
              timeA: classificados["D"][0],
              timeB: classificados["C"][1],
            },
            {
              id: 7,
              timeA: classificados["F"][0],
              timeB: classificados["E"][1],
            },
            {
              id: 8,
              timeA: classificados["H"][0],
              timeB: classificados["G"][1],
            },
          ];

          const processarPartidas = (partidas) => {
            return partidas.map((partida) => {
              const resultado = simularPartidaComGols(
                partida.timeA,
                partida.timeB,
                true
              );

              const resultadoProcessado = {
                ...partida,
                golsA: resultado.golsA,
                golsB: resultado.golsB,
                vencedor:
                  resultado.golsA > resultado.golsB
                    ? partida.timeA
                    : partida.timeB,
              };

              if (resultado.golsA === resultado.golsB) {
                const penaltisA = 3 + Math.floor(Math.random() * 3);
                let penaltisB = 3 + Math.floor(Math.random() * 3);

                if (penaltisA === penaltisB) {
                  if (Math.random() < 0.5) {
                    penaltisB -= 1;
                  } else {
                    penaltisB = Math.min(5, penaltisB + 1);
                  }
                }

                resultadoProcessado.penaltisA = penaltisA;
                resultadoProcessado.penaltisB = penaltisB;
                resultadoProcessado.vencedor =
                  penaltisA > penaltisB ? partida.timeA : partida.timeB;
              }

              return resultadoProcessado;
            });
          };

          const resultadosOitavas = processarPartidas(oitavas);

          const quartas = [
            {
              id: 1,
              timeA: resultadosOitavas[0].vencedor,
              timeB: resultadosOitavas[1].vencedor,
            },
            {
              id: 2,
              timeA: resultadosOitavas[2].vencedor,
              timeB: resultadosOitavas[3].vencedor,
            },
            {
              id: 3,
              timeA: resultadosOitavas[4].vencedor,
              timeB: resultadosOitavas[5].vencedor,
            },
            {
              id: 4,
              timeA: resultadosOitavas[6].vencedor,
              timeB: resultadosOitavas[7].vencedor,
            },
          ];

          const resultadosQuartas = processarPartidas(quartas);

          const semifinais = [
            {
              id: 1,
              timeA: resultadosQuartas[0].vencedor,
              timeB: resultadosQuartas[1].vencedor,
            },
            {
              id: 2,
              timeA: resultadosQuartas[2].vencedor,
              timeB: resultadosQuartas[3].vencedor,
            },
          ];

          const resultadosSemifinais = processarPartidas(semifinais);

          const final = {
            timeA: resultadosSemifinais[0].vencedor,
            timeB: resultadosSemifinais[1].vencedor,
          };
          const resultadoFinal = processarPartidas([final])[0];

          umaCopa.faseEliminatoria = {
            oitavas: resultadosOitavas,
            quartas: resultadosQuartas,
            semifinais: resultadosSemifinais,
            final: resultadoFinal,
            campeao: resultadoFinal.vencedor,
            vice:
              resultadoFinal.vencedor === final.timeA
                ? final.timeB
                : final.timeA,
          };
        }
      }

      setUltimaCopa(umaCopa);
      setIsLoading(false);
      setShowResults(true);
      setTabMode("grupos");
    }, 100);
  };

  const chartData = resultado
    ? resultado.slice(0, 10).map((time) => ({
        nome: time.nome,
        valor: time.probabilidadeTitulo,
      }))
    : [];

  const timesPorGrupo = {};
  times.forEach((time) => {
    if (!timesPorGrupo[time.grupo]) {
      timesPorGrupo[time.grupo] = [];
    }
    timesPorGrupo[time.grupo].push(time);
  });

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
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent mb-2">
            Simulação da Copa do Mundo 2022
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
                onClick={simularCopas}
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
                  "Simular Copa do Mundo"
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="tab-navigation">
            <button
              onClick={() => setTabMode("times")}
              className={`tab-button ${tabMode === "times" ? "active" : ""}`}
            >
              Seleções
            </button>
            {showResults && (
              <>
                <button
                  onClick={() => setTabMode("grupos")}
                  className={`tab-button ${
                    tabMode === "grupos" ? "active" : ""
                  }`}
                >
                  Fase de Grupos
                </button>
                <button
                  onClick={() => setTabMode("chaveamento")}
                  className={`tab-button ${
                    tabMode === "chaveamento" ? "active" : ""
                  }`}
                >
                  Chaveamento
                </button>
                <button
                  onClick={() => setTabMode("probabilidades")}
                  className={`tab-button ${
                    tabMode === "probabilidades" ? "active" : ""
                  }`}
                >
                  Probabilidades
                </button>
              </>
            )}
          </div>
        </div>

        {tabMode === "times" && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Seleções por Grupo</h2>
            {Object.keys(timesPorGrupo)
              .sort()
              .map((grupo) => (
                <div key={grupo} className="mb-6">
                  <h3 className="text-xl font-bold mb-3 bg-blue-900/30 p-2 rounded">
                    Grupo {grupo}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {timesPorGrupo[grupo].map((time, index) => (
                      <TeamCard
                        key={time.id}
                        time={time}
                        showStats={!!resultado}
                        editable={true}
                        onForceChange={(id, novaForca) =>
                          handleForceChange(id, novaForca)
                        }
                        onAttributeChange={handleAttributeChange}
                        animationDelay={index * 0.05}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        {tabMode === "grupos" && ultimaCopa && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Fase de Grupos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(ultimaCopa.faseGrupos).map(([grupo, dados]) => (
                <GroupTable
                  key={grupo}
                  nomeGrupo={grupo}
                  grupo={dados.classificacao}
                  partidas={dados.partidas}
                />
              ))}
            </div>
          </motion.div>
        )}

        {tabMode === "chaveamento" && ultimaCopa && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <WorldCupBracket chaveamento={ultimaCopa.faseEliminatoria} />
          </motion.div>
        )}

        {tabMode === "probabilidades" && resultado && showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Probabilidades</h2>

            <ChampionshipChart
              data={chartData}
              title="Probabilidade de Título (%)"
              isLoading={isLoading}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card mt-8 overflow-x-auto"
            >
              <h3 className="text-xl font-bold mb-4">
                Probabilidades Detalhadas
              </h3>
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Posição
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Seleção
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Títulos
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      %
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Vice
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      %
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Semifinal
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      %
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Quartas
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      %
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Oitavas
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      %
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {resultado.map((time, index) => (
                    <tr
                      key={time.id}
                      className={index % 2 === 0 ? "bg-gray-800/30" : ""}
                    >
                      <td className="py-2 px-4 whitespace-nowrap">
                        <div className="text-sm font-medium">{index + 1}</div>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 relative">
                            <TeamLogo team={time} size={32} />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium">
                              {time.nome}
                            </div>
                            <div className="text-xs text-gray-400">
                              Grupo {time.grupo}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-center">
                        <div className="text-sm font-semibold">
                          {time.titulos}
                        </div>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-center">
                        <div className="text-sm font-bold text-yellow-400">
                          {time.probabilidadeTitulo.toFixed(1)}%
                        </div>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-center">
                        <div className="text-sm font-semibold">
                          {time.vices}
                        </div>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-gray-300">
                          {time.probabilidadeVice.toFixed(1)}%
                        </div>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-center">
                        <div className="text-sm font-semibold">
                          {time.semifinais}
                        </div>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-300">
                          {time.probabilidadeSemi.toFixed(1)}%
                        </div>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-center">
                        <div className="text-sm font-semibold">
                          {time.quartas}
                        </div>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-300">
                          {time.probabilidadeQuartas.toFixed(1)}%
                        </div>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-center">
                        <div className="text-sm font-semibold">
                          {time.oitavas}
                        </div>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-300">
                          {time.probabilidadeOitavas.toFixed(1)}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
