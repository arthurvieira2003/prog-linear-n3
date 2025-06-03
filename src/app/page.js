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
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Simulador de Campeonatos
          </h1>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto">
            Utilizando o método de Monte Carlo para simular campeonatos de
            futebol e calcular probabilidades
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Link href="/brasileirao">
              <div className="card h-full transform transition duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-green-500">
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 relative bg-gradient-to-br from-green-500 to-yellow-400 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        <path d="M2 12h20" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    Brasileirão 2025
                  </h2>
                  <p className="text-gray-300 mb-6 text-center">
                    Simulação do próximo campeonato brasileiro e probabilidades
                    de cada time ser campeão, ir para Libertadores ou ser
                    rebaixado.
                  </p>
                  <div className="field-pattern h-16 rounded-lg mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        20 Times
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button className="btn-primary">Simular Brasileirão</button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={item}>
            <Link href="/copa-do-mundo">
              <div className="card h-full transform transition duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-blue-500">
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 relative bg-gradient-to-br from-blue-500 to-yellow-400 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Copa do Mundo 2022
                  </h2>
                  <p className="text-gray-300 mb-6 text-center">
                    Desempenho das seleções na fase de grupos e mata-mata com
                    visualização do chaveamento.
                  </p>
                  <div className="field-pattern h-16 rounded-lg mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        32 Seleções
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button className="btn-primary">
                      Simular Copa do Mundo
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            <span className="soccer-ball-icon"></span>
            Sobre o Simulador
          </h2>
          <p className="text-gray-300 mb-4">
            Este simulador utiliza o <strong>método de Monte Carlo</strong> para
            calcular as probabilidades de cada time em um campeonato. O método
            consiste em realizar milhares de simulações aleatórias do
            campeonato, e então contabilizar os resultados para determinar as
            probabilidades.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
