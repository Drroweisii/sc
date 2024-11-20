import React from 'react';
import { useGameStore } from '../store/gameStore';
import { StatsCard } from './StatsCard';
import { TaskList } from './TaskList';
import { FaBitcoin, FaDollarSign } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { username, balances, rates } = useGameStore();
  const navigate = useNavigate();

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome, <span className="text-blue-400">@{username}</span>!
        </h1>
        <p className="text-gray-400">Your Mining Dashboard</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatsCard
          icon={<SiEthereum size={24} />}
          type="EMSX"
          balance={balances.EMSX}
          rate={rates.EMSX}
          color="text-blue-500"
        />
        <StatsCard
          icon={<FaDollarSign size={24} />}
          type="USDT"
          balance={balances.USDT}
          rate={rates.USDT}
          color="text-green-500"
        />
        <StatsCard
          icon={<FaBitcoin size={24} />}
          type="BTC"
          balance={balances.BTC}
          rate={rates.BTC}
          color="text-yellow-500"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <TaskList />
      </div>

      <motion.button 
        onClick={() => navigate('/game')}
        className="w-full py-4 btn-primary rounded-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Start Mining
      </motion.button>
    </motion.div>
  );
}