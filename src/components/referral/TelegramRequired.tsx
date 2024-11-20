import React from 'react';
import { motion } from 'framer-motion';
import { FaTelegram } from 'react-icons/fa';

export function TelegramRequired() {
  return (
    <motion.div
      className="min-h-[60vh] flex items-center justify-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="glass-card rounded-2xl p-8 max-w-md">
        <FaTelegram size={48} className="text-blue-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Telegram Required</h2>
        <p className="text-gray-400">
          The referral program is only available through the Telegram WebApp.
          Please open this game using Telegram to access the referral features.
        </p>
      </div>
    </motion.div>
  );
}