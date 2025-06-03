"use client";

import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <title>Simulador de Campeonatos de Futebol</title>
        <meta
          name="description"
          content="Simulador de campeonatos de futebol usando o método Monte Carlo"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-900 text-gray-100 min-h-screen">
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
