'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Star, Home, MapPin, Filter, ChevronDown, Wifi, Droplets, Utensils, Car, Flame, TreePine } from 'lucide-react';
import { StayListing, BudgetTier } from '@/types/location';
import { STAYS_DATA } from '@/data/mockData';
import { LocationNode } from '@/types/location';

interface Props {
  stops: LocationNode[];
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'Wifi': <Wifi className="w-3 h-3" />,
  'Hot Water': <Droplets className="w-3 h-3" />,
  'Restaurant': <Utensils className="w-3 h-3" />,
  'Parking': <Car className="w-3 h-3" />,
  'Bonfire': <Flame className="w-3 h-3" />,
  'Mountain view': <TreePine className="w-3 h-3" />,
};

const TYPE_COLORS: Record<string, string> = {
  'Homestay': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  'Budget Hotel': 'bg-sky-500/15 text-sky-300 border-sky-500/25',
  'Mid-Range Hotel': 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  'Resort': 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  'Guest House': 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  'GMVN / KMVN': 'bg-teal-500/15 text-teal-300 border-teal-500/25',
};

const BUDGET_FILTER_COLORS: Record<BudgetTier | 'All', string> = {
  All: 'bg-slate-800 text-slate-100 border-slate-600',
  Budget: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  Moderate: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  Luxury: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
      />
    ))}
    <span className="text-[11px] text-slate-400 ml-1 font-bold">{rating.toFixed(1)}</span>
  </div>
);

const StayCard: React.FC<{ stay: StayListing; delay: number }> = ({ stay, delay }) => {
  const [showAlt, setShowAlt] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-panel rounded-2xl border border-slate-800 hover:border-slate-700 p-4 space-y-3 group transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${TYPE_COLORS[stay.type] || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
              {stay.type}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${BUDGET_FILTER_COLORS[stay.budgetTier]}`}>
              {stay.budgetTier}
            </span>
          </div>
          <h4 className="text-sm font-black text-slate-100">{stay.name}</h4>
          <StarRating rating={stay.rating} />
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-black text-emerald-400">₹{stay.pricePerNight.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-slate-500">/night</p>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start gap-1.5 text-[11px] text-slate-500">
        <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5 text-slate-600" />
        {stay.address}
      </div>

      {/* Amenities */}
      <div className="flex flex-wrap gap-1.5">
        {stay.amenities.slice(0, 5).map((am, i) => (
          <span key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
            {AMENITY_ICONS[am] ?? <Home className="w-3 h-3" />}
            {am}
          </span>
        ))}
        {stay.amenities.length > 5 && (
          <span className="px-2 py-0.5 rounded-lg bg-slate-800 text-[10px] text-slate-500 border border-slate-700">
            +{stay.amenities.length - 5} more
          </span>
        )}
      </div>

      {/* Phone */}
      <div className="flex items-center gap-3 pt-1">
        <a
          href={`tel:${stay.phone.replace(/[^+\d]/g, '')}`}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/25 hover:border-emerald-500/50 transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          {stay.phone}
        </a>
        {stay.altPhone && (
          <a
            href={`tel:${stay.altPhone.replace(/[^+\d]/g, '')}`}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-all"
          >
            <Phone className="w-3 h-3" />
            Alt
          </a>
        )}
      </div>
    </motion.div>
  );
};

export const StaysDirectory: React.FC<Props> = ({ stops }) => {
  const [budgetFilter, setBudgetFilter] = useState<BudgetTier | 'All'>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');

  const locationOptions = useMemo(() => ['All', ...stops.map(s => s.id)], [stops]);

  const filteredStays = useMemo(() => {
    return STAYS_DATA.filter(s => {
      const matchesLocation = locationFilter === 'All' || s.locationId === locationFilter;
      const matchesBudget = budgetFilter === 'All' || s.budgetTier === budgetFilter;
      // Only show stays relevant to trip stops
      const isInTrip = stops.some(stop => stop.id === s.locationId);
      return isInTrip && matchesLocation && matchesBudget;
    }).sort((a, b) => a.pricePerNight - b.pricePerNight);
  }, [stops, locationFilter, budgetFilter]);

  const stopName = (id: string) => stops.find(s => s.id === id)?.name ?? id;

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-4 space-y-4">
        {/* Budget filter */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter by Budget</p>
          <div className="flex gap-2">
            {(['All', 'Budget', 'Moderate', 'Luxury'] as const).map(tier => (
              <button key={tier} onClick={() => setBudgetFilter(tier)}
                className={`px-4 py-1.5 rounded-xl text-xs font-black border transition-all ${
                  budgetFilter === tier ? BUDGET_FILTER_COLORS[tier] : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                }`}>{tier}</button>
            ))}
          </div>
        </div>

        {/* Location filter */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter by Destination</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setLocationFilter('All')}
              className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                locationFilter === 'All' ? 'bg-slate-700 text-slate-100 border-slate-600' : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
              }`}>All Stops</button>
            {stops.map(stop => (
              <button key={stop.id} onClick={() => setLocationFilter(stop.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                  locationFilter === stop.id ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                }`}>{stop.name.split(' ')[0]}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-slate-400 font-bold">
        Showing <span className="text-emerald-400 font-black">{filteredStays.length}</span> stays across your trip destinations
      </p>

      {/* Grouped by location */}
      {stops.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Home className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-bold">Generate your trip plan first to see stay options</p>
        </div>
      ) : filteredStays.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <p className="font-bold">No stays match your current filters.</p>
          <button onClick={() => { setBudgetFilter('All'); setLocationFilter('All'); }}
            className="mt-2 text-xs text-emerald-400 font-bold hover:text-emerald-300">Reset filters</button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={`${budgetFilter}-${locationFilter}`} className="space-y-6">
            {stops
              .filter(stop => (locationFilter === 'All' || locationFilter === stop.id))
              .map(stop => {
                const stopsForLocation = filteredStays.filter(s => s.locationId === stop.id);
                if (stopsForLocation.length === 0) return null;
                return (
                  <div key={stop.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-slate-800" />
                      <span className="text-xs font-black text-slate-400 uppercase tracking-wider px-2 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        {stop.name}
                      </span>
                      <div className="h-px flex-1 bg-slate-800" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {stopsForLocation.map((stay, i) => (
                        <StayCard key={stay.id} stay={stay} delay={i * 0.07} />
                      ))}
                    </div>
                  </div>
                );
              })}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
