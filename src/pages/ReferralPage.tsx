import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { TelegramRequired } from '../components/referral/TelegramRequired';
import { ShareButtons } from '../components/referral/ShareButtons';
import { ReferralStats } from '../components/referral/ReferralStats';
import { ReferralRewards } from '../components/referral/ReferralRewards';

export function ReferralPage() {
  const { username } = useGameStore();
  const navigate = useNavigate();
  const isTelegramWebApp = Boolean(window.Telegram?.WebApp);
  const referralLink = `https://t.me/EMSXbot?start=${username}`;

  React.useEffect(() => {
    if (!isTelegramWebApp) {
      navigate('/');
    }
  }, [isTelegramWebApp, navigate]);

  if (!isTelegramWebApp) {
    return <TelegramRequired />;
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6">Referral Program</h1>
      
      <div className="glass-card rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-4 text-blue-400">
          <FaUsers size={24} />
          <h2 className="text-xl font-bold">Invite Friends</h2>
        </div>

        <p className="text-gray-400">
          Share your referral link with friends and earn rewards when they join! Each referral earns you bonus EMSX tokens.
        </p>

        <ShareButtons referralLink={referralLink} />
        <ReferralStats />
        <ReferralRewards />
      </div>
    </motion.div>
  );
}