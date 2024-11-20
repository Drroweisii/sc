import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type MinerType = 'EMSX' | 'USDT' | 'BTC';

export interface Task {
  id: string;
  title: string;
  description: string;
  requirement: number;
  type: 'totalMiners' | 'minerLevel' | 'totalBalance' | 'watchAds';
  minerType?: MinerType;
  reward: {
    type: MinerType;
    level: number;
  };
  completed: boolean;
  progress?: number;
  maxProgress?: number;
  lastWatchTime?: number;
}

export interface Miner {
  id: string;
  type: MinerType;
  level: number;
  position: number | null;
}

interface GameState {
  username: string;
  balances: Record<MinerType, number>;
  rates: Record<MinerType, number>;
  miners: Miner[];
  selectedMiner: string | null;
  lastUpdate: number;
  referralCount: number;
  unlockedCells: number;
  tasks: Task[];
  setUsername: (username: string) => void;
  addMiner: (type: MinerType) => void;
  selectMiner: (id: string | null) => void;
  mergeMiner: (fromId: string, toId: string) => void;
  removeMiner: (id: string) => void;
  placeMiner: (id: string, position: number) => void;
  updateBalances: () => void;
  calculateOfflineProgress: () => void;
  setReferralCount: (count: number) => void;
  checkTaskCompletion: () => void;
  claimTaskReward: (taskId: string) => void;
  watchAd: () => void;
}

const INITIAL_BALANCES = {
  EMSX: 10,
  USDT: 0,
  BTC: 0,
};

const MINING_RATES = {
  EMSX: 0.1,
  USDT: 0.01,
  BTC: 0.001,
};

const MINER_COSTS = {
  EMSX: 10,
  USDT: 100,
  BTC: 1000,
};

const INITIAL_TASKS: Task[] = [
  {
    id: 'task1',
    title: 'Beginner Miner',
    description: 'Own 3 EMSX miners of any level',
    requirement: 3,
    type: 'totalMiners',
    minerType: 'EMSX',
    reward: { type: 'EMSX', level: 2 },
    completed: false
  },
  {
    id: 'task2',
    title: 'USDT Collector',
    description: 'Reach 100 USDT balance',
    requirement: 100,
    type: 'totalBalance',
    minerType: 'USDT',
    reward: { type: 'USDT', level: 1 },
    completed: false
  },
  {
    id: 'task3',
    title: 'Master Merger',
    description: 'Create a level 3 miner of any type',
    requirement: 3,
    type: 'minerLevel',
    reward: { type: 'BTC', level: 1 },
    completed: false
  },
  {
    id: 'task4',
    title: 'Watch & Earn',
    description: 'Watch ads to earn USDT miners (10 times per day)',
    requirement: 10,
    type: 'watchAds',
    reward: { type: 'USDT', level: 1 },
    completed: false,
    progress: 0,
    maxProgress: 10,
    lastWatchTime: 0
  }
];

const INITIAL_UNLOCKED_CELLS = 5;

const calculateUnlockedCells = (referralCount: number): number => {
  let cells = INITIAL_UNLOCKED_CELLS;
  if (referralCount >= 1) cells += 3;
  if (referralCount >= 3) cells += 3;
  if (referralCount >= 5) cells += 3;
  if (referralCount >= 10) cells += 3;
  if (referralCount >= 15) cells += 3;
  return Math.min(cells, 20);
};

const findEmptyPosition = (miners: Miner[], unlockedCells: number): number | null => {
  const occupiedPositions = new Set(miners.filter(m => m.position !== null).map(m => m.position));
  for (let i = 1; i <= unlockedCells; i++) {
    if (!occupiedPositions.has(i)) {
      return i;
    }
  }
  return null;
};

