'use client';

import React from 'react';
import { LocationNode, LocationCoordinates, DivisionName } from '@/types/location';
import { calculateDistanceKm } from '@/lib/geo';
import { Locate, Filter, MapPin, Search, X, Mountain, Compass } from 'lucide-react';

interface RadiusFilterProps {
  locations: LocationNode[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDivision: 'All' | DivisionName;
  setSelectedDivision: (div: 'All' | DivisionName) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  radiusKm: number;
  setRadiusKm: (radius: number) => void;
  userCoords: LocationCoordinates | null;
  setUserCoords: (coords: LocationCoordinates | null) => void;
  selectedLocation: LocationNode | null;
  onSelectLocation: (node: LocationNode) => void;
  onOpenModal?: (node: LocationNode) => void;
}

export const RadiusFilter: React.FC<RadiusFilterProps> = ({
  locations,
  searchQuery,
  setSearchQuery,
  selectedDivision,
  setSelectedDivision,
  selectedCategory,
  setSelectedCategory,
  radiusKm,
  setRadiusKm,
  userCoords,
  setUserCoords,
  selectedLocation,
  onSelectLocation,
  onOpenModal
}) => {
  const [isLocating, setIsLocating] = React.useState(false);
  const [geoError, setGeoError] = React.useState<string | null>(null);

  const categories = [
    'All',
    'Char Dham',
    'Treks & Adventure',
    'Wildlife & Parks',
    'Hill Station',
    'Heritage & Architecture'
  ];

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
          setRadiusKm(50); // Default to 50km radius when GPS enabled
        }
      },
      (error) => {
        setIsLocating(false);
        setGeoError('Unable to retrieve GPS coordinates. Defaulting to Uttarakhand center.');
        setUserCoords({ lat: 30.1034, lng: 78.2932 });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Filter locations by Search query, Division, Category & Radius
  const filteredLocations = locations.filter((loc) => {
    // Search query match
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      loc.name.toLowerCase().includes(q) ||
      loc.district.toLowerCase().includes(q) ||
      loc.region.toLowerCase().includes(q) ||
      loc.division.toLowerCase().includes(q) ||
      loc.category.toLowerCase().includes(q) ||
      (loc.highlights && loc.highlights.some((hl) => hl.toLowerCase().includes(q)));

    // Division match
    const matchesDivision = selectedDivision === 'All' || loc.division === selectedDivision;

    // Category match
    const matchesCategory = selectedCategory === 'All' || loc.category === selectedCategory;

    // Radius match
    let matchesRadius = true;
    if (userCoords && radiusKm > 0) {
      const dist = calculateDistanceKm(userCoords, loc.coordinates);
      matchesRadius = dist <= radiusKm;
    }

    return matchesSearch && matchesDivision && matchesCategory && matchesRadius;
  });

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl space-y-5">
      {/* Header with Title & GPS Locate Button */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
          <Filter className="w-4 h-4 text-emerald-400" />
          <span>Filters & Search Control</span>
        </div>

        {/* GPS Trigger */}
        <button
          onClick={handleGetLocation}
          disabled={isLocating}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500/20 text-emerald-400 border border-slate-700 text-xs font-semibold transition-all disabled:opacity-50"
        >
          <Locate className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{userCoords ? 'GPS Active' : 'Locate Me'}</span>
        </button>
      </div>

      {geoError && <p className="text-[11px] text-amber-400 font-medium">{geoError}</p>}

      {/* Global Realtime Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by place, district, trek, temple..."
          className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-9 py-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Division Selector Tabs (Garhwal vs Kumaon) */}
      <div className="space-y-2">
        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Administrative Division</span>
          <span className="text-slate-500">{locations.length} total places</span>
        </label>

        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          {(['All', 'Garhwal', 'Kumaon'] as const).map((div) => (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedDivision === div
                  ? div === 'Garhwal'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : div === 'Kumaon'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {div === 'All' ? 'All Divisions' : `${div}`}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="space-y-2">
        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Category Filter</label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 border border-slate-800/80 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Distance Radius Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-slate-300">
          <span>Proximity Radius:</span>
          <span className="text-emerald-400 font-bold">
            {radiusKm === 0 ? 'Whole State' : `< ${radiusKm} km`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="150"
          step="10"
          value={radiusKm}
          onChange={(e) => setRadiusKm(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>Off</span>
          <span>50 km</span>
          <span>100 km</span>
          <span>150 km</span>
        </div>
      </div>

      {/* Location Hotspots List */}
      <div className="space-y-2 pt-3 border-t border-slate-800/80">
        <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
          <span>Matching Hotspots ({filteredLocations.length}):</span>
        </div>

        <div className="max-h-[360px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {filteredLocations.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 space-y-1">
              <p className="font-semibold">No destinations match your filters</p>
              <p className="text-[11px]">Try clearing your search query or expanding the division/category filters.</p>
            </div>
          ) : (
            filteredLocations.map((loc) => {
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
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex gap-2.5 items-start">
                      <img
                        src={loc.imageUrl}
                        alt={loc.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-950 shrink-0 border border-slate-800"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-100 hover:text-emerald-400 transition-colors line-clamp-1">
                          {loc.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            loc.division === 'Garhwal' ? 'text-emerald-400' : 'text-cyan-400'
                          }`}>
                            {loc.division}
                          </span>
                          <span>•</span>
                          <span className="line-clamp-1">{loc.district}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded border ${
                          loc.crowdStatus === 'Clear'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : loc.crowdStatus === 'Moderate'
                            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                            : loc.crowdStatus === 'Heavy'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}
                      >
                        {loc.crowdStatus} ({loc.currentCrowdScore}%)
                      </span>
                      {distance !== null && (
                        <p className="text-[10px] text-slate-400 mt-1 font-mono">{distance} km away</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
