import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { FaBitcoin, FaDollarSign, FaGift, FaPlay } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';
import { RewardedAd } from './RewardedAd';

export function TaskList() {
  const { tasks, claimTaskReward, watchAd } = useGameStore();
  const [showAd, setShowAd] = useState(false);

  const getMinerIcon = (type: string | undefined) => {
    switch (type) {
      case 'EMSX':
        return <SiEthereum className="text-blue-400" />;
      case 'USDT':
        return <FaDollarSign className="text-green-400" />;
      case 'BTC':
        return <FaBitcoin className="text-yellow-400" />;
      default:
        return null;
    }
  };

  const handleAdCompleted = () => {
    watchAd(); // Call `watchAd` to increment ad progress
    setShowAd(false); // Close the ad modal
  };

  const handleAdClosed = () => {
    setShowAd(false); // Close the ad modal without progress
  };

  if (tasks.length === 0) {
    return <div className="text-center text-gray-400">No tasks available</div>;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          className="p-4 rounded-xl bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold">{task.title}</h3>
              <p className="text-gray-400 text-sm">{task.description}</p>
              <p className="text-gray-400 text-xs">
                Progress: {task.progress || 0}/{task.maxProgress || task.requirement}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {/* Watch Ad Button */}
              {!task.completed && task.type === 'watchAds' && (
                <button
                  onClick={() => setShowAd(true)} // Show ad modal
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 hover:bg-blue-700"
                >
                  <FaPlay />
                  <span>Watch Ad</span>
                </button>
              )}

              {/* Claim Reward Button */}
              {task.completed && (
                <button
                  onClick={() => claimTaskReward(task.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 hover:bg-green-700"
                >
                  <FaGift />
                  <span>Claim Reward</span>
                </button>
              )}

              {/* Miner Reward Icon */}
              {getMinerIcon(task.reward?.type)}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Ad Modal */}
      {showAd && (
        <RewardedAd onClose={handleAdClosed} onRewarded={handleAdCompleted} />
      )}
    </div>
  );
}
