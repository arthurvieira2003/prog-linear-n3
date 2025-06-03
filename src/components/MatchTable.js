"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import TeamLogo from "./TeamLogo";

export default function MatchTable({ rodadas }) {
  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [viewMode, setViewMode] = useState("rodada");

  if (!rodadas || rodadas.length === 0) {
    return (
      <div className="card p-6 text-center text-gray-400">
        Nenhum jogo disponível
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Jogos da Simulação
        </h3>

        <div className="flex bg-black/30 rounded-md overflow-hidden">
          <button
            onClick={() => setViewMode("rodada")}
            className={`px-3 py-1 text-sm ${
              viewMode === "rodada" ? "bg-green-600" : "hover:bg-gray-700"
            }`}
          >
            Por Rodada
          </button>
          <button
            onClick={() => setViewMode("temporada")}
            className={`px-3 py-1 text-sm ${
              viewMode === "temporada" ? "bg-green-600" : "hover:bg-gray-700"
            }`}
          >
            Temporada Completa
          </button>
        </div>
      </div>

      {viewMode === "rodada" ? (
        <>
          <div className="mb-4">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {rodadas.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setRodadaAtual(index + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    rodadaAtual === index + 1
                      ? "bg-green-600 text-white font-bold"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="text-center mb-4">
              <h4 className="text-lg font-semibold mb-1">
                {rodadaAtual <= rodadas.length / 2
                  ? `${rodadaAtual}ª Rodada - Turno`
                  : `${rodadaAtual - rodadas.length / 2}ª Rodada - Returno`}
              </h4>
            </div>
          </div>

          <div className="space-y-4">
            {rodadas[rodadaAtual - 1]?.map((jogo, index) => (
              <div
                key={index}
                className="bg-black/20 rounded-lg p-4 hover:bg-black/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1 justify-end">
                    <span className="font-semibold mr-3">
                      {jogo.mandante.nome}
                    </span>
                    <TeamLogo team={jogo.mandante} size={32} />
                  </div>

                  <div className="mx-4 flex items-center">
                    <div className="px-3 py-2 rounded-lg bg-black/30 text-lg font-bold">
                      <span
                        className={
                          jogo.placar.mandante > jogo.placar.visitante
                            ? "text-green-400"
                            : ""
                        }
                      >
                        {jogo.placar.mandante}
                      </span>
                      <span className="px-2 text-gray-400">x</span>
                      <span
                        className={
                          jogo.placar.visitante > jogo.placar.mandante
                            ? "text-green-400"
                            : ""
                        }
                      >
                        {jogo.placar.visitante}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center flex-1">
                    <TeamLogo team={jogo.visitante} size={32} />
                    <span className="font-semibold ml-3">
                      {jogo.visitante.nome}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="overflow-auto max-h-[600px]">
          {rodadas.map((rodada, rodadaIndex) => (
            <div key={rodadaIndex} className="mb-6">
              <h4 className="text-md font-semibold mb-3 bg-gray-800/60 p-2 rounded">
                {rodadaIndex + 1 <= rodadas.length / 2
                  ? `${rodadaIndex + 1}ª Rodada - Turno`
                  : `${rodadaIndex + 1 - rodadas.length / 2}ª Rodada - Returno`}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rodada.map((jogo, jogoIndex) => (
                  <div
                    key={jogoIndex}
                    className="bg-black/20 rounded p-2 hover:bg-black/30 transition-all"
                  >
                    <div className="flex items-center text-sm">
                      <div className="w-8 h-8 relative mr-2">
                        <TeamLogo team={jogo.mandante} size={32} />
                      </div>

                      <span className="flex-1 text-right mr-2 truncate">
                        {jogo.mandante.nome}
                      </span>

                      <div className="px-2 py-1 rounded bg-black/30 font-bold">
                        <span
                          className={
                            jogo.placar.mandante > jogo.placar.visitante
                              ? "text-green-400"
                              : ""
                          }
                        >
                          {jogo.placar.mandante}
                        </span>
                        <span className="px-1 text-gray-400">x</span>
                        <span
                          className={
                            jogo.placar.visitante > jogo.placar.mandante
                              ? "text-green-400"
                              : ""
                          }
                        >
                          {jogo.placar.visitante}
                        </span>
                      </div>

                      <span className="flex-1 ml-2 truncate">
                        {jogo.visitante.nome}
                      </span>

                      <div className="w-8 h-8 relative ml-2">
                        <TeamLogo team={jogo.visitante} size={32} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
