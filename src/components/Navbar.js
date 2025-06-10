"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-primary/90 backdrop-blur-md sticky top-0 z-50 border-b border-primary/60 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                src="/images/catolica-logo.svg"
                alt="Logo da Católica"
                className="h-16 w-16 mr-4 brightness-0 invert"
              />
              <span className="text-xl font-bold text-white">
                Simulador de Campeonatos
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/")
                  ? "text-white bg-primary-dark"
                  : "text-white/80 hover:bg-primary-dark/70 hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              href="/brasileirao"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/brasileirao")
                  ? "text-white bg-primary-dark"
                  : "text-white/80 hover:bg-primary-dark/70 hover:text-white"
              }`}
            >
              Brasileirão
            </Link>

            <Link
              href="/copa-do-mundo"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/copa-do-mundo")
                  ? "text-white bg-primary-dark"
                  : "text-white/80 hover:bg-primary-dark/70 hover:text-white"
              }`}
            >
              Copa do Mundo
            </Link>

            <Link
              href="/champions-league"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/champions-league")
                  ? "text-white bg-primary-dark"
                  : "text-white/80 hover:bg-primary-dark/70 hover:text-white"
              }`}
            >
              Champions League
            </Link>
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-primary-dark focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/")
                  ? "text-white bg-primary-dark"
                  : "text-white/80 hover:bg-primary-dark/70 hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              href="/brasileirao"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/brasileirao")
                  ? "text-white bg-primary-dark"
                  : "text-white/80 hover:bg-primary-dark/70 hover:text-white"
              }`}
            >
              Brasileirão
            </Link>

            <Link
              href="/copa-do-mundo"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/copa-do-mundo")
                  ? "text-white bg-primary-dark"
                  : "text-white/80 hover:bg-primary-dark/70 hover:text-white"
              }`}
            >
              Copa do Mundo
            </Link>

            <Link
              href="/champions-league"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/champions-league")
                  ? "text-white bg-primary-dark"
                  : "text-white/80 hover:bg-primary-dark/70 hover:text-white"
              }`}
            >
              Champions League
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
