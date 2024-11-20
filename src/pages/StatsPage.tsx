import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { StatsCard } from '../components/StatsCard';
import { FaBitcoin, FaDollarSign } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';

export function StatsPage() {
  const { balances, rates } = useGameStore();

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6">Statistics</h1>
      
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

      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Mining History</h2>
        <p className="text-gray-400">Coming soon...</p>
      </div>
    </motion.div>
  );
}