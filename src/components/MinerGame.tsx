import React from 'react';
import { GameGrid } from './GameGrid';
import { MinerControls } from './MinerControls';
import { FloatingMiners } from './FloatingMiners';
import { StatsCard } from './StatsCard';
import { useGameStore } from '../store/gameStore';
import { FaBitcoin, FaDollarSign } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';
import { motion } from 'framer-motion';

export function MinerGame() {
  const { balances, rates, updateBalances } = useGameStore();

  React.useEffect(() => {
    const interval = setInterval(updateBalances, 1000);
    return () => clearInterval(interval);
  }, [updateBalances]);

  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-3 gap-2">
        <StatsCard
          icon={<SiEthereum size={16} />}
          type="EMSX"
          balance={balances.EMSX}
          rate={rates.EMSX}
          color="text-blue-500"
        />
        <StatsCard
          icon={<FaDollarSign size={16} />}
          type="USDT"
          balance={balances.USDT}
          rate={rates.USDT}
          color="text-green-500"
        />
        <StatsCard
          icon={<FaBitcoin size={16} />}
          type="BTC"
          balance={balances.BTC}
          rate={rates.BTC}
          color="text-yellow-500"
        />
      </div>

      <GameGrid />
      <FloatingMiners />
      <MinerControls />
    </motion.div>
  );
}