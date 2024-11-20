import React from 'react';

export function ReferralStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="glass-card p-4 rounded-xl text-center">
        <div className="text-2xl font-bold text-blue-400">0</div>
        <div className="text-sm text-gray-400">Total Referrals</div>
      </div>
      <div className="glass-card p-4 rounded-xl text-center">
        <div className="text-2xl font-bold text-green-400">0 EMSX</div>
        <div className="text-sm text-gray-400">Earnings</div>
      </div>
    </div>
  );
}