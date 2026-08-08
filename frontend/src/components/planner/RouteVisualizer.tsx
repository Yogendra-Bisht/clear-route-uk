'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Navigation, ArrowDown, Clock, Road, AlertTriangle, MapPin, ChevronRight
} from 'lucide-react';
import { LocationNode } from '@/types/location';

interface RouteStop {
  location: LocationNode;
  dayIndex: number;
  distanceFromPrevKm: number;
  driveTimeHours: number;
  activities: string[];
}

interface Props {
  originCity: string;
  stops: RouteStop[];
  onLocateOnMap: (loc: LocationNode) => void;
}

const STOP_ICONS = ['🏠', '🏔️', '⛩️', '🌿', '🦁', '🏞️', '⛺'];

export const RouteVisualizer: React.FC<Props> = ({ originCity, stops, onLocateOnMap }) => {
  const totalKm = stops.reduce((s, r) => s + r.distanceFromPrevKm, 0);
  const totalHours = stops.reduce((s, r) => s + r.driveTimeHours, 0);

  return (
    <div className="space-y-5">
      {/* Summary bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
      >
        {[
          { label: 'Total Stops', value: stops.length.toString(), icon: MapPin, color: 'text-emerald-400' },
          { label: 'Total Distance', value: `${totalKm.toLocaleString('en-IN')} km`, icon: Navigation, color: 'text-cyan-400' },
          { label: 'Drive Time', value: `~${totalHours.toFixed(0)} hrs`, icon: Clock, color: 'text-amber-400' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-4 border border-slate-800 text-center space-y-1"
            >
              <Icon className={`w-5 h-5 mx-auto ${stat.color}`} />
              <p className="text-lg font-black text-slate-100">{stat.value}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Route stepper */}
      <div className="space-y-0">
        {/* Origin */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 p-4"
        >
          <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg flex-shrink-0">
            🚦
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Starting Point</p>
            <p className="text-base font-black text-slate-100">{originCity}</p>
          </div>
          <div className="ml-auto px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black border border-emerald-500/20">
            ORIGIN
          </div>
        </motion.div>

        {stops.map((stop, idx) => (
          <React.Fragment key={stop.location.id}>
            {/* Connector with travel info */}
            {stop.distanceFromPrevKm > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 + 0.05 }}
                className="flex items-center gap-3 px-4 py-2"
              >
                <div className="w-10 flex justify-center">
                  <div className="w-0.5 h-full min-h-[32px] bg-gradient-to-b from-slate-700 to-emerald-500/30 rounded-full" />
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 bg-slate-900/60 rounded-xl px-3 py-1.5 border border-slate-800">
                  <ArrowDown className="w-3 h-3 text-emerald-500/60" />
                  <span className="font-bold text-slate-400">{stop.distanceFromPrevKm} km</span>
                  <span className="text-slate-600">•</span>
                  <Clock className="w-3 h-3 text-amber-400/70" />
                  <span className="text-slate-400">~{stop.driveTimeHours.toFixed(1)} hrs</span>
                </div>
              </motion.div>
            )}

            {/* Stop card */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-2xl border border-slate-800/50 hover:border-emerald-500/20 transition-all group bg-slate-900/20 mx-2"
            >
              {/* Day bubble */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black text-sm flex-shrink-0 shadow-md shadow-emerald-500/20">
                {stop.dayIndex}
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-black text-slate-100">{stop.location.name}</p>
                    <p className="text-[11px] text-slate-500">{stop.location.district} · {stop.location.division}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex-shrink-0">
                    {stop.location.category}
                  </span>
                </div>

                {/* Activities chips */}
                <div className="flex flex-wrap gap-1">
                  {stop.activities.slice(0, 3).map((act, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-800/80 text-[10px] text-slate-400 border border-slate-700/50">
                      {act}
                    </span>
                  ))}
                </div>

                {/* Alerts */}
                {stop.location.travelAlert && (
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-300 bg-amber-500/5 rounded-lg px-2.5 py-1 border border-amber-500/15">
                    <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                    {stop.location.travelAlert}
                  </div>
                )}

                <button
                  onClick={() => onLocateOnMap(stop.location)}
                  className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
                >
                  <MapPin className="w-3 h-3" /> View on Map
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          </React.Fragment>
        ))}

        {/* End marker */}
        {stops.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: stops.length * 0.1 + 0.1 }}
            className="flex items-center gap-4 p-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">
              🏁
            </div>
            <p className="text-sm font-bold text-slate-400">Return to {originCity}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
