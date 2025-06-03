"use client";

import React from "react";
import { motion } from "framer-motion";
import TeamLogo from "./TeamLogo";

export default function TopScorers({ artilheiros }) {
  if (!artilheiros || artilheiros.length === 0) {
    return (
      <div className="card p-6 text-center text-gray-400">
        Dados de artilharia não disponíveis
      </div>
    );
  }

  const topArtilheiros = artilheiros
    .filter((jogador) => jogador.gols > 0)
    .slice(0, 20);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
        Artilharia do Campeonato
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Pos
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Jogador
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Time
              </th>
              <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Gols
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {topArtilheiros.map((jogador, index) => (
              <tr
                key={jogador.id}
                className={
                  index === 0
                    ? "bg-yellow-900/20"
                    : index < 3
                    ? "bg-amber-900/10"
                    : ""
                }
              >
                <td className="py-3 px-4 whitespace-nowrap text-sm">
                  {index + 1}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium">{jogador.nome}</div>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 relative mr-2">
                      <TeamLogo
                        team={{
                          id: jogador.timeId,
                          escudo: jogador.timeEscudo,
                          nome: jogador.timeNome,
                        }}
                        size={24}
                      />
                    </div>
                    <div className="text-sm">{jogador.timeNome}</div>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-center">
                  <span
                    className={`inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full ${
                      index === 0
                        ? "bg-yellow-900/30 text-yellow-400"
                        : index < 3
                        ? "bg-amber-900/20 text-amber-300"
                        : "bg-gray-800"
                    }`}
                  >
                    {jogador.gols}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {topArtilheiros.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Nenhum jogador marcou gols neste campeonato
        </div>
      )}
    </motion.div>
  );
}
