import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { MinerGame } from './components/MinerGame';
import { StatsPage } from './pages/StatsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ReferralPage } from './pages/ReferralPage';
import { Navigation } from './components/Navigation';
import { useGameStore } from './store/gameStore';
import { AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        initData: string;
        initDataUnsafe: {
          user?: {
            username?: string;
            first_name?: string;
            last_name?: string;
          };
        };
        openTelegramLink: (url: string) => void;
        showPopup: (params: {
          title?: string;
          message: string;
          buttons?: Array<{
            type: 'ok' | 'close' | 'cancel' | 'default';
            text?: string;
            onClick?: () => void;
          }>;
        }) => void;
        switchInlineQuery: (query: string, types?: Array<'users' | 'groups' | 'channels'>) => void;
      };
    };
  }
}

export default function App() {
  const { setUsername, calculateOfflineProgress } = useGameStore();
  const location = useLocation();

  useEffect(() => {
    window.Telegram.WebApp.ready();
    
    const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
    if (telegramUser) {
      const displayName = telegramUser.username || 
        [telegramUser.first_name, telegramUser.last_name]
          .filter(Boolean)
          .join(' ') || 
        'Miner';
      
      setUsername(displayName);
    }

    calculateOfflineProgress();
  }, [setUsername, calculateOfflineProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-dark to-game-darker text-white overflow-x-hidden pb-16">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/game" element={<MinerGame />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/referral" element={<ReferralPage />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Navigation />
    </div>
  );
}