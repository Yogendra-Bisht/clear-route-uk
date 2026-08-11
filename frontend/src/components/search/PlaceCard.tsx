'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LocationNode } from '@/types/location';
import { 
  MapPin, 
  Mountain, 
  Compass, 
  AlertTriangle, 
  Calendar, 
  Footprints, 
  Trees, 
  Landmark, 
  Sparkles,
  Info
} from 'lucide-react';

interface PlaceCardProps {
  location: LocationNode;
  onSelect: (location: LocationNode) => void;
  onOpenModal?: (location: LocationNode) => void;
  onLocateOnMap?: (location: LocationNode) => void;
  isCompact?: boolean;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  location,
  onSelect,
  onOpenModal,
  onLocateOnMap,
  isCompact = false
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Choked':
        return 'bg-red-500/20 text-red-400 border-red-500/40 shadow-red-500/10';
      case 'Heavy':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-amber-500/10';
      case 'Moderate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40 shadow-yellow-500/10';
      case 'Clear':
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-emerald-500/10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Char Dham':
      case 'Pilgrimage':
        return <Landmark className="w-3.5 h-3.5 text-amber-400" />;
      case 'Treks & Adventure':
        return <Footprints className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Wildlife & Parks':
        return <Trees className="w-3.5 h-3.5 text-green-400" />;
      case 'Heritage & Architecture':
        return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
      case 'Hill Station':
      default:
        return <Mountain className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-emerald-500/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/5 transition-all flex flex-col cursor-pointer"
      onClick={() => onOpenModal ? onOpenModal(location) : onSelect(location)}
    >
      {/* Image Header with Badge Overlay */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
        <img
          src={location.imageUrl}
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            // Fallback image if Unsplash URL fails
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          {/* Division Badge */}
          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold tracking-wider border backdrop-blur-md ${
            location.division === 'Garhwal'
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
              : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30'
          }`}>
            {location.division} Division
          </span>

          {/* Crowd Status Badge */}
          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold border shadow-lg backdrop-blur-md ${getStatusColor(location.crowdStatus)}`}>
            {location.crowdStatus} ({location.currentCrowdScore}%)
          </span>
        </div>

        {/* Bottom Image Overlay Labels */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800">
            {getCategoryIcon(location.category)}
            <span>{location.category}</span>
          </div>

          {location.altitude && (
            <div className="flex items-center gap-1 text-[11px] text-slate-300 font-semibold bg-slate-950/70 backdrop-blur-md px-2 py-1 rounded-md border border-slate-800">
              <Mountain className="w-3 h-3 text-cyan-400" />
              <span>{location.altitude}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
              {location.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {location.district}, {location.region}
            </span>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {location.description}
          </p>
        </div>

        {/* Trek Parameters Badge Bar if location has trekDetails */}
        {location.trekDetails && (
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Footprints className="w-3.5 h-3.5" />
              <span>{location.trekDetails.distanceKm} km • {location.trekDetails.durationDays} Days</span>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {location.trekDetails.difficulty}
            </span>
          </div>
        )}

        {/* Highlights Pills */}
        {location.highlights && location.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {location.highlights.slice(0, 3).map((hl, i) => (
              <span key={i} className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50">
                {hl}
              </span>
            ))}
          </div>
        )}

        {/* Travel Alert Banner if present */}
        {location.travelAlert && (
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            <span className="line-clamp-1 font-medium">{location.travelAlert}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="text-[11px] text-slate-500">Updated {location.lastUpdated}</span>

          <div className="flex items-center gap-2">
            {onLocateOnMap && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onLocateOnMap(location);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-slate-300 transition-colors"
                title="Locate on Live Map"
              >
                <Compass className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenModal) onOpenModal(location);
                else onSelect(location);
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 transition-colors flex items-center gap-1 text-[11px]"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
