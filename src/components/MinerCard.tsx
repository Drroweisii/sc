import React from 'react';
import { motion } from 'framer-motion';
import { type MinerType, useGameStore } from '../store/gameStore';
import { formatNumber } from '../lib/utils';

interface MinerCardProps {
  type: MinerType;
  cost: number;
  icon: React.ReactNode;
  color: string;
}

export function MinerCard({ type, cost, icon, color }: MinerCardProps) {
  const { balances, addMiner } = useGameStore();
  const canAfford = balances[type] >= cost;

  return (
    <motion.div
      className="glass-card rounded-xl p-4 h-full"
      whileHover={canAfford ? { scale: 1.02 } : undefined}
      whileTap={canAfford ? { scale: 0.98 } : undefined}
      style={{ opacity: canAfford ? 1 : 0.5 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`${color} p-2 rounded-lg bg-opacity-10 bg-current`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-bold ${color} truncate`}>{type}</h3>
          <p className="text-xs text-gray-400">
            {formatNumber(cost)} {type}
          </p>
        </div>
      </div>
      
      <button
        onClick={() => canAfford && addMiner(type)}
        disabled={!canAfford}
        className={`w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
          canAfford
            ? `bg-gradient-to-r ${
                type === 'EMSX' ? 'from-blue-600 to-blue-400' :
                type === 'USDT' ? 'from-green-600 to-green-400' :
                'from-yellow-600 to-yellow-400'
              } hover:brightness-110 active:brightness-90 text-white`
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
        }`}
      >
        {canAfford ? 'Hire' : 'Need More'}
      </button>
    </motion.div>
  );
}