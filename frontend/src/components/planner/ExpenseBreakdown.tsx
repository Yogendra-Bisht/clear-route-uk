'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import { Car, Utensils, Home, Ticket, Package, IndianRupee, TrendingUp } from 'lucide-react';
import { TripPlan } from '@/types/location';

interface Props {
  plan: TripPlan;
  totalPeople: number;
}

const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const AnimatedNumber: React.FC<{ value: number; prefix?: string }> = ({ value, prefix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => {
        node.textContent = prefix + new Intl.NumberFormat('en-IN').format(Math.round(v));
      },
    });
    return controls.stop;
  }, [value, prefix]);
  return <span ref={ref}>{prefix}0</span>;
};

const BREAKDOWN_ITEMS = [
  { key: 'transport' as const, label: 'Transport', icon: Car, color: 'from-cyan-500 to-teal-500', bg: 'bg-cyan-500/10 border-cyan-500/20', text: 'text-cyan-300' },
  { key: 'accommodation' as const, label: 'Accommodation', icon: Home, color: 'from-purple-500 to-violet-500', bg: 'bg-purple-500/10 border-purple-500/20', text: 'text-purple-300' },
  { key: 'food' as const, label: 'Food & Meals', icon: Utensils, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-300' },
  { key: 'entryFees' as const, label: 'Entry & Permits', icon: Ticket, color: 'from-rose-500 to-pink-500', bg: 'bg-rose-500/10 border-rose-500/20', text: 'text-rose-300' },
  { key: 'miscellaneous' as const, label: 'Miscellaneous (8%)', icon: Package, color: 'from-slate-400 to-slate-500', bg: 'bg-slate-700/40 border-slate-600/20', text: 'text-slate-300' },
];

export const ExpenseBreakdown: React.FC<Props> = ({ plan, totalPeople }) => {
  const { estimatedCosts } = plan;
  const total = estimatedCosts.total;
  const perPerson = Math.round(total / Math.max(totalPeople, 1));

  const getPercent = (val: number) => total > 0 ? (val / total) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Total Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-950 border border-emerald-500/20 text-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 to-transparent pointer-events-none" />
        <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Estimated Total Cost</p>
        <div className="text-4xl font-black text-white flex items-center justify-center gap-2">
          <IndianRupee className="w-8 h-8 text-emerald-400" />
          <AnimatedNumber value={total} />
        </div>
        <p className="text-sm text-slate-400 mt-2">
          <span className="font-black text-emerald-300">
            <AnimatedNumber value={perPerson} prefix="₹" />
          </span>
          {' '}per person · {plan.totalDays} days
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-slate-500">
          <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
          Estimates include 8% buffer for local purchases & tips
        </div>
      </motion.div>

      {/* Stacked bar */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cost Distribution</p>
        <div className="h-3 rounded-full overflow-hidden flex">
          {BREAKDOWN_ITEMS.map((item, i) => {
            const pct = getPercent(estimatedCosts[item.key]);
            return pct > 0 ? (
              <motion.div
                key={item.key}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: 'easeOut' }}
                className={`h-full bg-gradient-to-r ${item.color}`}
                title={`${item.label}: ${pct.toFixed(1)}%`}
              />
            ) : null;
          })}
        </div>
      </div>

      {/* Individual line items */}
      <div className="space-y-3">
        {BREAKDOWN_ITEMS.map((item, i) => {
          const Icon = item.icon;
          const value = estimatedCosts[item.key];
          const pct = getPercent(value);
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className={`flex items-center gap-4 p-4 rounded-xl border ${item.bg}`}
            >
              <div className={`p-2 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-20 flex-shrink-0`}>
                <Icon className="w-4 h-4 text-slate-950" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-bold ${item.text}`}>{item.label}</span>
                  <span className="text-sm font-black text-slate-100">
                    <AnimatedNumber value={value} prefix="₹" />
                  </span>
                </div>
                {/* mini progress */}
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.7, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
              </div>
              <span className="text-[11px] text-slate-500 font-bold flex-shrink-0">{pct.toFixed(1)}%</span>
            </motion.div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-[11px] text-slate-500 text-center">
        💡 All costs are approximate. Actual expenses may vary based on season, local conditions & personal preferences.
      </div>
    </div>
  );
};
