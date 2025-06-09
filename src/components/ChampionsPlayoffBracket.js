import { motion } from "framer-motion";
import TeamLogo from "./TeamLogo";

export default function ChampionsPlayoffBracket({ confrontos }) {
  if (!confrontos || confrontos.length === 0) {
    return <div>Nenhum confronto de playoff disponível</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <h3 className="text-xl font-bold mb-6">
        Playoffs para as Oitavas de Final
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {confrontos.map((confronto) => {
          // Estilos para gradientes de fundo
          const mandanteStyle = {
            background: confronto.mandante.cor
              ? `linear-gradient(90deg, ${confronto.mandante.cor}40 0%, transparent 100%)`
              : "linear-gradient(90deg, rgba(59, 130, 246, 0.2) 0%, transparent 100%)",
          };

          const visitanteStyle = {
            background: confronto.visitante.cor
              ? `linear-gradient(90deg, ${confronto.visitante.cor}40 0%, transparent 100%)`
              : "linear-gradient(90deg, rgba(239, 68, 68, 0.2) 0%, transparent 100%)",
          };

          return (
            <div
              key={confronto.id}
              className="bg-gray-800/70 rounded-lg p-4 backdrop-blur-sm border border-gray-700 shadow-md relative overflow-hidden hover:bg-gray-800 transition-all duration-200"
            >
              <div
                className="absolute inset-0 top-0 h-1/2 opacity-50"
                style={mandanteStyle}
              ></div>
              <div
                className="absolute inset-0 top-1/2 h-1/2 opacity-50"
                style={visitanteStyle}
              ></div>

              <div className="relative z-1">
                <div className="text-center text-gray-400 text-sm mb-3 border-b border-gray-700 pb-2">
                  Confronto {confronto.id}
                </div>

                {/* Jogo de ida */}
                <div className="mb-4 border-b border-gray-700 pb-3">
                  <div className="text-xs text-gray-400 mb-2">Jogo de ida</div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-6 h-6 relative mr-2">
                        <TeamLogo team={confronto.mandante} size={24} />
                      </div>
                      <span className="text-sm font-medium">
                        {confronto.mandante.nome}
                      </span>
                    </div>
                    <div className="flex items-center font-bold">
                      <span>{confronto.golsMandanteIda}</span>
                      <span className="mx-1">-</span>
                      <span>{confronto.golsVisitanteIda}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">
                        {confronto.visitante.nome}
                      </span>
                      <div className="w-6 h-6 relative ml-2">
                        <TeamLogo team={confronto.visitante} size={24} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Jogo de volta */}
                <div className="mb-4 border-b border-gray-700 pb-3">
                  <div className="text-xs text-gray-400 mb-2">
                    Jogo de volta
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-6 h-6 relative mr-2">
                        <TeamLogo team={confronto.visitante} size={24} />
                      </div>
                      <span className="text-sm font-medium">
                        {confronto.visitante.nome}
                      </span>
                    </div>
                    <div className="flex items-center font-bold">
                      <span>{confronto.golsMandanteVolta}</span>
                      <span className="mx-1">-</span>
                      <span>{confronto.golsVisitanteVolta}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">
                        {confronto.mandante.nome}
                      </span>
                      <div className="w-6 h-6 relative ml-2">
                        <TeamLogo team={confronto.mandante} size={24} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Placar agregado */}
                <div className="text-center mb-4 flex justify-center">
                  <div className="bg-gray-900/90 rounded-md px-4 py-2 border border-gray-700">
                    <span className="text-xs text-gray-400">
                      Placar agregado:{" "}
                    </span>
                    <div className="flex items-center">
                      <div className="flex items-center mr-1">
                        <div className="w-4 h-4 relative mr-1">
                          <TeamLogo team={confronto.mandante} size={16} />
                        </div>
                        <span
                          className={`font-bold ${
                            confronto.vencedor?.id === confronto.mandante.id
                              ? "text-green-500"
                              : ""
                          }`}
                        >
                          {confronto.golsMandanteIda +
                            confronto.golsVisitanteVolta}
                        </span>
                      </div>
                      <span className="mx-1">-</span>
                      <div className="flex items-center ml-1">
                        <span
                          className={`font-bold ${
                            confronto.vencedor?.id === confronto.visitante.id
                              ? "text-green-500"
                              : ""
                          }`}
                        >
                          {confronto.golsVisitanteIda +
                            confronto.golsMandanteVolta}
                        </span>
                        <div className="w-4 h-4 relative ml-1">
                          <TeamLogo team={confronto.visitante} size={16} />
                        </div>
                      </div>
                    </div>
                    {confronto.penaltis && (
                      <div className="text-gray-400 text-xs mt-1">
                        Pênaltis: {confronto.penaltis[0]} -{" "}
                        {confronto.penaltis[1]}
                      </div>
                    )}
                  </div>
                </div>

                {/* Exibir os gols de cada time para verificação */}
                <div className="text-center mb-3 text-xs text-gray-400">
                  <div>
                    <span>
                      {confronto.mandante.nome}: {confronto.golsMandanteIda}{" "}
                      (ida) + {confronto.golsVisitanteVolta} (volta)
                    </span>
                  </div>
                  <div>
                    <span>
                      {confronto.visitante.nome}: {confronto.golsVisitanteIda}{" "}
                      (ida) + {confronto.golsMandanteVolta} (volta)
                    </span>
                  </div>
                </div>

                {/* Classificado */}
                <div className="text-center bg-gray-900/50 py-2 rounded-md border border-gray-700 mt-4">
                  <div className="text-xs text-gray-400 mb-1">Classificado</div>
                  <div className="flex justify-center items-center">
                    <div className="w-6 h-6 relative mr-2">
                      <TeamLogo team={confronto.vencedor} size={24} />
                    </div>
                    <span className="font-bold text-green-500">
                      {confronto.vencedor.nome}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
