"use client";

import React from "react";
import { motion } from "framer-motion";
import TeamLogo from "./TeamLogo";

export default function WorldCupBracket({ chaveamento }) {
  if (!chaveamento) {
    return (
      <div className="card p-6 text-center text-gray-400">
        Nenhum chaveamento disponível
      </div>
    );
  }

  const { oitavas, quartas, semifinais, final, campeao } = chaveamento;

  const renderPartida = (partida, fase) => {
    if (!partida || !partida.timeA || !partida.timeB) return null;

    const temPenaltis =
      partida.penaltisA !== undefined && partida.penaltisB !== undefined;
    const resultadoA = partida.golsA;
    const resultadoB = partida.golsB;
    const vencedor = partida.vencedor;

    const timeAClasses = `col-span-4 flex items-center ${
      vencedor && vencedor.id === partida.timeA.id
        ? "font-bold text-green-400"
        : ""
    }`;
    const timeBClasses = `col-span-4 flex items-center ${
      vencedor && vencedor.id === partida.timeB.id
        ? "font-bold text-green-400"
        : ""
    }`;

    const timeAStyle = {
      background: `linear-gradient(135deg, ${
        partida.timeA.cor || "#1e293b"
      } 0%, ${
        partida.timeA.corSecundaria || partida.timeA.cor || "#1e293b"
      } 100%)`,
      opacity: 0.2,
    };

    const timeBStyle = {
      background: `linear-gradient(135deg, ${
        partida.timeB.cor || "#1e293b"
      } 0%, ${
        partida.timeB.corSecundaria || partida.timeB.cor || "#1e293b"
      } 100%)`,
      opacity: 0.2,
    };

    // Função para limitar nomes muito longos
    const limitarNome = (nome) => {
      if (nome.length > 12) {
        return nome.substring(0, 10) + "...";
      }
      return nome;
    };

    return (
      <div
        className={`match-card p-3 rounded-lg shadow-md ${fase} relative overflow-hidden backdrop-blur-sm w-[290px] border border-gray-700 bg-gray-800`}
      >
        <div className="absolute inset-0 top-0 h-1/2" style={timeAStyle}></div>
        <div
          className="absolute inset-0 top-1/2 h-1/2"
          style={timeBStyle}
        ></div>

        <div className="relative z-1">
          <div className="grid grid-cols-12 items-center mb-2">
            <div className={timeAClasses}>
              <div className="flex items-center">
                <div className="w-6 h-6 relative mr-2 flex-shrink-0">
                  <TeamLogo team={partida.timeA} size={24} />
                </div>
                <span className="text-sm truncate max-w-[70px] font-medium">
                  {limitarNome(partida.timeA.nome)}
                </span>
              </div>
            </div>

            <div className="col-span-4 flex justify-center font-bold">
              <span className="text-sm">{resultadoA}</span>
              <span className="mx-1">-</span>
              <span className="text-sm">{resultadoB}</span>
              {temPenaltis && (
                <span className="text-xs text-gray-400 ml-1">
                  ({partida.penaltisA}-{partida.penaltisB})
                </span>
              )}
            </div>

            <div className={`${timeBClasses} justify-end`}>
              <div className="flex items-center">
                <span className="text-sm truncate max-w-[70px] font-medium text-right">
                  {limitarNome(partida.timeB.nome)}
                </span>
                <div className="w-6 h-6 relative ml-2 flex-shrink-0">
                  <TeamLogo team={partida.timeB} size={24} />
                </div>
              </div>
            </div>
          </div>

          {temPenaltis && (
            <div className="text-xs text-center text-gray-400 mt-1">
              Decisão por pênaltis
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <h3 className="text-xl font-bold mb-8">Fase Eliminatória</h3>

      <div className="overflow-x-auto pb-6">
        <div className="grid grid-cols-4 gap-12 mb-6 w-[1200px]">
          <div>
            <h4 className="text-md font-semibold text-center text-blue-400 mb-6">
              Oitavas de Final
            </h4>
          </div>
          <div>
            <h4 className="text-md font-semibold text-center text-blue-400 mb-6">
              Quartas de Final
            </h4>
          </div>
          <div>
            <h4 className="text-md font-semibold text-center text-blue-400 mb-6">
              Semifinais
            </h4>
          </div>
          <div>
            <h4 className="text-md font-semibold text-center text-blue-400 mb-6">
              Final
            </h4>
          </div>
        </div>

        <div className="relative w-[1200px]" style={{ height: "1500px" }}>
          {/* Oitavas de Final */}
          {oitavas &&
            oitavas.map((partida, index) => {
              // Altura da posição vertical de cada par de jogos
              const topPosition = index * 180;
              return (
                <div
                  key={`oitavas-${index}`}
                  className="absolute"
                  style={{
                    left: "0px",
                    top: `${topPosition}px`,
                  }}
                >
                  {renderPartida(partida, "oitavas")}
                </div>
              );
            })}

          {/* Quartas de Final */}
          {quartas &&
            quartas.map((partida, index) => {
              // Cada jogo de quartas fica entre dois jogos de oitavas
              const topPosition = index * 360 + 90;
              return (
                <div
                  key={`quartas-${index}`}
                  className="absolute"
                  style={{
                    left: "320px",
                    top: `${topPosition}px`,
                  }}
                >
                  {renderPartida(partida, "quartas")}
                </div>
              );
            })}

          {/* Semifinais */}
          {semifinais &&
            semifinais.map((partida, index) => {
              // Cada jogo de semifinal fica entre dois jogos de quartas
              const topPosition = index * 720 + 270;
              return (
                <div
                  key={`semifinal-${index}`}
                  className="absolute"
                  style={{
                    left: "640px",
                    top: `${topPosition}px`,
                  }}
                >
                  {renderPartida(partida, "semifinal")}
                </div>
              );
            })}

          {/* Final */}
          {final && (
            <div
              className="absolute"
              style={{
                left: "960px",
                top: "630px",
              }}
            >
              {renderPartida(final, "final")}
            </div>
          )}

          {/* Linhas de conexão - Oitavas para Quartas */}
          {oitavas &&
            oitavas.map((partida, index) => {
              // A cada 2 jogos, temos uma conexão para quartas
              if (index % 2 === 0) {
                const pairIndex = Math.floor(index / 2);
                // Coordenadas para as linhas
                const startY1 = index * 180 + 60;
                const startY2 = (index + 1) * 180 + 60;
                const midY = (startY1 + startY2) / 2;
                const endY = pairIndex * 360 + 90 + 60;

                return (
                  <div key={`connect-oitavas-${index}`}>
                    {/* Linha horizontal do jogo 1 */}
                    <div
                      className="absolute border-t-2 border-gray-600"
                      style={{
                        left: "290px",
                        top: `${startY1}px`,
                        width: "15px",
                      }}
                    ></div>

                    {/* Linha horizontal do jogo 2 */}
                    <div
                      className="absolute border-t-2 border-gray-600"
                      style={{
                        left: "290px",
                        top: `${startY2}px`,
                        width: "15px",
                      }}
                    ></div>

                    {/* Linha vertical conectando os dois jogos */}
                    <div
                      className="absolute border-l-2 border-gray-600"
                      style={{
                        left: "305px",
                        top: `${startY1}px`,
                        height: `${startY2 - startY1}px`,
                      }}
                    ></div>

                    {/* Linha horizontal até quartas */}
                    <div
                      className="absolute border-t-2 border-gray-600"
                      style={{
                        left: "305px",
                        top: `${midY}px`,
                        width: "15px",
                      }}
                    ></div>
                  </div>
                );
              }
              return null;
            })}

          {/* Linhas de conexão - Quartas para Semifinais */}
          {quartas &&
            quartas.map((partida, index) => {
              // A cada 2 jogos, temos uma conexão para semifinais
              if (index % 2 === 0) {
                const pairIndex = Math.floor(index / 2);
                // Coordenadas para as linhas
                const startY1 = index * 360 + 90 + 60;
                const startY2 = (index + 1) * 360 + 90 + 60;
                const midY = (startY1 + startY2) / 2;
                const endY = pairIndex * 720 + 270 + 60;

                return (
                  <div key={`connect-quartas-${index}`}>
                    {/* Linha horizontal do jogo 1 */}
                    <div
                      className="absolute border-t-2 border-gray-600"
                      style={{
                        left: "610px",
                        top: `${startY1}px`,
                        width: "15px",
                      }}
                    ></div>

                    {/* Linha horizontal do jogo 2 */}
                    <div
                      className="absolute border-t-2 border-gray-600"
                      style={{
                        left: "610px",
                        top: `${startY2}px`,
                        width: "15px",
                      }}
                    ></div>

                    {/* Linha vertical conectando os dois jogos */}
                    <div
                      className="absolute border-l-2 border-gray-600"
                      style={{
                        left: "625px",
                        top: `${startY1}px`,
                        height: `${startY2 - startY1}px`,
                      }}
                    ></div>

                    {/* Linha horizontal até semis */}
                    <div
                      className="absolute border-t-2 border-gray-600"
                      style={{
                        left: "625px",
                        top: `${midY}px`,
                        width: "15px",
                      }}
                    ></div>
                  </div>
                );
              }
              return null;
            })}

          {/* Linhas de conexão - Semifinais para Final */}
          {semifinais && semifinais.length >= 2 && (
            <div>
              {/* Linha horizontal da semifinal 1 */}
              <div
                className="absolute border-t-2 border-gray-600"
                style={{
                  left: "930px",
                  top: "330px",
                  width: "15px",
                }}
              ></div>

              {/* Linha horizontal da semifinal 2 */}
              <div
                className="absolute border-t-2 border-gray-600"
                style={{
                  left: "930px",
                  top: "990px",
                  width: "15px",
                }}
              ></div>

              {/* Linha vertical conectando as duas semifinais */}
              <div
                className="absolute border-l-2 border-gray-600"
                style={{
                  left: "945px",
                  top: "330px",
                  height: "660px",
                }}
              ></div>

              {/* Linha horizontal até a final */}
              <div
                className="absolute border-t-2 border-gray-600"
                style={{
                  left: "945px",
                  top: "690px",
                  width: "15px",
                }}
              ></div>
            </div>
          )}

          {/* Campeão */}
          {campeao && (
            <div
              className="absolute flex flex-col items-center"
              style={{
                left: "1080px",
                top: "720px",
              }}
            >
              <div className="text-center">
                <div className="text-md font-semibold text-yellow-500 mb-2">
                  CAMPEÃO
                </div>
                <div className="w-16 h-16 mx-auto relative mb-2">
                  <TeamLogo team={campeao} size={64} />
                </div>
                <div className="text-lg font-bold text-yellow-400">
                  {campeao.nome}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
