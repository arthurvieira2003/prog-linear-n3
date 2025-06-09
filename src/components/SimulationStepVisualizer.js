import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TeamLogo from "./TeamLogo";

export default function SimulationStepVisualizer({
  isVisible = false,
  timeMandante,
  timeVisitante,
}) {
  const [step, setStep] = useState(0);
  const [simulationData, setSimulationData] = useState(null);
  const [isPaused, setIsPaused] = useState(true); // Começar pausado por padrão
  const [isCompleted, setIsCompleted] = useState(false);

  // Resetar a simulação quando os times mudam
  useEffect(() => {
    if (timeMandante && timeVisitante) {
      setStep(0);
      setSimulationData(null);
      setIsPaused(true); // Manter pausado quando mudar os times
      setIsCompleted(false);
    }
  }, [timeMandante, timeVisitante]);

  // Avançar os passos da simulação automaticamente
  useEffect(() => {
    if (!isVisible || isPaused || !timeMandante || !timeVisitante) return;

    // Marcar como completo quando chegar ao final
    if (step > 10) {
      setIsCompleted(true);
      setIsPaused(true);
      return;
    }

    const timer = setTimeout(() => {
      simulateStep();
      setStep((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isVisible, step, isPaused, timeMandante, timeVisitante]);

  // Simular um passo da simulação
  const simulateStep = () => {
    // No primeiro passo, inicializamos a simulação
    if (step === 0) {
      setSimulationData({
        mandante: {
          ...timeMandante,
          gols: 0,
          chutes: 0,
          chutesNoGol: 0,
          posse: 50,
          ataques: 0,
          corners: 0,
          cartoes: 0,
        },
        visitante: {
          ...timeVisitante,
          gols: 0,
          chutes: 0,
          chutesNoGol: 0,
          posse: 50,
          ataques: 0,
          corners: 0,
          cartoes: 0,
        },
        eventos: [],
        tempoAtual: 0,
      });
      return;
    }

    // Nos passos seguintes, atualizamos os dados da simulação
    setSimulationData((prev) => {
      if (!prev) return null;

      // Calcular forças relativas dos times
      const forcaTotalMandante = calcularForcaTotal(prev.mandante);
      const forcaTotalVisitante = calcularForcaTotal(prev.visitante);
      const diferencaForca = forcaTotalMandante - forcaTotalVisitante;

      // Novo tempo de jogo (0-90 minutos)
      const tempoAtual = Math.min(90, step * 9); // cada passo avança 9 minutos

      // Simular eventos
      const novosEventos = [];

      // Simular chutes
      const chanceChuteMandante = 0.5 + diferencaForca / 200; // entre 0.4 e 0.6
      const chanceVisitante = 0.5 - diferencaForca / 200;

      if (Math.random() < chanceChuteMandante) {
        const novoChute = {
          time: "mandante",
          tipo: "chute",
          minuto:
            Math.floor(Math.random() * (tempoAtual - prev.tempoAtual)) +
            prev.tempoAtual,
        };

        // Verificar se o chute foi no gol
        if (Math.random() < 0.4) {
          novoChute.noGol = true;

          // Verificar se foi gol
          if (Math.random() < 0.3) {
            novoChute.gol = true;
          }
        }

        novosEventos.push(novoChute);
      }

      if (Math.random() < chanceVisitante) {
        const novoChute = {
          time: "visitante",
          tipo: "chute",
          minuto:
            Math.floor(Math.random() * (tempoAtual - prev.tempoAtual)) +
            prev.tempoAtual,
        };

        // Verificar se o chute foi no gol
        if (Math.random() < 0.4) {
          novoChute.noGol = true;

          // Verificar se foi gol
          if (Math.random() < 0.3) {
            novoChute.gol = true;
          }
        }

        novosEventos.push(novoChute);
      }

      // Calcular novos dados
      const mandanteUpdated = {
        ...prev.mandante,
        chutes:
          prev.mandante.chutes +
          novosEventos.filter(
            (e) => e.time === "mandante" && e.tipo === "chute"
          ).length,
        chutesNoGol:
          prev.mandante.chutesNoGol +
          novosEventos.filter((e) => e.time === "mandante" && e.noGol).length,
        gols:
          prev.mandante.gols +
          novosEventos.filter((e) => e.time === "mandante" && e.gol).length,
        posse: Math.max(
          30,
          Math.min(70, prev.mandante.posse + (Math.random() * 6 - 3))
        ),
      };

      const visitanteUpdated = {
        ...prev.visitante,
        chutes:
          prev.visitante.chutes +
          novosEventos.filter(
            (e) => e.time === "visitante" && e.tipo === "chute"
          ).length,
        chutesNoGol:
          prev.visitante.chutesNoGol +
          novosEventos.filter((e) => e.time === "visitante" && e.noGol).length,
        gols:
          prev.visitante.gols +
          novosEventos.filter((e) => e.time === "visitante" && e.gol).length,
        posse: 100 - mandanteUpdated.posse,
      };

      // Ordenar eventos por minuto
      const eventosAtualizados = [...prev.eventos, ...novosEventos].sort(
        (a, b) => a.minuto - b.minuto
      );

      return {
        mandante: mandanteUpdated,
        visitante: visitanteUpdated,
        eventos: eventosAtualizados,
        tempoAtual,
      };
    });
  };

  // Iniciar uma nova simulação
  const iniciarNovaSimulacao = () => {
    setStep(0);
    setSimulationData(null);
    setIsPaused(false);
    setIsCompleted(false);
  };

  // Calcular a força total de um time
  const calcularForcaTotal = (time) => {
    if (!time) return 0;
    return (time.ataque + time.meio + time.defesa + time.forca) / 4;
  };

  // Formatar o placar
  const formatarPlacar = () => {
    if (!simulationData) return "0 - 0";
    return `${simulationData.mandante.gols} - ${simulationData.visitante.gols}`;
  };

  // Formatar o tempo
  const formatarTempo = () => {
    if (!simulationData) return "0'";
    return `${simulationData.tempoAtual}'`;
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-4 my-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">
          Simulação do Método Monte Carlo: Passo a Passo
        </h3>

        <div className="flex space-x-2">
          {!isCompleted && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
            >
              {isPaused ? "Iniciar" : "Pausar"}
            </button>
          )}

          <button
            onClick={iniciarNovaSimulacao}
            className="px-3 py-1 bg-blue-700 hover:bg-blue-600 rounded"
            disabled={!isPaused && !isCompleted}
          >
            Nova Simulação
          </button>
        </div>
      </div>

      {/* Cabeçalho do jogo */}
      <div className="flex justify-center items-center space-x-4 mb-6">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2">
            {timeMandante && <TeamLogo team={timeMandante} size={48} />}
          </div>
          <div className="font-semibold">{timeMandante?.nome || "Time A"}</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold bg-gray-700 px-4 py-2 rounded">
            {formatarPlacar()}
          </div>
          <div className="text-sm mt-1 text-gray-400">{formatarTempo()}</div>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2">
            {timeVisitante && <TeamLogo team={timeVisitante} size={48} />}
          </div>
          <div className="font-semibold">{timeVisitante?.nome || "Time B"}</div>
        </div>
      </div>

      {/* Status da simulação */}
      <div className="bg-gray-700/30 rounded p-2 mb-4 text-center">
        {isCompleted ? (
          <p className="text-green-400">Simulação concluída!</p>
        ) : isPaused && step === 0 ? (
          <p className="text-blue-400">
            Clique em "Iniciar" para começar a simulação.
          </p>
        ) : isPaused ? (
          <p className="text-yellow-400">Simulação pausada.</p>
        ) : (
          <p className="text-blue-400">
            Simulação em andamento...{" "}
            {Math.min(Math.round((step / 11) * 100), 100)}% concluída
          </p>
        )}
      </div>

      {/* Estatísticas do jogo */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center font-semibold">
          {simulationData?.mandante.chutes || 0}
        </div>
        <div className="text-center text-gray-400">Chutes</div>
        <div className="text-center font-semibold">
          {simulationData?.visitante.chutes || 0}
        </div>

        <div className="text-center font-semibold">
          {simulationData?.mandante.chutesNoGol || 0}
        </div>
        <div className="text-center text-gray-400">Chutes no Gol</div>
        <div className="text-center font-semibold">
          {simulationData?.visitante.chutesNoGol || 0}
        </div>

        <div className="text-center font-semibold">
          {Math.round(simulationData?.mandante.posse || 50)}%
        </div>
        <div className="text-center text-gray-400">Posse de Bola</div>
        <div className="text-center font-semibold">
          {Math.round(simulationData?.visitante.posse || 50)}%
        </div>
      </div>

      {/* Explicação do método */}
      <div className="bg-gray-700/40 p-3 rounded mb-4">
        <h4 className="font-semibold mb-2">Como o Monte Carlo é aplicado:</h4>
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>
            A força dos times é usada para calcular probabilidades de eventos
          </li>
          <li>
            Geramos números aleatórios para determinar ocorrência de eventos
          </li>
          <li>
            Cada chute, gol e lance é uma simulação aleatória baseada em
            probabilidades
          </li>
          <li>
            Este processo é repetido milhares de vezes para criar estatísticas
            confiáveis
          </li>
        </ol>
      </div>

      {/* Timeline de eventos */}
      <div>
        <h4 className="font-semibold mb-2">Eventos da Partida:</h4>
        <div className="bg-gray-700/30 rounded p-2 max-h-40 overflow-y-auto">
          {!simulationData || simulationData.eventos.length === 0 ? (
            <p className="text-gray-400 text-center py-2">
              Aguardando eventos...
            </p>
          ) : (
            <div className="space-y-2">
              {simulationData.eventos.map((evento, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 text-right text-sm text-gray-400">
                    {evento.minuto}'
                  </div>
                  <div className="w-6 mx-2">
                    {evento.gol && (
                      <span className="text-yellow-400 text-lg">⚽</span>
                    )}
                    {evento.tipo === "chute" && !evento.gol && evento.noGol && (
                      <span className="text-gray-400">🥅</span>
                    )}
                    {evento.tipo === "chute" && !evento.noGol && (
                      <span className="text-gray-500">👟</span>
                    )}
                  </div>
                  <div
                    className={
                      evento.time === "mandante"
                        ? "text-blue-400"
                        : "text-red-400"
                    }
                  >
                    {evento.time === "mandante"
                      ? timeMandante?.nome || "Mandante"
                      : timeVisitante?.nome || "Visitante"}
                    {evento.gol && " marcou um gol!"}
                    {evento.tipo === "chute" &&
                      !evento.gol &&
                      evento.noGol &&
                      " chutou no gol"}
                    {evento.tipo === "chute" &&
                      !evento.noGol &&
                      " chutou para fora"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
