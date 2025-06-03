"use client";

import React from "react";
import { motion } from "framer-motion";
import TeamLogo from "./TeamLogo";

export default function LeagueTable({ classificacao }) {
  if (!classificacao || classificacao.length === 0) {
    return (
      <div className="card p-6 text-center text-gray-400">
        Nenhuma classificação disponível
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card overflow-x-auto"
    >
      <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Tabela de Classificação
      </h3>

      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Pos
            </th>
            <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Time
            </th>
            <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              PTS
            </th>
            <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              J
            </th>
            <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              V
            </th>
            <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              E
            </th>
            <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              D
            </th>
            <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              GP
            </th>
            <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              GC
            </th>
            <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              SG
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {classificacao.map((time, index) => (
            <tr
              key={time.id}
              className={
                index < 4
                  ? "bg-green-900/20"
                  : index >= classificacao.length - 4
                  ? "bg-red-900/20"
                  : index < 6
                  ? "bg-blue-900/20"
                  : ""
              }
            >
              <td className="py-3 px-2 whitespace-nowrap">
                <div className="text-sm font-medium">{index + 1}</div>
              </td>
              <td className="py-3 px-2 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 relative">
                    <TeamLogo team={time} size={32} />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">{time.nome}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-2 whitespace-nowrap text-center">
                <div className="text-sm font-bold">{time.pontos}</div>
              </td>
              <td className="py-3 px-2 whitespace-nowrap text-center">
                <div className="text-sm">{time.jogos}</div>
              </td>
              <td className="py-3 px-2 whitespace-nowrap text-center">
                <div className="text-sm text-green-400">{time.vitorias}</div>
              </td>
              <td className="py-3 px-2 whitespace-nowrap text-center">
                <div className="text-sm text-gray-300">{time.empates}</div>
              </td>
              <td className="py-3 px-2 whitespace-nowrap text-center">
                <div className="text-sm text-red-400">{time.derrotas}</div>
              </td>
              <td className="py-3 px-2 whitespace-nowrap text-center">
                <div className="text-sm">{time.golsPro}</div>
              </td>
              <td className="py-3 px-2 whitespace-nowrap text-center">
                <div className="text-sm">{time.golsContra}</div>
              </td>
              <td className="py-3 px-2 whitespace-nowrap text-center">
                <div
                  className={`text-sm font-medium ${
                    time.saldoGols > 0
                      ? "text-green-400"
                      : time.saldoGols < 0
                      ? "text-red-400"
                      : ""
                  }`}
                >
                  {time.saldoGols > 0 ? "+" : ""}
                  {time.saldoGols}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-900/20 mr-2"></div>
          <span>Libertadores</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-900/20 mr-2"></div>
          <span>Sul-Americana</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-900/20 mr-2"></div>
          <span>Rebaixamento</span>
        </div>
      </div>
    </motion.div>
  );
}
