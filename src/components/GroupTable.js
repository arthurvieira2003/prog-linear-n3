"use client";

import React from "react";
import TeamLogo from "./TeamLogo";

export default function GroupTable({ grupo, partidas, nomeGrupo }) {
  if (!grupo || grupo.length === 0) {
    console.warn(`Grupo ${nomeGrupo} vazio ou não definido`);
    return (
      <div className="card p-4 text-center text-gray-400">
        Nenhuma classificação disponível
      </div>
    );
  }

  return (
    <div className="card p-4 overflow-hidden">
      <h3 className="text-lg font-bold mb-2 bg-blue-900/30 p-2 rounded flex items-center">
        <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
          {nomeGrupo}
        </span>
        Grupo {nomeGrupo}
      </h3>

      <div className="mb-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Pos
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Seleção
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                PTS
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                J
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                V
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                E
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                D
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                GP
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                GC
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                SG
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {grupo.map((time, index) => (
              <tr
                key={time.id || index}
                className={index < 2 ? "bg-green-900/20" : ""}
              >
                <td className="px-2 py-2 whitespace-nowrap">
                  <div className="text-sm font-medium">{index + 1}</div>
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 relative">
                      <TeamLogo team={time} size={24} />
                    </div>
                    <div className="ml-2">
                      <div className="text-sm font-medium">{time.nome}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-center">
                  <div className="text-sm font-bold">{time.pontos || 0}</div>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-center">
                  <div className="text-sm">{time.jogos || 0}</div>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-center">
                  <div className="text-sm text-green-400">
                    {time.vitorias || 0}
                  </div>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-300">
                    {time.empates || 0}
                  </div>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-center">
                  <div className="text-sm text-red-400">
                    {time.derrotas || 0}
                  </div>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-center">
                  <div className="text-sm">{time.golsPro || 0}</div>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-center">
                  <div className="text-sm">{time.golsContra || 0}</div>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-center">
                  <div
                    className={`text-sm font-medium ${
                      (time.saldoGols || 0) > 0
                        ? "text-green-400"
                        : (time.saldoGols || 0) < 0
                        ? "text-red-400"
                        : ""
                    }`}
                  >
                    {(time.saldoGols || 0) > 0 ? "+" : ""}
                    {time.saldoGols || 0}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {partidas && partidas.length > 0 ? (
        <div className="mt-3">
          <h4 className="text-sm font-semibold mb-2 text-gray-300">
            Partidas do Grupo {nomeGrupo}
          </h4>
          <div className="space-y-2">
            {partidas.map((partida, index) => (
              <div
                key={index}
                className="bg-black/20 rounded p-2 hover:bg-black/30 transition-all"
              >
                <div className="flex items-center text-sm">
                  <div className="w-6 h-6 relative mr-1">
                    <TeamLogo team={partida.timeA} size={24} />
                  </div>

                  <span className="flex-1 text-right mr-2 truncate max-w-[80px]">
                    {partida.timeA.nome}
                  </span>

                  <div className="px-2 py-1 rounded bg-black/30 font-bold">
                    <span
                      className={
                        (partida.golsA || 0) > (partida.golsB || 0)
                          ? "text-green-400"
                          : ""
                      }
                    >
                      {partida.golsA || 0}
                    </span>
                    <span className="px-1 text-gray-400">x</span>
                    <span
                      className={
                        (partida.golsB || 0) > (partida.golsA || 0)
                          ? "text-green-400"
                          : ""
                      }
                    >
                      {partida.golsB || 0}
                    </span>
                  </div>

                  <span className="flex-1 ml-2 truncate max-w-[80px]">
                    {partida.timeB.nome}
                  </span>

                  <div className="w-6 h-6 relative ml-1">
                    <TeamLogo team={partida.timeB} size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-3 text-center text-gray-400 text-sm">
          Nenhuma partida disponível
        </div>
      )}
    </div>
  );
}
