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

    const timeAClasses = `flex items-center ${
      vencedor && vencedor.id === partida.timeA.id
        ? "font-bold text-green-400"
        : ""
    }`;
    const timeBClasses = `flex items-center ${
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

    return (
      <div
        className={`match-card p-3 rounded-lg shadow-md ${fase} relative overflow-hidden backdrop-blur-sm`}
      >
        <div className="absolute inset-0 top-0 h-1/2" style={timeAStyle}></div>
        <div
          className="absolute inset-0 top-1/2 h-1/2"
          style={timeBStyle}
        ></div>

        <div className="relative z-1">
          <div className="flex justify-between items-center mb-2">
            <div className={timeAClasses}>
              <div className="w-6 h-6 relative mr-2">
                <TeamLogo team={partida.timeA} size={24} />
              </div>
              <span className="text-sm truncate max-w-[120px] font-medium">
                {partida.timeA.nome}
              </span>
            </div>
            <div className="flex items-center space-x-1 font-bold">
              <span className="text-sm">{resultadoA}</span>
              {temPenaltis && (
                <span className="text-xs text-gray-400 ml-1">
                  ({partida.penaltisA})
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className={timeBClasses}>
              <div className="w-6 h-6 relative mr-2">
                <TeamLogo team={partida.timeB} size={24} />
              </div>
              <span className="text-sm truncate max-w-[120px] font-medium">
                {partida.timeB.nome}
              </span>
            </div>
            <div className="flex items-center space-x-1 font-bold">
              <span className="text-sm">{resultadoB}</span>
              {temPenaltis && (
                <span className="text-xs text-gray-400 ml-1">
                  ({partida.penaltisB})
                </span>
              )}
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="world-cup-bracket card p-4"
    >
      <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
        Chaveamento da Copa do Mundo
      </h3>

      <div className="overflow-x-auto">
        <div className="min-w-[950px] relative p-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="absolute inset-0 z-0">
              <div
                className="bracket-connector"
                style={{
                  top: "84px",
                  left: "24.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>
              <div
                className="bracket-connector"
                style={{
                  top: "148px",
                  left: "24.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>

              <div
                className="bracket-connector"
                style={{
                  top: "248px",
                  left: "24.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>
              <div
                className="bracket-connector"
                style={{
                  top: "312px",
                  left: "24.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>

              <div
                className="bracket-connector"
                style={{
                  top: "412px",
                  left: "24.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>
              <div
                className="bracket-connector"
                style={{
                  top: "476px",
                  left: "24.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>

              <div
                className="bracket-connector"
                style={{
                  top: "576px",
                  left: "24.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>
              <div
                className="bracket-connector"
                style={{
                  top: "640px",
                  left: "24.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>

              <div
                className="bracket-connector vertical"
                style={{
                  top: "84px",
                  left: "24.5%",
                  width: "2px",
                  height: "64px",
                }}
              ></div>
              <div
                className="bracket-connector vertical"
                style={{
                  top: "248px",
                  left: "24.5%",
                  width: "2px",
                  height: "64px",
                }}
              ></div>
              <div
                className="bracket-connector vertical"
                style={{
                  top: "412px",
                  left: "24.5%",
                  width: "2px",
                  height: "64px",
                }}
              ></div>
              <div
                className="bracket-connector vertical"
                style={{
                  top: "576px",
                  left: "24.5%",
                  width: "2px",
                  height: "64px",
                }}
              ></div>

              <div
                className="bracket-connector"
                style={{
                  top: "120px",
                  left: "49.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>
              <div
                className="bracket-connector"
                style={{
                  top: "280px",
                  left: "49.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>
              <div
                className="bracket-connector"
                style={{
                  top: "444px",
                  left: "49.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>
              <div
                className="bracket-connector"
                style={{
                  top: "608px",
                  left: "49.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>

              <div
                className="bracket-connector vertical"
                style={{
                  top: "120px",
                  left: "49.5%",
                  width: "2px",
                  height: "160px",
                }}
              ></div>
              <div
                className="bracket-connector vertical"
                style={{
                  top: "444px",
                  left: "49.5%",
                  width: "2px",
                  height: "164px",
                }}
              ></div>

              <div
                className="bracket-connector"
                style={{
                  top: "280px",
                  left: "74.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>
              <div
                className="bracket-connector"
                style={{
                  top: "520px",
                  left: "74.5%",
                  width: "50px",
                  height: "2px",
                }}
              ></div>

              <div
                className="bracket-connector vertical"
                style={{
                  top: "280px",
                  left: "74.5%",
                  width: "2px",
                  height: "240px",
                }}
              ></div>
            </div>

            <div className="col-span-1">
              <h4 className="text-md font-semibold mb-6 text-center text-blue-400">
                Oitavas de Final
              </h4>

              <div className="flex flex-col gap-3">
                {oitavas && oitavas[0] && (
                  <div className="bracket-match">
                    {renderPartida(oitavas[0], "oitavas")}
                  </div>
                )}

                {oitavas && oitavas[1] && (
                  <div className="bracket-match">
                    {renderPartida(oitavas[1], "oitavas")}
                  </div>
                )}
              </div>

              <div className="my-10"></div>

              <div className="flex flex-col gap-3">
                {oitavas && oitavas[2] && (
                  <div className="bracket-match">
                    {renderPartida(oitavas[2], "oitavas")}
                  </div>
                )}

                {oitavas && oitavas[3] && (
                  <div className="bracket-match">
                    {renderPartida(oitavas[3], "oitavas")}
                  </div>
                )}
              </div>

              <div className="my-10"></div>

              <div className="flex flex-col gap-3">
                {oitavas && oitavas[4] && (
                  <div className="bracket-match">
                    {renderPartida(oitavas[4], "oitavas")}
                  </div>
                )}

                {oitavas && oitavas[5] && (
                  <div className="bracket-match">
                    {renderPartida(oitavas[5], "oitavas")}
                  </div>
                )}
              </div>

              <div className="my-10"></div>

              <div className="flex flex-col gap-3">
                {oitavas && oitavas[6] && (
                  <div className="bracket-match">
                    {renderPartida(oitavas[6], "oitavas")}
                  </div>
                )}

                {oitavas && oitavas[7] && (
                  <div className="bracket-match">
                    {renderPartida(oitavas[7], "oitavas")}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="text-md font-semibold mb-6 text-center text-blue-400">
                Quartas de Final
              </h4>

              <div className="bracket-match mt-10">
                {quartas && quartas[0] && renderPartida(quartas[0], "quartas")}
              </div>

              <div className="my-20"></div>

              <div className="bracket-match">
                {quartas && quartas[1] && renderPartida(quartas[1], "quartas")}
              </div>

              <div className="my-20"></div>

              <div className="bracket-match">
                {quartas && quartas[2] && renderPartida(quartas[2], "quartas")}
              </div>

              <div className="my-20"></div>

              <div className="bracket-match">
                {quartas && quartas[3] && renderPartida(quartas[3], "quartas")}
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="text-md font-semibold mb-6 text-center text-blue-400">
                Semifinais
              </h4>

              <div className="bracket-match mt-28">
                {semifinais &&
                  semifinais[0] &&
                  renderPartida(semifinais[0], "semifinal")}
              </div>

              <div className="my-52"></div>

              <div className="bracket-match">
                {semifinais &&
                  semifinais[1] &&
                  renderPartida(semifinais[1], "semifinal")}
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="text-md font-semibold mb-6 text-center text-blue-400">
                Final
              </h4>

              <div className="bracket-match mt-52">
                {final && renderPartida(final, "final")}
              </div>

              {campeao && (
                <div className="mt-6 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <div className="text-md font-semibold text-yellow-500 mb-1">
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
        </div>
      </div>

      <style jsx>{`
        .world-cup-bracket {
          position: relative;
        }
        .bracket-match {
          position: relative;
          z-index: 1;
        }

        .bracket-connector {
          position: absolute;
          background-color: rgba(59, 130, 246, 0.2);
          z-index: 0;
        }

        .bracket-connector.vertical {
          left: 74.5%;
        }

        .match-card {
          transition: transform 0.2s ease-in-out;
          background-color: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(71, 85, 105, 0.3);
          margin-bottom: 0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(8px);
        }
        .match-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(71, 85, 105, 0.5);
        }

        .text-green-400 {
          text-shadow: 0 0 8px rgba(74, 222, 128, 0.4);
        }

        .final + div {
          animation: glow 2s infinite alternate;
        }

        @keyframes glow {
          from {
            filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.3));
          }
          to {
            filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.7));
          }
        }
      `}</style>
    </motion.div>
  );
}
