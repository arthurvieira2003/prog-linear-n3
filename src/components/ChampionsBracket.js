import { motion } from "framer-motion";
import TeamLogo from "./TeamLogo";

export default function ChampionsBracket({ chaveamento }) {
  if (!chaveamento) return null;

  const { oitavas, quartas, semifinais, final } = chaveamento;

  const renderPartida = (partida, fase) => {
    if (!partida) return null;

    const isIda = partida.golsMandanteIda !== undefined;
    const temPenaltis =
      partida.penaltis !== null && partida.penaltis !== undefined;

    // Classes para mandante
    const mandanteClasses = `flex items-center ${
      partida.vencedor?.id === partida.mandante.id
        ? "text-green-400 font-semibold"
        : ""
    }`;

    // Classes para visitante
    const visitanteClasses = `flex items-center ${
      partida.vencedor?.id === partida.visitante.id
        ? "text-green-400 font-semibold"
        : ""
    }`;

    // Se for jogo único (final)
    if (!isIda) {
      return (
        <div className="match-card p-3 rounded-lg border border-gray-700 bg-gray-800 shadow-md w-[270px]">
          <div className="grid grid-cols-12 items-center mb-2">
            <div className={`col-span-5 ${mandanteClasses}`}>
              <div className="flex items-center">
                <div className="w-6 h-6 relative mr-2">
                  <TeamLogo team={partida.mandante} size={24} />
                </div>
                <span className="text-sm truncate max-w-[100px] font-medium">
                  {partida.mandante.nome}
                </span>
              </div>
            </div>

            <div className="col-span-2 flex justify-center font-bold">
              <span className="text-sm">{partida.golsMandante}</span>
              <span className="mx-1">-</span>
              <span className="text-sm">{partida.golsVisitante}</span>
              {temPenaltis && (
                <span className="text-xs text-gray-400 ml-1">
                  ({partida.penaltis[0]}-{partida.penaltis[1]})
                </span>
              )}
            </div>

            <div className={`col-span-5 ${visitanteClasses} flex justify-end`}>
              <div className="flex items-center">
                <span className="text-sm truncate max-w-[100px] font-medium">
                  {partida.visitante.nome}
                </span>
                <div className="w-6 h-6 relative ml-2">
                  <TeamLogo team={partida.visitante} size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Para jogos de ida e volta
    return (
      <div className="match-card p-3 rounded-lg border border-gray-700 bg-gray-800 shadow-md w-[270px]">
        {/* Jogo de ida */}
        <div className="mb-3">
          <div className="text-xs text-gray-400 mb-1 text-center">
            Jogo de ida
          </div>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-5 flex items-center">
              <div className="w-5 h-5 relative mr-1 flex-shrink-0">
                <TeamLogo team={partida.mandante} size={20} />
              </div>
              <span className="text-xs truncate max-w-[80px]">
                {partida.mandante.nome}
              </span>
            </div>

            <div className="col-span-2 flex justify-center font-bold">
              <span className="text-sm">{partida.golsMandanteIda}</span>
              <span className="mx-1">-</span>
              <span className="text-sm">{partida.golsVisitanteIda}</span>
            </div>

            <div className="col-span-5 flex items-center justify-end">
              <span className="text-xs truncate max-w-[80px] text-right">
                {partida.visitante.nome}
              </span>
              <div className="w-5 h-5 relative ml-1 flex-shrink-0">
                <TeamLogo team={partida.visitante} size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Jogo de volta */}
        <div className="mb-3">
          <div className="text-xs text-gray-400 mb-1 text-center">
            Jogo de volta
          </div>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-5 flex items-center">
              <div className="w-5 h-5 relative mr-1 flex-shrink-0">
                <TeamLogo team={partida.visitante} size={20} />
              </div>
              <span className="text-xs truncate max-w-[80px]">
                {partida.visitante.nome}
              </span>
            </div>

            <div className="col-span-2 flex justify-center font-bold">
              <span className="text-sm">{partida.golsMandanteVolta}</span>
              <span className="mx-1">-</span>
              <span className="text-sm">{partida.golsVisitanteVolta}</span>
            </div>

            <div className="col-span-5 flex items-center justify-end">
              <span className="text-xs truncate max-w-[80px] text-right">
                {partida.mandante.nome}
              </span>
              <div className="w-5 h-5 relative ml-1 flex-shrink-0">
                <TeamLogo team={partida.mandante} size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Agregado */}
        <div className="text-center px-2 py-1 rounded-md bg-gray-900 border border-gray-700">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-5 flex items-center justify-end">
              <span className="text-xs text-gray-400 mr-1">Agregado:</span>
              <div className="flex items-center">
                <div className="w-4 h-4 relative mr-1 flex-shrink-0">
                  <TeamLogo team={partida.mandante} size={16} />
                </div>
                <span
                  className={
                    partida.vencedor?.id === partida.mandante.id
                      ? "text-green-400 font-bold"
                      : ""
                  }
                >
                  {partida.golsMandanteIda + partida.golsVisitanteVolta}
                </span>
              </div>
            </div>

            <div className="col-span-2 flex justify-center items-center">
              <span className="mx-1 text-xs">-</span>
            </div>

            <div className="col-span-5 flex items-center">
              <div className="flex items-center">
                <span
                  className={
                    partida.vencedor?.id === partida.visitante.id
                      ? "text-green-400 font-bold"
                      : ""
                  }
                >
                  {partida.golsVisitanteIda + partida.golsMandanteVolta}
                </span>
                <div className="w-4 h-4 relative ml-1 flex-shrink-0">
                  <TeamLogo team={partida.visitante} size={16} />
                </div>
              </div>
            </div>
          </div>

          {temPenaltis && (
            <div className="text-xs text-gray-400 mt-1">
              Pênaltis: {partida.penaltis[0]}-{partida.penaltis[1]}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Retornar o bracket com o estilo exato da imagem
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <h3 className="text-xl font-bold mb-8">Fase Eliminatória</h3>

      <div className="overflow-x-auto pb-6">
        <div className="grid grid-cols-4 gap-12 mb-6 w-[1200px]">
          <div>
            <h4 className="text-md font-semibold text-center text-blue-400 mb-6">
              Oitavas de Final
            </h4>
          </div>
          <div>
            <h4 className="text-md font-semibold text-center text-blue-400 mb-6">
              Quartas de Final
            </h4>
          </div>
          <div>
            <h4 className="text-md font-semibold text-center text-blue-400 mb-6">
              Semifinais
            </h4>
          </div>
          <div>
            <h4 className="text-md font-semibold text-center text-blue-400 mb-6">
              Final
            </h4>
          </div>
        </div>

        <div className="relative w-[1200px]" style={{ height: "1500px" }}>
          {/* Oitavas de Final */}
          {oitavas &&
            oitavas.map((partida, index) => {
              // Altura da posição vertical de cada par de jogos
              const topPosition = index * 180;
              return (
                <div
                  key={`oitavas-${partida.id}`}
                  className="absolute"
                  style={{
                    left: "0px",
                    top: `${topPosition}px`,
                  }}
                >
                  {renderPartida(partida, "oitavas")}
                </div>
              );
            })}

          {/* Quartas de Final */}
          {quartas &&
            quartas.map((partida, index) => {
              // Cada jogo de quartas fica entre dois jogos de oitavas
              const topPosition = index * 360 + 90;
              return (
                <div
                  key={`quartas-${partida.id}`}
                  className="absolute"
                  style={{
                    left: "320px",
                    top: `${topPosition}px`,
                  }}
                >
                  {renderPartida(partida, "quartas")}
                </div>
              );
            })}

          {/* Semifinais */}
          {semifinais &&
            semifinais.map((partida, index) => {
              // Cada jogo de semifinal fica entre dois jogos de quartas
              const topPosition = index * 720 + 270;
              return (
                <div
                  key={`semifinal-${partida.id}`}
                  className="absolute"
                  style={{
                    left: "640px",
                    top: `${topPosition}px`,
                  }}
                >
                  {renderPartida(partida, "semifinal")}
                </div>
              );
            })}

          {/* Final */}
          {final && (
            <div
              className="absolute"
              style={{
                left: "960px",
                top: "630px",
              }}
            >
              {renderPartida(final, "final")}
            </div>
          )}

          {/* Linhas de conexão - Oitavas para Quartas */}
          {oitavas &&
            oitavas.map((partida, index) => {
              // A cada 2 jogos, temos uma conexão para quartas
              if (index % 2 === 0) {
                const pairIndex = Math.floor(index / 2);
                // Coordenadas para as linhas
                const startY1 = index * 180 + 60;
                const startY2 = (index + 1) * 180 + 60;
                const midY = (startY1 + startY2) / 2;
                const endY = pairIndex * 360 + 90 + 60;

                return (
                  <div key={`connect-oitavas-${index}`}>
                    {/* Linha horizontal do jogo 1 */}
                    <div
                      className="absolute border-t-2 border-gray-600"
                      style={{
                        left: "270px",
                        top: `${startY1}px`,
                        width: "30px",
                      }}
                    ></div>

                    {/* Linha horizontal do jogo 2 */}
                    <div
                      className="absolute border-t-2 border-gray-600"
                      style={{
                        left: "270px",
                        top: `${startY2}px`,
                        width: "30px",
                      }}
                    ></div>

                    {/* Linha vertical conectando os dois jogos */}
                    <div
                      className="absolute border-l-2 border-gray-600"
                      style={{
                        left: "300px",
                        top: `${startY1}px`,
                        height: `${startY2 - startY1}px`,
                      }}
                    ></div>

                    {/* Linha horizontal até quartas */}
                    <div
                      className="absolute border-t-2 border-gray-600"
                      style={{
                        left: "300px",
                        top: `${midY}px`,
                        width: "20px",
                      }}
                    ></div>
                  </div>
                );
              }
              return null;
            })}

          {/* Linhas de conexão - Quartas para Semifinais */}
          {quartas &&
            quartas.map((partida, index) => {
              // A cada 2 jogos, temos uma conexão para semifinais
              if (index % 2 === 0) {
                const pairIndex = Math.floor(index / 2);
                // Coordenadas para as linhas
                const startY1 = index * 360 + 90 + 60;
                const startY2 = (index + 1) * 360 + 90 + 60;
                const midY = (startY1 + startY2) / 2;
                const endY = pairIndex * 720 + 270 + 60;

                return (
                  <div key={`connect-quartas-${index}`}>
                    {/* Linha horizontal do jogo 1 */}
                    <div
                      className="absolute border-t-2 border-gray-600"
                      style={{
                        left: "590px",
                        top: `${startY1}px`,
                        width: "30px",
                      }}
                    ></div>

                    {/* Linha horizontal do jogo 2 */}
                    <div
                      className="absolute border-t-2 border-gray-600"
                      style={{
                        left: "590px",
                        top: `${startY2}px`,
                        width: "30px",
                      }}
                    ></div>

                    {/* Linha vertical conectando os dois jogos */}
                    <div
                      className="absolute border-l-2 border-gray-600"
                      style={{
                        left: "620px",
                        top: `${startY1}px`,
                        height: `${startY2 - startY1}px`,
                      }}
                    ></div>

                    {/* Linha horizontal até semis */}
                    <div
                      className="absolute border-t-2 border-gray-600"
                      style={{
                        left: "620px",
                        top: `${midY}px`,
                        width: "20px",
                      }}
                    ></div>
                  </div>
                );
              }
              return null;
            })}

          {/* Linhas de conexão - Semifinais para Final */}
          {semifinais && semifinais.length >= 2 && (
            <div>
              {/* Linha horizontal da semifinal 1 */}
              <div
                className="absolute border-t-2 border-gray-600"
                style={{
                  left: "910px",
                  top: "330px",
                  width: "30px",
                }}
              ></div>

              {/* Linha horizontal da semifinal 2 */}
              <div
                className="absolute border-t-2 border-gray-600"
                style={{
                  left: "910px",
                  top: "990px",
                  width: "30px",
                }}
              ></div>

              {/* Linha vertical conectando as duas semifinais */}
              <div
                className="absolute border-l-2 border-gray-600"
                style={{
                  left: "940px",
                  top: "330px",
                  height: "660px",
                }}
              ></div>

              {/* Linha horizontal até a final */}
              <div
                className="absolute border-t-2 border-gray-600"
                style={{
                  left: "940px",
                  top: "690px",
                  width: "20px",
                }}
              ></div>
            </div>
          )}

          {/* Campeão */}
          {final && final.vencedor && (
            <div
              className="absolute flex flex-col items-center"
              style={{
                left: "1080px",
                top: "720px",
              }}
            >
              <div className="text-center">
                <div className="text-md font-semibold text-yellow-500 mb-2">
                  CAMPEÃO
                </div>
                <div className="w-16 h-16 mx-auto relative mb-2">
                  <TeamLogo team={final.vencedor} size={64} />
                </div>
                <div className="text-lg font-bold text-yellow-400">
                  {final.vencedor.nome}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
