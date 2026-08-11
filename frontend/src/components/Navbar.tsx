'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Navigation, Signal, ShieldAlert, Calendar, Grid, BookOpen,
  Route, Menu, X, Sparkles, Radio, History
} from 'lucide-react';

export type MainTabType = 'map' | 'places' | 'timeline' | 'uttarakhand' | 'music' | 'disaster' | 'planner';

interface NavbarProps {
  activeTab: MainTabType;
  setActiveTab: (tab: MainTabType) => void;
  isConnected: boolean;
  chokedCount: number;
}

const tabs: { id: MainTabType; label: string; icon: React.ComponentType<any>; color: string }[] = [
  { id: 'map',          label: 'Live Map',         icon: MapPin,       color: 'from-emerald-400 to-teal-500' },
  { id: 'places',       label: 'Explore',          icon: Grid,         color: 'from-cyan-400 to-sky-500' },
  { id: 'timeline',     label: '7-Day Forecast',   icon: Calendar,     color: 'from-amber-400 to-orange-500' },
  { id: 'uttarakhand',  label: 'Discover UK',      icon: BookOpen,     color: 'from-purple-400 to-violet-500' },
  { id: 'music',        label: 'Pahadi Music',     icon: Radio,        color: 'from-amber-400 to-yellow-500' },
  { id: 'disaster',     label: 'Disaster Hub',     icon: ShieldAlert,  color: 'from-red-400 to-rose-500' },
  { id: 'planner',      label: 'Plan My Trip',     icon: Route,        color: 'from-pink-400 to-rose-500' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const tabVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 28 } },
};

const statusVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isConnected, chokedCount }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.1 }}
      className="sticky top-0 z-40 border-b border-slate-800/80 px-4 lg:px-8 py-0 shadow-2xl backdrop-blur-xl bg-slate-950/85"
      style={{ background: 'linear-gradient(to bottom, rgba(7,10,17,0.92) 0%, rgba(7,10,17,0.80) 100%)' }}
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 h-[60px]">
        {/* ── Brand ── */}
        <motion.div
          className="flex items-center gap-3 flex-shrink-0 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          onClick={() => setActiveTab('map')}
        >
          <motion.div
            className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 shadow-lg shadow-emerald-500/25 text-slate-950"
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation className="w-5 h-5" />
          </motion.div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-slate-100">
                ClearRoute <span className="text-emerald-400">UK</span>
              </h1>
              <motion.span
                className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-extrabold uppercase tracking-wider"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                Live
              </motion.span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">
              Garhwal & Kumaon Telemetry Platform
            </p>
          </div>
        </motion.div>

        {/* ── Desktop Nav ── */}
        <motion.nav
          className="hidden md:flex items-center bg-slate-900/80 p-1 rounded-2xl border border-slate-800 relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                variants={tabVariants}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: isActive ? 1 : 1.05 }}
                whileTap={{ scale: 0.93 }}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold transition-colors z-10 ${
                  isActive ? 'text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'
                } ${tab.id === 'planner' && !isActive ? 'text-pink-400 hover:text-pink-300' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl shadow-md`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.id === 'planner' && !isActive && (
                    <motion.span
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                      className="w-1.5 h-1.5 rounded-full bg-pink-400 inline-block"
                    />
                  )}
                </span>
              </motion.button>
            );
          })}
        </motion.nav>

        {/* ── Right: Status + Mobile Toggle ── */}
        <motion.div
          className="flex items-center gap-2"
          variants={statusVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {chokedCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-bold"
              >
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                  <ShieldAlert className="w-3.5 h-3.5" />
                </motion.div>
                <span>{chokedCount} Choked</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-semibold text-slate-300">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Signal className={`w-3.5 h-3.5 ${isConnected ? 'text-emerald-400' : 'text-amber-400'}`} />
            </motion.div>
            <span className="hidden sm:inline">{isConnected ? 'Live Feed' : 'Verified'}</span>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(prev => !prev)}
          >
            <AnimatePresence mode="wait">
              {mobileOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-4 h-4" /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-4 h-4" /></motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      {/* ── Mobile Dropdown Nav ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-slate-800/80"
          >
            <div className="py-3 space-y-1">
              {tabs.map((tab, i) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => { setActiveTab(tab.id); setMobileOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                      isActive
                        ? `bg-gradient-to-r ${tab.color} text-slate-950`
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {tab.id === 'planner' && !isActive && (
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 text-[10px] font-black border border-pink-500/30">NEW</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
