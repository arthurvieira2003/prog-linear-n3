"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TeamLogo from "./TeamLogo";
import StarRating from "./StarRating";

export default function TeamCard({
  time,
  showStats = false,
  editable = false,
  onForceChange = () => {},
  animationDelay = 0,
}) {
  const setHovering = useState(false);

  const gradientStyle = {
    background: `linear-gradient(135deg, ${time.cor} 0%, ${
      time.corSecundaria || time.cor
    } 100%)`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      whileHover={{ scale: 1.03 }}
      className="team-card relative overflow-hidden backdrop-blur-sm"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="absolute inset-0 opacity-15" style={gradientStyle} />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-3 w-20 h-20 flex items-center justify-center">
          <TeamLogo team={time} size={80} />
        </div>

        <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {time.nome}
        </h3>

        <div className="w-full px-2 mb-3">
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-red-400">ATQ:</span>
              <StarRating value={time.ataque} size="sm" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-400">MEI:</span>
              <StarRating value={time.meio} size="sm" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-400">DEF:</span>
              <StarRating value={time.defesa} size="sm" />
            </div>
          </div>
        </div>

        {editable && (
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="flex items-center bg-black/30 rounded-md overflow-hidden border border-gray-700">
              <button
                onClick={() => onForceChange(time.id, time.forca - 1)}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-700 transition-colors"
                disabled={time.forca <= 50}
              >
                -
              </button>
              <div className="w-10 text-center py-1 bg-black/50 font-medium">
                {time.forca}
              </div>
              <button
                onClick={() => onForceChange(time.id, time.forca + 1)}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-700 transition-colors"
                disabled={time.forca >= 99}
              >
                +
              </button>
            </div>
          </div>
        )}

        {showStats && (
          <div className="w-full pt-3 border-t border-gray-700/50">
            <div className="flex justify-between text-sm">
              {time.probabilidadeRebaixamento !== undefined && (
                <div className="text-center">
                  <div className="text-red-400 font-bold">
                    {time.probabilidadeRebaixamento?.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">Rebaixamento</div>
                </div>
              )}

              {time.probabilidadePodio !== undefined && (
                <div className="text-center">
                  <div className="text-blue-400 font-bold">
                    {time.probabilidadePodio?.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">Pódio</div>
                </div>
              )}
            </div>

            {time.titulos > 0 && (
              <div className="mt-3 text-xs text-center flex justify-center items-center gap-3">
                <div className="flex items-center">
                  <span className="trophy-icon mr-1">🏆</span>
                  <span>{time.titulos}</span>
                </div>
                {time.vices > 0 && (
                  <div className="flex items-center">
                    <span className="silver-medal mr-1">🥈</span>
                    <span>{time.vices}</span>
                  </div>
                )}
                {time.terceiros > 0 && (
                  <div className="flex items-center">
                    <span className="bronze-medal mr-1">🥉</span>
                    <span>{time.terceiros}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
