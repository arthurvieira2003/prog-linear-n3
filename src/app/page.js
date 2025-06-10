"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="md:text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Simulador de Campeonatos com Monte Carlo
          </h1>
        </motion.div>

        <motion.div
          className="mt-16 card bg-opacity-70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Desenvolvido por
          </h2>
          <div className="flex items-center justify-center gap-10">
            <p className="text-white font-bold text-center text-2xl">
              ARTHUR HENRIQUE TSCHA VIEIRA
            </p>
            <p className="text-white font-bold text-center text-2xl">
              GUSTAVO HENRIQUE COSTA
            </p>
            <p className="text-white font-bold text-center text-2xl">
              LUCAS MENDES ISRAEL
            </p>
            <p className="text-white font-bold text-center text-2xl">
              MARCO LEONE MERINI
            </p>
            <p className="text-white font-bold text-center text-2xl">
              RAFAEL RODRIGUES FERREIRA DE ANDRADE
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Link href="/brasileirao">
              <div className="card h-full transform transition duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-green-500 bg-gradient-to-b from-green-900/30 to-transparent">
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 relative bg-gradient-to-br from-green-500 to-yellow-400 rounded-full flex items-center justify-center p-4">
                      <img
                        src="https://brandlogos.net/wp-content/uploads/2023/08/brasileiro_serie_a-logo_brandlogos.net_nnva7-512x629.png"
                        alt="Brasileirão"
                        className="w-16 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                    Brasileirão 2025
                  </h2>
                  <p className="text-gray-300 mb-6 text-center">
                    Simulação da Série A e probabilidades de cada time ser
                    campeão, ir para Libertadores ou ser rebaixado.
                  </p>
                  <div
                    className="field-pattern h-16 rounded-lg mb-6 relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0, 105, 65, 0.3), rgba(255, 204, 0, 0.3))",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        20 Times
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button className="btn-primary bg-gradient-to-r from-green-500 to-yellow-500">
                      Simular Brasileirão
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={item}>
            <Link href="/copa-do-mundo">
              <div className="card h-full transform transition duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-[#9a1439] bg-gradient-to-b from-[#2f0815]/40 to-transparent">
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 relative bg-gradient-to-br from-[#9a1439] to-[#2f0815] rounded-full flex items-center justify-center">
                      <img
                        src="https://vetores.org/d/fifa-world-cup-qatar-2022.svg"
                        alt="Copa do Mundo"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#9a1439] to-white bg-clip-text text-transparent">
                    Copa do Mundo 2022
                  </h2>
                  <p className="text-gray-300 mb-6 text-center">
                    Desempenho das seleções na fase de grupos e mata-mata com
                    visualização do chaveamento.
                  </p>
                  <div
                    className="field-pattern h-16 rounded-lg mb-6 relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(154, 20, 57, 0.3), rgba(47, 8, 21, 0.3))",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        32 Seleções
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button className="btn-primary bg-gradient-to-r from-[#9a1439] to-[#2f0815]">
                      Simular Copa do Mundo
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={item}>
            <Link href="/champions-league">
              <div className="card h-full transform transition duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-purple-500 bg-gradient-to-b from-indigo-900/30 to-transparent">
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 relative bg-gradient-to-br from-blue-800 to-purple-700 rounded-full flex items-center justify-center">
                      <img
                        src="/images/champions-logo.svg"
                        alt="Champions League"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Champions League 2024/25
                  </h2>
                  <p className="text-gray-300 mb-6 text-center">
                    Novo formato com fase de liga única e 36 times, playoffs e
                    fase eliminatória com jogos de ida e volta.
                  </p>
                  <div
                    className="field-pattern h-16 rounded-lg mb-6 relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(12, 33, 128, 0.3), rgba(89, 40, 145, 0.3))",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        36 Times
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button className="btn-primary bg-gradient-to-r from-blue-600 to-purple-600">
                      Simular Champions League
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
