import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Report from './pages/Report';

const NavButton: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const location = window.location.pathname;
  const isActive = location === to;
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.07, boxShadow: '0 6px 24px 0 rgba(0,0,0,0.2)' }}
      whileTap={{ scale: 0.96, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.15)' }}
      className="inline-block"
    >
      <Link
        to={to}
        className={`px-5 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none border-b-2 ${
          isActive
            ? 'bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg border-blue-400'
            : 'bg-gray-800 text-gray-200 border-transparent hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-900 hover:text-white hover:border-blue-400 shadow-md'
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <nav className="bg-gray-900 border-b border-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-white"
            >
              Convex Hull GUI
            </motion.div>
            <div className="space-x-4">
              <NavButton to="/">Home</NavButton>
              <NavButton to="/report">Report</NavButton>
              <NavButton to="/about">About</NavButton>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 