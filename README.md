# Simulação de Monte Carlo - Futebol

Este projeto implementa uma simulação de Monte Carlo para estimar a probabilidade de times de futebol vencerem campeonatos, com foco no Brasileirão 2025 e na Copa do Mundo 2022.

## Sobre o Projeto

Este aplicativo web interativo permite:

- Simular probabilidades de títulos no Brasileirão (pontos corridos)
- Simular probabilidades de títulos na Copa do Mundo (fase de grupos + eliminatórias)
- Ajustar a força dos times para testar diferentes cenários
- Visualizar resultados em gráficos e tabelas intuitivas
- Simular o chaveamento de um campeonato completo

## Conceito de Simulação de Monte Carlo

A Simulação de Monte Carlo é um método estatístico que utiliza amostragens aleatórias repetidas para obter resultados numéricos. No contexto esportivo, permite estimar probabilidades de diferentes resultados simulando milhares de vezes os eventos.

Neste projeto:

- Para o Brasileirão: simulamos todas as 380 partidas do campeonato milhares de vezes
- Para a Copa: simulamos a fase de grupos e o mata-mata completo milhares de vezes
- A força relativa de cada time influencia na probabilidade de vitória, empate ou derrota

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do frontend
- **Chart.js**: Biblioteca para criação de gráficos interativos
- **Framer Motion**: Biblioteca para animações fluidas
- **Tailwind CSS**: Framework CSS para estilização

## Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Acesse `http://localhost:3000` no navegador

## Funcionalidades

- **Ajuste de Forças**: Defina manualmente a força de cada time ou randomize
- **Número de Simulações**: Escolha entre 100 e 10.000 simulações
- **Visualização de Resultados**: Gráficos de barras, tabelas detalhadas e chaveamento
- **Brasileirão**: Probabilidade de título, G4 e rebaixamento
- **Copa do Mundo**: Probabilidade de título, pódio e chaveamento interativo
