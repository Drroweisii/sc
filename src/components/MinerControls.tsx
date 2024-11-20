import React from 'react';
import { MinerCard } from './MinerCard';
import { FaBitcoin, FaDollarSign } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';

const MINER_COSTS = {
  EMSX: 10,
  USDT: 100,
  BTC: 1000,
};

export function MinerControls() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <MinerCard
        type="EMSX"
        cost={MINER_COSTS.EMSX}
        icon={<SiEthereum size={20} />}
        color="text-blue-500"
      />
      <MinerCard
        type="USDT"
        cost={MINER_COSTS.USDT}
        icon={<FaDollarSign size={20} />}
        color="text-green-500"
      />
      <MinerCard
        type="BTC"
        cost={MINER_COSTS.BTC}
        icon={<FaBitcoin size={20} />}
        color="text-yellow-500"
      />
    </div>
  );
}