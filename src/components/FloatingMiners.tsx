import React from 'react';
import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';
import { FaBitcoin, FaDollarSign } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';

export function FloatingMiners() {
  const { miners, selectedMiner, selectMiner } = useGameStore();
  const floatingMiners = miners.filter(m => m.position === null);

  if (floatingMiners.length === 0) {
    return null;
  }

  return (
    <div className="glass-card rounded-xl p-4">
      <h3 className="text-lg font-bold mb-3">Available Miners</h3>
      <div className="grid grid-cols-5 gap-2">
        {floatingMiners.map((miner) => (
          <motion.div
            key={miner.id}
            className={`glass-card p-2 rounded-lg cursor-pointer ${
              selectedMiner === miner.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => selectMiner(selectedMiner === miner.id ? null : miner.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center gap-1">
              {miner.type === 'EMSX' && <SiEthereum className="text-blue-400" size={20} />}
              {miner.type === 'USDT' && <FaDollarSign className="text-green-400" size={20} />}
              {miner.type === 'BTC' && <FaBitcoin className="text-yellow-400" size={20} />}
              <div className="text-xs">Lvl {miner.level}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}