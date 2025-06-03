"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import FootballIcon from "./FootballIcon";
export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="navbar sticky top-0 z-50 py-3 px-4 mb-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <Link href="/" className="flex items-center mb-4 md:mb-0">
          <div className="flex items-center">
            <div className="mr-2">
              <FootballIcon size="lg" color="white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Simulações de Futebol
            </h1>
          </div>
        </Link>

        <div className="flex space-x-1 rounded-lg bg-black bg-opacity-20 p-1">
          <Link href="/">
            <motion.div
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive("/")
                  ? "bg-white text-black font-bold"
                  : "text-white hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Início
            </motion.div>
          </Link>

          <Link href="/brasileirao">
            <motion.div
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive("/brasileirao")
                  ? "bg-white text-black font-bold"
                  : "text-white hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Brasileirão
            </motion.div>
          </Link>

          <Link href="/copa-do-mundo">
            <motion.div
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive("/copa-do-mundo")
                  ? "bg-white text-black font-bold"
                  : "text-white hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Copa do Mundo
            </motion.div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
