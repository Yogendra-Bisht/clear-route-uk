'use client';

import React from 'react';
import { LocationNode, LocationCoordinates } from '@/types/location';
import { calculateDistanceKm } from '@/lib/geo';
import { Locate, Filter, MapPin, Search } from 'lucide-react';

interface RadiusFilterProps {
  locations: LocationNode[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  radiusKm: number;
  setRadiusKm: (radius: number) => void;
  userCoords: LocationCoordinates | null;
  setUserCoords: (coords: LocationCoordinates | null) => void;
  selectedLocation: LocationNode | null;
  onSelectLocation: (node: LocationNode) => void;
}

export const RadiusFilter: React.FC<RadiusFilterProps> = ({
  locations,
  selectedCategory,
  setSelectedCategory,
  radiusKm,
  setRadiusKm,
  userCoords,
  setUserCoords,
  selectedLocation,
  onSelectLocation,
}) => {
  const [isLocating, setIsLocating] = React.useState(false);
  const [geoError, setGeoError] = React.useState<string | null>(null);

  const categories = ['All', 'Pilgrimage', 'Hill Station', 'Transit Hub'];

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
        if (radiusKm === 0) {
          setRadiusKm(25); // Default to 25km radius when GPS enabled
        }
      },
      (error) => {
        setIsLocating(false);
        setGeoError('Unable to retrieve GPS coordinates. Defaulting to Uttarakhand center.');
        // Fallback default coordinates (e.g. Rishikesh)
        setUserCoords({ lat: 30.1034, lng: 78.2932 });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Filter locations by Category & Distance Radius
  const filteredLocations = locations.filter((loc) => {
    const matchesCategory = selectedCategory === 'All' || loc.category === selectedCategory;

    if (!userCoords || radiusKm === 0) {
      return matchesCategory;
    }

    const dist = calculateDistanceKm(userCoords, loc.coordinates);
    return matchesCategory && dist <= radiusKm;
  });

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
          <Filter className="w-4 h-4 text-emerald-400" />
          <span>Geospatial & Category Filters</span>
        </div>

        {/* GPS Trigger */}
        <button
          onClick={handleGetLocation}
          disabled={isLocating}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all disabled:opacity-50"
        >
          <Locate className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{userCoords ? 'GPS Active' : 'Locate Me'}</span>
        </button>
      </div>

      {geoError && <p className="text-[11px] text-amber-400 font-medium">{geoError}</p>}

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-slate-700 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Radius Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-slate-300">
          <span>Search Distance Radius:</span>
          <span className="text-emerald-400 font-bold">
            {radiusKm === 0 ? 'All Regions' : `< ${radiusKm} km`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={radiusKm}
          onChange={(e) => setRadiusKm(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>Off</span>
          <span>25 km</span>
          <span>50 km</span>
          <span>100 km</span>
        </div>
      </div>

      {/* Location Cards Sidebar List */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
          <span>Monitored Locations ({filteredLocations.length}):</span>
        </div>

        <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {filteredLocations.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            const distance = userCoords
              ? calculateDistanceKm(userCoords, loc.coordinates)
              : null;

            return (
              <div
                key={loc.id}
                onClick={() => onSelectLocation(loc)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {loc.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {loc.region} • {loc.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        loc.crowdStatus === 'Clear'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : loc.crowdStatus === 'Moderate'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      Score: {loc.currentCrowdScore}
                    </span>
                    {distance !== null && (
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">{distance} km away</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
