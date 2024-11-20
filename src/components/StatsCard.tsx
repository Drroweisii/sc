import React from 'react';
import { type MinerType } from '../store/gameStore';
import { formatNumber } from '../lib/utils';
import { motion } from 'framer-motion';

interface StatsCardProps {
  icon: React.ReactNode;
  type: MinerType;
  balance: number;
  rate: number;
  color: string;
}

export function StatsCard({ icon, type, balance, rate }: StatsCardProps) {
  return (
    <motion.div 
      className="glass-card rounded-lg p-3 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-white/5">
          {icon}
        </div>
        <h3 className="text-sm font-bold">{type}</h3>
      </div>
      <div className="space-y-0.5">
        <p className="text-lg font-bold text-white">{formatNumber(balance)}</p>
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <span className="text-green-400">↗</span>
          {formatNumber(rate)}/s
        </p>
      </div>
    </motion.div>
  );
}