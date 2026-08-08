'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Clock, MapPin, Users, ChevronRight, Footprints, Sun, CloudRain } from 'lucide-react';
import { LocationNode } from '@/types/location';

interface Props {
  dayIndex: number;
  location: LocationNode;
  activities: string[];
  nightsToStay: number;
  distanceFromPrev: number;
  driveTime: number;
  isFirst: boolean;
  onLocateOnMap: (loc: LocationNode) => void;
}

const STATUS_COLORS: Record<string, string> = {
  Clear: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  Moderate: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  Heavy: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  Choked: 'text-red-400 bg-red-500/10 border-red-500/30',
};

const CATEGORY_COLORS: Record<string, string> = {
  'Char Dham': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  'Treks & Adventure': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  'Wildlife & Parks': 'bg-lime-500/15 text-lime-300 border-lime-500/30',
  'Hill Station': 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  'Heritage & Architecture': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  'Pilgrimage': 'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

export const ItineraryCard: React.FC<Props> = ({
  dayIndex, location, activities, nightsToStay, distanceFromPrev, driveTime, isFirst, onLocateOnMap
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: dayIndex * 0.08, duration: 0.4 }}
      className="relative flex gap-4"
    >
      {/* Day marker & connector line */}
      <div className="flex flex-col items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 flex-shrink-0 z-10"
        >
          {dayIndex}
        </motion.div>
        <div className="w-0.5 flex-1 bg-gradient-to-b from-emerald-500/40 to-transparent mt-2 min-h-[20px]" />
      </div>

      {/* Card body */}
      <div className="flex-1 pb-6">
        {/* Travel from previous */}
        {!isFirst && distanceFromPrev > 0 && (
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold mb-2 bg-slate-900/50 rounded-xl px-3 py-1.5 w-fit border border-slate-800">
            <Footprints className="w-3 h-3 text-slate-400" />
            {distanceFromPrev} km • ~{driveTime.toFixed(1)} hrs drive
          </div>
        )}

        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden hover:border-emerald-500/30 transition-all group">
          {/* Header with image */}
          <div className="relative h-36 overflow-hidden">
            <img
              src={location.imageUrl}
              alt={location.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            {/* Badges */}
            <div className="absolute top-2 left-2 flex gap-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${CATEGORY_COLORS[location.category] || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                {location.category}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${STATUS_COLORS[location.crowdStatus]}`}>
                {location.crowdStatus}
              </span>
            </div>
            {location.altitude && (
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/80 text-[10px] text-slate-300 font-bold border border-slate-700">
                <Mountain className="w-3 h-3 text-cyan-400" />{location.altitude}
              </div>
            )}
            <div className="absolute bottom-2 left-3">
              <h3 className="text-sm font-black text-white leading-tight">{location.name}</h3>
              <p className="text-[11px] text-slate-300">{location.district}, {location.division}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3">
            {/* Stay info */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {nightsToStay} night{nightsToStay !== 1 ? 's' : ''}
              </span>
              {location.historicalPeakHour && (
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  Peak: {location.historicalPeakHour}
                </span>
              )}
              {location.bestTimeToVisit && (
                <span className="flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                  {location.bestTimeToVisit}
                </span>
              )}
            </div>

            {/* Activities */}
            <div className="flex flex-wrap gap-1.5">
              {activities.map((act, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] text-slate-300 font-semibold border border-slate-700">
                  {act}
                </span>
              ))}
            </div>

            {/* Travel alert */}
            {location.travelAlert && (
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-300">
                <CloudRain className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                {location.travelAlert}
              </div>
            )}

            {/* Locate button */}
            <button
              onClick={() => onLocateOnMap(location)}
              className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold hover:text-emerald-300 transition-colors group/btn"
            >
              <MapPin className="w-3.5 h-3.5" />
              Locate on Map
              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
