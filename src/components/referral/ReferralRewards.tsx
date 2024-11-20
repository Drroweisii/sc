import React from 'react';
import { useGameStore } from '../../store/gameStore';

export function ReferralRewards() {
  const { referralCount, unlockedCells } = useGameStore();
  
  const unlockRequirements = [
    { count: 1, cells: 3 },
    { count: 3, cells: 3 },
    { count: 5, cells: 3 },
    { count: 10, cells: 3 },
    { count: 15, cells: 3 },
  ];

  return (
    <div className="glass-card p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
      <h3 className="text-lg font-bold text-blue-400 mb-2">Referral Rewards</h3>
      <ul className="text-sm space-y-2">
        <li className="text-gray-400">• 10 EMSX for each new referral</li>
        <li className="text-gray-400">• 5% of your referrals' mining earnings</li>
        <li className="text-gray-400">• Unlock more mining cells:</li>
        <ul className="ml-4 space-y-1">
          {unlockRequirements.map(({ count, cells }) => (
            <li key={count} className={referralCount >= count ? 'text-green-400' : 'text-gray-500'}>
              {referralCount >= count ? '✓' : '○'} {cells} cells at {count} referral{count !== 1 ? 's' : ''}
            </li>
          ))}
        </ul>
      </ul>
      <div className="mt-4 text-sm text-gray-400">
        Currently unlocked: {unlockedCells}/20 cells
      </div>
    </div>
  );
}