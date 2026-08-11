'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocationNode } from '@/types/location';
import { 
  X, 
  MapPin, 
  Mountain, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  Trees, 
  Landmark, 
  Footprints,
  Activity
} from 'lucide-react';

interface PlaceDetailModalProps {
  location: LocationNode | null;
  isOpen: boolean;
  onClose: () => void;
  onLocateOnMap?: (location: LocationNode) => void;
  onReportVerification?: (location: LocationNode) => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  location,
  isOpen,
  onClose,
  onLocateOnMap,
  onReportVerification
}) => {
  if (!location) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Choked':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'Heavy':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'Moderate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
      case 'Clear':
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full bg-slate-950 shrink-0">
              <img
                src={location.imageUrl}
                alt={location.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-md transition-all hover:scale-105 z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Titles */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border backdrop-blur-md ${
                    location.division === 'Garhwal' 
                      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40' 
                      : 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40'
                  }`}>
                    {location.division} Division
                  </span>

                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-800/80 text-slate-300 border border-slate-700 backdrop-blur-md">
                    {location.category}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {location.name}
                </h2>

                <div className="flex items-center gap-2 text-sm text-slate-300 mt-1">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{location.district} District • {location.region}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300">
              {/* Density Telemetry Gauge */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
                    <Activity className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Current Density Telemetry</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-black border ${getStatusColor(location.crowdStatus)}`}>
                        {location.crowdStatus}
                      </span>
                      <span className="text-lg font-black text-white">{location.currentCrowdScore}/100 Score</span>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-48 space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-400">
                    <span>Capacity Limit</span>
                    <span>{location.capacityLimit.toLocaleString()} Visitors</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        location.currentCrowdScore > 75 
                          ? 'bg-red-500' 
                          : location.currentCrowdScore > 50 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(location.currentCrowdScore, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Travel Advisory Alert if present */}
              {location.travelAlert && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black uppercase text-amber-300 tracking-wider">Active Travel Advisory</h4>
                    <p className="text-xs text-amber-200/90 mt-0.5 leading-relaxed">{location.travelAlert}</p>
                  </div>
                </div>
              )}

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {location.altitude && (
                  <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center gap-2.5">
                    <Mountain className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold">Altitude</span>
                      <p className="text-xs font-bold text-slate-200">{location.altitude}</p>
                    </div>
                  </div>
                )}

                {location.bestTimeToVisit && (
                  <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center gap-2.5">
                    <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold">Best Season</span>
                      <p className="text-xs font-bold text-slate-200">{location.bestTimeToVisit}</p>
                    </div>
                  </div>
                )}

                {location.historicalPeakHour && (
                  <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold">Historical Peak</span>
                      <p className="text-xs font-bold text-slate-200">{location.historicalPeakHour}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Granular Trek Parameters & Itinerary if location is a Trek */}
              {location.trekDetails && (
                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                    <div className="flex items-center gap-2">
                      <Footprints className="w-5 h-5 text-emerald-400" />
                      <h4 className="text-sm font-black uppercase text-emerald-300 tracking-wider">
                        Trek Expedition Parameters
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Toughness: {location.trekDetails.difficulty}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-semibold block">Trail Distance</span>
                      <span className="text-sm font-extrabold text-white">{location.trekDetails.distanceKm} km</span>
                    </div>
                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-semibold block">Duration</span>
                      <span className="text-sm font-extrabold text-white">{location.trekDetails.durationDays} Days</span>
                    </div>
                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-semibold block">Max Elevation</span>
                      <span className="text-sm font-extrabold text-cyan-400">{location.trekDetails.maxAltitudeMeters} m</span>
                    </div>
                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-semibold block">Base Camp</span>
                      <span className="text-xs font-bold text-amber-300 truncate block">{location.trekDetails.baseCamp}</span>
                    </div>
                  </div>

                  {location.trekDetails.requiresPermit && (
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 text-xs text-amber-200">
                      <b>Mandatory Permit:</b> {location.trekDetails.permitDetails || 'Forest / Inner Line permit required'}
                    </div>
                  )}

                  {location.trekDetails.itinerarySummary && location.trekDetails.itinerarySummary.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-emerald-500/20">
                      <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Day-by-Day Trek Itinerary</p>
                      <div className="space-y-1.5">
                        {location.trekDetails.itinerarySummary.map((dayStep, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-200 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{dayStep}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Overview</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{location.description}</p>
              </div>

              {/* Highlights */}
              {location.highlights && location.highlights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Key Highlights & Attractions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {location.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500">Last telemetry sync: {location.lastUpdated}</span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {onLocateOnMap && (
                  <button
                    onClick={() => {
                      onLocateOnMap(location);
                      onClose();
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <Compass className="w-4 h-4 text-emerald-400" />
                    <span>Locate on Map</span>
                  </button>
                )}

                {onReportVerification && (
                  <button
                    onClick={() => {
                      onReportVerification(location);
                      onClose();
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Verify Live Status</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
