import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaGamepad, FaChartBar, FaCog, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const navItems = [
  { to: '/', icon: FaHome, label: 'Home' },
  { to: '/game', icon: FaGamepad, label: 'Game' },
  { to: '/stats', icon: FaChartBar, label: 'Stats' },
  { to: '/referral', icon: FaUsers, label: 'Refer' },
  { to: '/settings', icon: FaCog, label: 'Settings' }
];

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card rounded-t-xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-0.5 text-sm transition-colors duration-200',
                  isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={20} />
                  </motion.div>
                  <span className="text-[10px]">{label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute -top-1 w-1 h-1 bg-blue-400 rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}