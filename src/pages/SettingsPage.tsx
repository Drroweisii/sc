import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export function SettingsPage() {
  const { username } = useGameStore();

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="glass-card rounded-2xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            readOnly
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Theme
          </label>
          <select className="input">
            <option value="dark">Dark</option>
            <option value="light" disabled>Light (Coming soon)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Sound Effects
          </label>
          <div className="flex items-center gap-4">
            <button className="btn-primary">
              Enable Sound
            </button>
            <span className="text-gray-400">(Coming soon)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}