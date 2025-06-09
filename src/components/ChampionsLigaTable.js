import { motion } from "framer-motion";
import TeamLogo from "./TeamLogo";

export default function ChampionsLigaTable({ classificacao }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card overflow-x-auto"
    >
      <h3 className="text-xl font-bold mb-4">Classificação da Fase de Liga</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Pos.
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Time
              </th>
              <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                P
              </th>
              <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                J
              </th>
              <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                V
              </th>
              <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                E
              </th>
              <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                D
              </th>
              <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                GP
              </th>
              <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                GC
              </th>
              <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                SG
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {classificacao.map((time, index) => (
              <tr
                key={time.id}
                className={
                  index < 8
                    ? "bg-green-900/20"
                    : index < 24
                    ? "bg-blue-900/20"
                    : "bg-red-900/20"
                }
              >
                <td className="py-2 text-sm">{index + 1}</td>
                <td className="py-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-2 relative">
                      <TeamLogo team={time} size={24} />
                    </div>
                    {time.nome}
                  </div>
                </td>
                <td className="py-2 text-sm text-center font-bold">
                  {time.pontos}
                </td>
                <td className="py-2 text-sm text-center">{time.jogos}</td>
                <td className="py-2 text-sm text-center">{time.vitorias}</td>
                <td className="py-2 text-sm text-center">{time.empates}</td>
                <td className="py-2 text-sm text-center">{time.derrotas}</td>
                <td className="py-2 text-sm text-center">{time.golsPro}</td>
                <td className="py-2 text-sm text-center">{time.golsContra}</td>
                <td className="py-2 text-sm text-center">{time.saldoGols}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-sm">
          <div className="flex items-center my-1">
            <div className="w-4 h-4 bg-green-900/20 mr-2"></div>
            <span>
              Classificados diretamente para as oitavas de final (1º-8º)
            </span>
          </div>
          <div className="flex items-center my-1">
            <div className="w-4 h-4 bg-blue-900/20 mr-2"></div>
            <span>Disputam playoffs para as oitavas de final (9º-24º)</span>
          </div>
          <div className="flex items-center my-1">
            <div className="w-4 h-4 bg-red-900/20 mr-2"></div>
            <span>Eliminados (25º-36º)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
