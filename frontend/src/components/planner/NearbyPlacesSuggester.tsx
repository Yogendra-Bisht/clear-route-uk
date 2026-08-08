'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sliders, Clock, Sun, Moon, Sunset, Mountain, Filter, ChevronRight } from 'lucide-react';
import { LocationNode, LocationCoordinates } from '@/types/location';

interface Props {
  locations: LocationNode[];
  baseLocation: LocationNode | null;
  onLocateOnMap: (loc: LocationNode) => void;
}

const haversineKm = (a: LocationCoordinates, b: LocationCoordinates): number => {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', icon: Sun, desc: '6 AM – 12 PM', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  { id: 'afternoon', label: 'Afternoon', icon: Sunset, desc: '12 PM – 5 PM', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  { id: 'evening', label: 'Evening', icon: Moon, desc: '5 PM – 9 PM', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
] as const;

type TimeSlot = 'morning' | 'afternoon' | 'evening';

const STATUS_COLORS: Record<string, string> = {
  Clear: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
  Moderate: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
  Heavy: 'bg-orange-500/10 text-orange-300 border-orange-500/25',
  Choked: 'bg-red-500/10 text-red-300 border-red-500/25',
};

const getTiming = (loc: LocationNode, slot: TimeSlot): { recommend: boolean; tip: string } => {
  const peak = loc.historicalPeakHour?.toLowerCase() ?? '';
  if (slot === 'morning') {
    const avoidMorning = peak.includes('06') || peak.includes('07') || peak.includes('08');
    return avoidMorning
      ? { recommend: false, tip: 'Peak hours in morning — arrive very early or after noon' }
      : { recommend: true, tip: 'Great time! Lower crowd density expected.' };
  }
  if (slot === 'afternoon') {
    return { recommend: true, tip: 'Usually moderate crowds. Good for sightseeing.' };
  }
  return { recommend: loc.crowdStatus !== 'Choked', tip: loc.crowdStatus === 'Choked' ? 'Very crowded in evenings' : 'Peaceful evening visit recommended.' };
};

export const NearbyPlacesSuggester: React.FC<Props> = ({ locations, baseLocation, onLocateOnMap }) => {
  const [radiusKm, setRadiusKm] = useState(100);
  const [timeSlot, setTimeSlot] = useState<TimeSlot>('morning');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(locations.map(l => l.category)))], [locations]);

  const nearbyPlaces = useMemo(() => {
    if (!baseLocation) return [];
    return locations
      .filter(loc => loc.id !== baseLocation.id)
      .map(loc => ({
        loc,
        km: haversineKm(baseLocation.coordinates, loc.coordinates),
      }))
      .filter(({ km }) => km <= radiusKm)
      .filter(({ loc }) => categoryFilter === 'All' || loc.category === categoryFilter)
      .sort((a, b) => a.km - b.km);
  }, [baseLocation, locations, radiusKm, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-5 space-y-5">
        {/* Base location */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Base Location</p>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-sm text-emerald-300 font-bold">
            <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            {baseLocation?.name ?? 'Select a destination from your itinerary'}
          </div>
        </div>

        {/* Radius slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Search Radius
            </p>
            <span className="text-sm font-black text-cyan-300">{radiusKm} km</span>
          </div>
          <input
            type="range" min={10} max={300} step={10}
            value={radiusKm}
            onChange={e => setRadiusKm(Number(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>10 km</span><span>150 km</span><span>300 km</span>
          </div>
        </div>

        {/* Time of day */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Visiting Time
          </p>
          <div className="flex gap-2">
            {TIME_SLOTS.map(ts => {
              const Icon = ts.icon;
              return (
                <button
                  key={ts.id}
                  onClick={() => setTimeSlot(ts.id)}
                  className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    timeSlot === ts.id ? `${ts.bg} ${ts.color}` : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{ts.label}</span>
                  <span className="text-[9px] opacity-60">{ts.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category filter */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-purple-400" /> Category
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                  categoryFilter === cat
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {!baseLocation ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 text-slate-500">
            <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-bold">Generate a trip plan first to see nearby suggestions</p>
          </motion.div>
        ) : nearbyPlaces.length === 0 ? (
          <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 text-slate-500">
            <p className="font-bold">No places found within {radiusKm} km of {baseLocation.name}</p>
            <p className="text-xs mt-1">Try increasing the radius or changing the category filter.</p>
          </motion.div>
        ) : (
          <motion.div key="results" className="space-y-3">
            <p className="text-xs text-slate-400 font-bold">
              <span className="text-emerald-400 font-black">{nearbyPlaces.length}</span> places found within {radiusKm} km
            </p>
            {nearbyPlaces.map(({ loc, km }, i) => {
              const timing = getTiming(loc, timeSlot);
              return (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-panel rounded-2xl border border-slate-800 hover:border-emerald-500/25 p-4 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={loc.imageUrl} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-black text-slate-100 leading-tight">{loc.name}</p>
                          <p className="text-[11px] text-slate-500">{loc.district}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs font-black text-cyan-300">{km.toFixed(0)} km</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${STATUS_COLORS[loc.crowdStatus]}`}>
                            {loc.crowdStatus}
                          </span>
                        </div>
                      </div>

                      {/* Timing recommendation */}
                      <div className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                        timing.recommend
                          ? 'bg-emerald-500/8 text-emerald-300 border-emerald-500/15'
                          : 'bg-amber-500/8 text-amber-300 border-amber-500/15'
                      }`}>
                        {timing.recommend ? '✅' : '⚠️'} {timing.tip}
                      </div>

                      <button
                        onClick={() => onLocateOnMap(loc)}
                        className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
                      >
                        <MapPin className="w-3 h-3" /> See on Map
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
