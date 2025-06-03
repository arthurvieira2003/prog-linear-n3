"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ChampionshipChart({
  data = [],
  title = "Probabilidades",
  colors = [],
  isLoading = false,
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    import("chart.js").then(({ Chart, registerables }) => {
      Chart.register(...registerables);

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      if (chartRef.current && data.length > 0) {
        const ctx = chartRef.current.getContext("2d");

        const defaultColors = [
          "#10b981",
          "#3b82f6",
          "#6366f1",
          "#8b5cf6",
          "#ec4899",
          "#f43f5e",
          "#f97316",
          "#f59e0b",
          "#a3e635",
          "#14b8a6",
        ];

        const gradients = data.map((_, index) => {
          const color =
            colors[index] || defaultColors[index % defaultColors.length];
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, color);
          gradient.addColorStop(
            1,
            color.replace(")", ", 0.5)").replace("rgb", "rgba")
          );
          return gradient;
        });

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: data.map((item) => item.nome),
            datasets: [
              {
                label: "Probabilidade (%)",
                data: data.map((item) => item.valor),
                backgroundColor: gradients,
                borderColor: colors.length > 0 ? colors : defaultColors,
                borderWidth: 1,
                borderRadius: 6,
                barThickness: 32,
                maxBarThickness: 40,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: "easeOutQuart",
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleFont: {
                  size: 16,
                  weight: "bold",
                },
                bodyFont: {
                  size: 14,
                },
                padding: 16,
                displayColors: false,
                callbacks: {
                  label: function (context) {
                    return `Probabilidade: ${context.raw.toFixed(1)}%`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  color: "rgba(255, 255, 255, 0.7)",
                  font: {
                    weight: "bold",
                  },
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                  drawBorder: false,
                },
                ticks: {
                  color: "rgba(255, 255, 255, 0.7)",
                  callback: function (value) {
                    return value + "%";
                  },
                },
              },
            },
          },
        });
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, colors, isClient]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          {title}
        </h3>
        {isLoading && <div className="loading-spinner"></div>}
      </div>

      <div className="relative h-80">
        {isClient && data.length > 0 ? (
          <canvas ref={chartRef} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            {isLoading
              ? "Calculando probabilidades..."
              : "Simule o campeonato para ver as probabilidades"}
          </div>
        )}
      </div>
    </motion.div>
  );
}