const isNewDay = (lastTime: number): boolean => {
  const now = Date.now();
  const lastDate = new Date(lastTime);
  const currentDate = new Date(now);
  return lastDate.getDate() !== currentDate.getDate() ||
         lastDate.getMonth() !== currentDate.getMonth() ||
         lastDate.getFullYear() !== currentDate.getFullYear();
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      username: '',
      balances: INITIAL_BALANCES,
      rates: { EMSX: 0, USDT: 0, BTC: 0 },
      miners: [],
      selectedMiner: null,
      lastUpdate: Date.now(),
      referralCount: 0,
      unlockedCells: INITIAL_UNLOCKED_CELLS,
      tasks: INITIAL_TASKS,

      setUsername: (username) => set({ username }),

      setReferralCount: (count) => set((state) => ({
        referralCount: count,
        unlockedCells: calculateUnlockedCells(count)
      })),

      watchAd: () => {
        const state = get();
        const watchTask = state.tasks.find(t => t.id === 'task4');
        
        if (!watchTask || watchTask.completed) return;

        const now = Date.now();
        if (isNewDay(watchTask.lastWatchTime || 0)) {
          // Reset progress for new day
          watchTask.progress = 0;
        }

        if ((watchTask.progress || 0) < (watchTask.maxProgress || 10)) {
          const updatedTasks = state.tasks.map(task =>
            task.id === 'task4'
              ? {
                  ...task,
                  progress: (task.progress || 0) + 1,
                  lastWatchTime: now,
                  completed: (task.progress || 0) + 1 >= (task.maxProgress || 10)
                }
              : task
          );

          set({ tasks: updatedTasks });

          // Add a USDT miner as reward
          const emptyPosition = findEmptyPosition(state.miners, state.unlockedCells);
          const newMiner: Miner = {
            id: crypto.randomUUID(),
            type: 'USDT',
            level: 1,
            position: emptyPosition,
          };

          set(state => ({
            miners: [...state.miners, newMiner]
          }));
        }
      },

      addMiner: (type) => {
        const { miners, balances, unlockedCells } = get();
        const cost = MINER_COSTS[type];
        
        if (balances[type] < cost) {
          return;
        }

        const emptyPosition = findEmptyPosition(miners, unlockedCells);
        const newMiner: Miner = {
          id: crypto.randomUUID(),
          type,
          level: 1,
          position: emptyPosition,
        };

        set((state) => ({
          miners: [...state.miners, newMiner],
          balances: {
            ...state.balances,
            [type]: state.balances[type] - cost,
          },
        }));

        get().checkTaskCompletion();
      },

      selectMiner: (id) => set({ selectedMiner: id }),

      mergeMiner: (fromId, toId) => {
        const { miners } = get();
        const fromMiner = miners.find((m) => m.id === fromId);
        const toMiner = miners.find((m) => m.id === toId);

        if (!fromMiner || !toMiner || fromMiner.type !== toMiner.type || fromMiner.level !== toMiner.level) {
          return;
        }

        const updatedMiners = miners
          .filter((m) => m.id !== fromId && m.id !== toId)
          .concat({
            id: crypto.randomUUID(),
            type: fromMiner.type,
            level: fromMiner.level + 1,
            position: toMiner.position,
          });

        set({ miners: updatedMiners, selectedMiner: null });
        get().checkTaskCompletion();
      },

      removeMiner: (id) => {
        set((state) => ({
          miners: state.miners.map(miner => 
            miner.id === id ? { ...miner, position: null } : miner
          ),
          selectedMiner: null,
        }));
      },

      placeMiner: (id, position) => {
        const { miners, unlockedCells } = get();
        if (position > unlockedCells || miners.some(m => m.position === position)) {
          return;
        }

        set((state) => ({
          miners: state.miners.map(miner =>
            miner.id === id ? { ...miner, position } : miner
          ),
          selectedMiner: null,
        }));
      },

      checkTaskCompletion: () => {
        const { miners, balances, tasks } = get();
        
        const updatedTasks = tasks.map(task => {
          if (task.completed) return task;

          let completed = false;
          switch (task.type) {
            case 'totalMiners':
              const minerCount = miners.filter(m => 
                (!task.minerType || m.type === task.minerType)
              ).length;
              completed = minerCount >= task.requirement;
              break;

            case 'totalBalance':
              if (task.minerType) {
                completed = balances[task.minerType] >= task.requirement;
              }
              break;

            case 'minerLevel':
              completed = miners.some(m => m.level >= task.requirement);
              break;

            case 'watchAds':
              completed = (task.progress || 0) >= (task.maxProgress || 10);
              break;
          }

          return completed ? { ...task, completed } : task;
        });

        set({ tasks: updatedTasks });
      },

      claimTaskReward: (taskId: string) => {
        const { tasks, miners, unlockedCells } = get();
        const task = tasks.find(t => t.id === taskId);
        
        if (!task || !task.completed) return;

        const emptyPosition = findEmptyPosition(miners, unlockedCells);
        const rewardMiner: Miner = {
          id: crypto.randomUUID(),
          type: task.reward.type,
          level: task.reward.level,
          position: emptyPosition,
        };

        set((state) => ({
          miners: [...state.miners, rewardMiner],
          tasks: state.tasks.filter(t => t.id !== taskId),
        }));
      },

      calculateOfflineProgress: () => {
        const { lastUpdate, miners } = get();
        const now = Date.now();
        const timeDiff = Math.max(0, (now - lastUpdate) / 1000);

        const rates = { EMSX: 0, USDT: 0, BTC: 0 };
        miners.forEach((miner) => {
          if (miner.position !== null) {
            rates[miner.type] += MINING_RATES[miner.type] * Math.pow(2, miner.level - 1);
          }
        });

        set((state) => ({
          balances: Object.entries(rates).reduce((acc, [type, rate]) => ({
            ...acc,
            [type]: state.balances[type as MinerType] + rate * timeDiff
          }), { ...state.balances }),
          rates,
          lastUpdate: now,
        }));

        get().checkTaskCompletion();
      },

      updateBalances: () => {
        const { miners } = get();
        const now = Date.now();

        const newRates = { EMSX: 0, USDT: 0, BTC: 0 };
        miners.forEach((miner) => {
          if (miner.position !== null) {
            newRates[miner.type] += MINING_RATES[miner.type] * Math.pow(2, miner.level - 1);
          }
        });

        set((state) => {
          const timeDiff = Math.max(0, (now - state.lastUpdate) / 1000);
          const newBalances = { ...state.balances };
          
          Object.entries(newRates).forEach(([type, rate]) => {
            newBalances[type as MinerType] += rate * timeDiff;
          });

          return {
            balances: newBalances,
            rates: newRates,
            lastUpdate: now,
          };
        });

        get().checkTaskCompletion();
      },
    }),
    {
      name: 'mining-game-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage)
    }
  )
);