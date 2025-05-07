import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ['A', 'B', 'C', 'D', 'E'],
  datasets: [
    {
      label: 'Points in Hull',
      data: [3, 5, 2, 8, 6],
      backgroundColor: 'rgba(59,130,246,0.8)',
      borderColor: 'rgba(59,130,246,1)',
      borderWidth: 2,
      borderRadius: 8,
      hoverBackgroundColor: 'rgba(16,185,129,0.8)',
      hoverBorderColor: 'rgba(16,185,129,1)',
      barPercentage: 0.7,
      categoryPercentage: 0.6,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#fff',
        font: { size: 16, weight: 'bold' as const },
      },
    },
    tooltip: {
      backgroundColor: '#222',
      titleColor: '#fff',
      bodyColor: '#fff',
    },
  },
  scales: {
    x: {
      grid: { color: '#333' },
      ticks: { color: '#fff', font: { size: 14 } },
    },
    y: {
      grid: { color: '#333' },
      ticks: { color: '#fff', font: { size: 14 } },
    },
  },
};

const Report: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-white drop-shadow-lg"
      >
        Report & Analysis
      </motion.h1>
      <motion.div
        initial={{ scale: 0.9, rotateY: 10 }}
        animate={{ scale: 1, rotateY: 0 }}
        whileHover={{ scale: 1.03, rotateY: 5, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.25)' }}
        className="w-full max-w-2xl bg-gray-900 border border-blue-900 rounded-2xl p-8 shadow-2xl mb-8"
        style={{ perspective: 1000 }}
      >
        <Bar data={data} options={options} />
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.08, y: -2, boxShadow: '0 8px 32px 0 rgba(16,185,129,0.25)' }}
        whileTap={{ scale: 0.96, boxShadow: '0 2px 8px 0 rgba(16,185,129,0.15)' }}
        className="bg-gradient-to-r from-blue-700 to-green-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
      >
        Download Report
      </motion.button>
    </div>
  );
};

export default Report; 