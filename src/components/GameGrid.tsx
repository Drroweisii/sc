import React from 'react';
import { useGameStore, type Miner } from '../store/gameStore';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { FaTrash, FaLock } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

interface MinerCellProps {
  miner?: Miner;
  position: number;
  isLocked: boolean;
}

function MinerCell({ miner, position, isLocked }: MinerCellProps) {
  const { selectedMiner, selectMiner, mergeMiner, removeMiner, placeMiner } = useGameStore();
  const isSelected = selectedMiner === miner?.id;
  const canMerge = selectedMiner && miner && selectedMiner !== miner.id;

  const handleClick = () => {
    if (isLocked) return;
    
    if (!miner) {
      if (selectedMiner) {
        placeMiner(selectedMiner, position);
      }
      return;
    }
    
    if (selectedMiner && canMerge) {
      mergeMiner(selectedMiner, miner.id);
    } else {
      selectMiner(isSelected ? null : miner.id);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (miner) {
      removeMiner(miner.id);
    }
  };

  if (isLocked) {
    return (
      <motion.div
        className="glass-card aspect-square rounded-lg p-1.5 bg-gray-800/50 cursor-not-allowed flex items-center justify-center"
        data-tooltip-id="cell-tooltip"
        data-tooltip-content="Unlock more cells by inviting friends!"
      >
        <FaLock className="text-gray-600" size={20} />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(
        "glass-card aspect-square rounded-lg p-1.5 cursor-pointer transition-all relative group",
        isSelected && "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900",
        canMerge && "ring-2 ring-green-500 ring-offset-2 ring-offset-gray-900 hover:bg-green-500/20",
        !miner && selectedMiner && "ring-2 ring-yellow-500 ring-offset-2 ring-offset-gray-900 hover:bg-yellow-500/20",
        !miner && !selectedMiner && "bg-gray-800/30"
      )}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      {miner && (
        <>
          <div className="w-full h-full flex items-center justify-center text-center">
            <div>
              <div className={`text-sm font-bold ${
                miner.type === 'EMSX' ? 'text-blue-400' :
                miner.type === 'USDT' ? 'text-green-400' :
                'text-yellow-400'
              }`}>
                {miner.type}
              </div>
              <div className="text-xs text-gray-400">Lvl {miner.level}</div>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FaTrash size={12} />
          </button>
        </>
      )}
    </motion.div>
  );
}

export function GameGrid() {
  const { miners, unlockedCells } = useGameStore();
  
  return (
    <>
      <div className="grid grid-cols-5 gap-2 p-3 glass-card rounded-xl">
        {Array.from({ length: 20 }, (_, i) => (
          <MinerCell
            key={i}
            position={i + 1}
            miner={miners.find(m => m.position === i + 1)}
            isLocked={i + 1 > unlockedCells}
          />
        ))}
      </div>
      <Tooltip id="cell-tooltip" />
    </>
  );
}