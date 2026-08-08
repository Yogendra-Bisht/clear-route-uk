'use client';

import React from 'react';
import { motion, Easing } from 'framer-motion';
import {
  MapPin, Users, Wallet, Calendar, Compass, ChevronDown, Sparkles
} from 'lucide-react';
import { BudgetTier, LocationCategory } from '@/types/location';

export interface TripFormState {
  originCity: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  budgetTier: BudgetTier;
  categories: LocationCategory[];
  division: 'Garhwal' | 'Kumaon' | 'Both';
  vehicleType: 'Car' | 'Bus' | 'Taxi';
}

const ORIGIN_CITIES = ['Delhi', 'Dehradun', 'Haridwar', 'Rishikesh'];
const CATEGORIES: LocationCategory[] = [
  'Char Dham', 'Treks & Adventure', 'Wildlife & Parks', 'Hill Station', 'Heritage & Architecture', 'Pilgrimage'
];

interface Props {
  form: TripFormState;
  onChange: (f: TripFormState) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.07, duration: 0.4, ease },
});

export const TripBuilderForm: React.FC<Props> = ({ form, onChange, onGenerate, isGenerating }) => {
  const set = <K extends keyof TripFormState>(key: K, value: TripFormState[K]) =>
    onChange({ ...form, [key]: value });

  const toggleCategory = (cat: LocationCategory) => {
    const exists = form.categories.includes(cat);
    set('categories', exists ? form.categories.filter(c => c !== cat) : [...form.categories, cat]);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {/* Origin City */}
        <motion.div {...fadeUp(0)} className="glass-field space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Starting City
          </label>
          <div className="relative">
            <select
              value={form.originCity}
              onChange={e => set('originCity', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none appearance-none cursor-pointer transition-colors"
            >
              {ORIGIN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </motion.div>

        {/* Start Date */}
        <motion.div {...fadeUp(1)} className="glass-field space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Start Date
          </label>
          <input
            type="date"
            min={today}
            value={form.startDate}
            onChange={e => set('startDate', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none transition-colors [color-scheme:dark]"
          />
        </motion.div>

        {/* End Date */}
        <motion.div {...fadeUp(2)} className="glass-field space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-purple-400" /> End Date
          </label>
          <input
            type="date"
            min={form.startDate || today}
            value={form.endDate}
            onChange={e => set('endDate', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none transition-colors [color-scheme:dark]"
          />
        </motion.div>

        {/* Group Size */}
        <motion.div {...fadeUp(3)} className="glass-field space-y-3">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-amber-400" /> Group Size
          </label>
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-1">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Adults</p>
              <div className="flex items-center gap-2">
                <button onClick={() => set('adults', Math.max(1, form.adults - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-lg flex items-center justify-center transition-colors">−</button>
                <span className="w-8 text-center font-black text-slate-100">{form.adults}</span>
                <button onClick={() => set('adults', form.adults + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-lg flex items-center justify-center transition-colors">+</button>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Children</p>
              <div className="flex items-center gap-2">
                <button onClick={() => set('children', Math.max(0, form.children - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-lg flex items-center justify-center transition-colors">−</button>
                <span className="w-8 text-center font-black text-slate-100">{form.children}</span>
                <button onClick={() => set('children', form.children + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-lg flex items-center justify-center transition-colors">+</button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Budget Tier */}
        <motion.div {...fadeUp(4)} className="glass-field space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Wallet className="w-3.5 h-3.5 text-emerald-400" /> Budget Tier
          </label>
          <div className="flex gap-2">
            {(['Budget', 'Moderate', 'Luxury'] as BudgetTier[]).map(tier => (
              <button
                key={tier}
                onClick={() => set('budgetTier', tier)}
                className={`flex-1 py-2 rounded-xl text-xs font-black border transition-all ${
                  form.budgetTier === tier
                    ? tier === 'Budget' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                    : tier === 'Moderate' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                }`}
              >{tier}</button>
            ))}
          </div>
          <p className="text-[10px] text-slate-500">
            {form.budgetTier === 'Budget' ? '~₹400/person/day food • ~₹1,000/night stay'
              : form.budgetTier === 'Moderate' ? '~₹900/person/day food • ~₹3,500/night stay'
              : '~₹1,800/person/day food • ~₹8,000/night stay'}
          </p>
        </motion.div>

        {/* Vehicle Type */}
        <motion.div {...fadeUp(5)} className="glass-field space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-teal-400" /> Vehicle Type
          </label>
          <div className="flex gap-2">
            {(['Car', 'Bus', 'Taxi'] as const).map(v => (
              <button
                key={v}
                onClick={() => set('vehicleType', v)}
                className={`flex-1 py-2 rounded-xl text-xs font-black border transition-all ${
                  form.vehicleType === v
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/50'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                }`}
              >{v}</button>
            ))}
          </div>
          <p className="text-[10px] text-slate-500">
            {form.vehicleType === 'Car' ? '₹12/km — comfortable, flexible stops'
              : form.vehicleType === 'Bus' ? '₹2.5/km — economical state bus routes'
              : '₹18/km — convenient taxi with driver'}
          </p>
        </motion.div>
      </div>

      {/* Division Selector */}
      <motion.div {...fadeUp(6)} className="glass-field space-y-3">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred Division</label>
        <div className="flex gap-3">
          {(['Garhwal', 'Kumaon', 'Both'] as const).map(div => (
            <button
              key={div}
              onClick={() => set('division', div)}
              className={`px-5 py-2 rounded-xl text-xs font-black border transition-all ${
                form.division === div
                  ? div === 'Garhwal' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : div === 'Kumaon' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-700 text-slate-100 border-slate-600'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
              }`}
            >{div}</button>
          ))}
        </div>
      </motion.div>

      {/* Category Picker */}
      <motion.div {...fadeUp(7)} className="glass-field space-y-3">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Preferred Categories <span className="text-slate-600 normal-case">(pick any)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => {
            const isActive = form.categories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-emerald-700 hover:text-slate-200'
                }`}
              >{cat}</button>
            );
          })}
        </div>
      </motion.div>

      {/* Generate Button */}
      <motion.div {...fadeUp(8)}>
        <motion.button
          onClick={onGenerate}
          disabled={!form.startDate || !form.endDate || isGenerating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
        >
          {isGenerating ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full" />
              Building Your Trip Plan…
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate My Trip Plan
            </>
          )}
        </motion.button>
        {(!form.startDate || !form.endDate) && (
          <p className="text-xs text-slate-500 text-center mt-2">Please select start and end dates to continue.</p>
        )}
      </motion.div>
    </div>
  );
};
