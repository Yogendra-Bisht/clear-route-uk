'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocationNode, LocationCoordinates, CrowdsourcedReportPayload, DivisionName } from '@/types/location';
import { INITIAL_UTTARAKHAND_NODES, INITIAL_7DAY_FORECAST } from '@/data/mockData';
import { subscribeToCrowdUpdates } from '@/lib/socket';
import { Navbar, MainTabType } from '@/components/Navbar';
import { MapContainer } from '@/components/map/MapContainer';
import { PredictiveTimeline } from '@/components/timeline/PredictiveTimeline';
import { RadiusFilter } from '@/components/search/RadiusFilter';
import { PlaceCard } from '@/components/search/PlaceCard';
import { PlaceDetailModal } from '@/components/search/PlaceDetailModal';
import { ReportModal } from '@/components/crowdsource/ReportModal';
import { UttarakhandGuide } from '@/components/guide/UttarakhandGuide';
import { TripPlanner } from '@/components/planner/TripPlanner';
import { Activity, Sparkles, MapPin, Search, Compass, Grid, Filter, RefreshCw, Landmark, Footprints, Trees } from 'lucide-react';

export default function Home() {
  const [locations, setLocations] = useState<LocationNode[]>(INITIAL_UTTARAKHAND_NODES);
  const [forecast] = useState(INITIAL_7DAY_FORECAST);
  const [selectedLocation, setSelectedLocation] = useState<LocationNode | null>(INITIAL_UTTARAKHAND_NODES[0]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDivision, setSelectedDivision] = useState<'All' | DivisionName>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [radiusKm, setRadiusKm] = useState<number>(0);
  const [userCoords, setUserCoords] = useState<LocationCoordinates | null>(null);

  // Tabs & Navigation State
  const [activeTab, setActiveTab] = useState<MainTabType>('map');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Modal States
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [reportLocation, setReportLocation] = useState<LocationNode | null>(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [detailLocation, setDetailLocation] = useState<LocationNode | null>(null);

  // Subscribe to real-time websocket updates
  useEffect(() => {
    const unsubscribe = subscribeToCrowdUpdates((update) => {
      setLocations((prev) =>
        prev.map((loc) => {
          if (loc.id === update.id) {
            return {
              ...loc,
              ...update,
              lastUpdated: 'Just now',
            };
          }
          return loc;
        })
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOpenReportModal = (loc: LocationNode) => {
    setReportLocation(loc);
    setIsReportModalOpen(true);
  };

  const handleOpenDetailModal = (loc: LocationNode) => {
    setDetailLocation(loc);
    setIsDetailModalOpen(true);
  };

  const handleLocateOnMap = (loc: LocationNode) => {
    setSelectedLocation(loc);
    setActiveTab('map');
  };

  const handleCrowdsourceSubmit = (payload: CrowdsourcedReportPayload) => {
    setLocations((prev) =>
      prev.map((loc) => {
        if (loc.id === payload.locationId) {
          return {
            ...loc,
            currentCrowdScore: payload.crowdScoreEstimate,
            crowdStatus: payload.reportedStatus,
            lastUpdated: 'Verified Live (Just Now)',
          };
        }
        return loc;
      })
    );
  };

  // Filtered Places for Places View
  const filteredPlaces = locations.filter((loc) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      loc.name.toLowerCase().includes(q) ||
      loc.district.toLowerCase().includes(q) ||
      loc.region.toLowerCase().includes(q) ||
      loc.division.toLowerCase().includes(q) ||
      loc.category.toLowerCase().includes(q) ||
      (loc.highlights && loc.highlights.some((hl) => hl.toLowerCase().includes(q)));

    const matchesDivision = selectedDivision === 'All' || loc.division === selectedDivision;
    const matchesCategory = selectedCategory === 'All' || loc.category === selectedCategory;

    return matchesSearch && matchesDivision && matchesCategory;
  });

  const chokedCount = locations.filter((loc) => loc.crowdStatus === 'Choked').length;
  const garhwalCount = locations.filter((loc) => loc.division === 'Garhwal').length;
  const kumaonCount = locations.filter((loc) => loc.division === 'Kumaon').length;

  return (
    <div className="min-h-screen bg-[#070a11] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isConnected={isConnected}
        chokedCount={chokedCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-8">
        {/* Top Hero Summary Telemetry Bar */}
        <div className="glass-panel rounded-3xl p-5 md:p-6 border border-slate-800/80 bg-slate-950/60 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 shadow-inner">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold tracking-wider text-slate-100 uppercase">
                  Uttarakhand Telemetry & Tourism Matrix
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                  {locations.length} Monitored Destinations
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Monitoring pilgrim corridors, treks, national parks & hill stations across Garhwal ({garhwalCount}) & Kumaon ({kumaonCount}).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDivision('Garhwal');
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                selectedDivision === 'Garhwal'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              Garhwal ({garhwalCount})
            </button>

            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDivision('Kumaon');
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                selectedDivision === 'Kumaon'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              Kumaon ({kumaonCount})
            </button>

            <button
              onClick={() => handleOpenReportModal(selectedLocation || locations[0])}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Verify Live Status</span>
            </button>
          </div>
        </div>

        {/* Tab Content Switching with Framer Motion */}
        <AnimatePresence mode="wait">
          {/* TAB 1: LIVE MAP & TELEMETRY */}
          {activeTab === 'map' && (
            <motion.div
              key="map-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Sidebar Search & Filter Panel (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                  <RadiusFilter
                    locations={locations}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedDivision={selectedDivision}
                    setSelectedDivision={setSelectedDivision}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    radiusKm={radiusKm}
                    setRadiusKm={setRadiusKm}
                    userCoords={userCoords}
                    setUserCoords={setUserCoords}
                    selectedLocation={selectedLocation}
                    onSelectLocation={(node) => setSelectedLocation(node)}
                    onOpenModal={handleOpenDetailModal}
                  />
                </div>

                {/* Leaflet Geospatial Map Container (8 cols) */}
                <div className="lg:col-span-8 h-[660px]">
                  <MapContainer
                    locations={locations}
                    selectedLocation={selectedLocation}
                    onSelectLocation={(node) => setSelectedLocation(node)}
                    userCoords={userCoords}
                    radiusKm={radiusKm}
                    onOpenReportModal={handleOpenReportModal}
                  />
                </div>
              </div>

              {/* 7-Day Density Timeline standard preview */}
              <div className="pt-6 border-t border-slate-800/80">
                <PredictiveTimeline forecast={forecast} />
              </div>
            </motion.div>
          )}

          {/* TAB 2: EXPLORE PLACES GRID */}
          {activeTab === 'places' && (
            <motion.div
              key="places-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Category & Division Filter Pills Bar */}
              <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search places, treks, temples..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-100 outline-none transition-all"
                  />
                </div>

                {/* Division Tabs */}
                <div className="flex items-center gap-2">
                  {(['All', 'Garhwal', 'Kumaon'] as const).map((div) => (
                    <button
                      key={div}
                      onClick={() => setSelectedDivision(div)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                        selectedDivision === div
                          ? div === 'Garhwal'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : div === 'Kumaon'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-slate-800 text-white border-slate-700'
                          : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {div === 'All' ? 'All Divisions' : `${div} Division`}
                    </button>
                  ))}
                </div>

                {/* Category Selector */}
                <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar max-w-full pb-1">
                  {['All', 'Char Dham', 'Treks & Adventure', 'Wildlife & Parks', 'Hill Station', 'Heritage & Architecture'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                        selectedCategory === cat
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                          : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of PlaceCards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaces.length === 0 ? (
                  <div className="col-span-full p-12 text-center glass-panel rounded-3xl border border-slate-800 space-y-3">
                    <p className="text-base font-bold text-slate-300">No destinations found matching your filters</p>
                    <p className="text-xs text-slate-500">Try adjusting your search keywords, division, or category selections.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedDivision('All');
                        setSelectedCategory('All');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 border border-slate-700 transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  filteredPlaces.map((loc) => (
                    <PlaceCard
                      key={loc.id}
                      location={loc}
                      onSelect={(node) => setSelectedLocation(node)}
                      onOpenModal={(node) => handleOpenDetailModal(node)}
                      onLocateOnMap={(node) => handleLocateOnMap(node)}
                    />
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: 7-DAY FORECAST */}
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <PredictiveTimeline forecast={forecast} />
            </motion.div>
          )}

          {/* TAB 4: DISCOVER UTTARAKHAND GUIDE */}
          {activeTab === 'uttarakhand' && (
            <motion.div
              key="uttarakhand-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <UttarakhandGuide />
            </motion.div>
          )}

          {/* TAB 5: PLAN MY TRIP */}
          {activeTab === 'planner' && (
            <motion.div
              key="planner-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <TripPlanner
                locations={locations}
                onLocateOnMap={handleLocateOnMap}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Place Detail Modal */}
      <PlaceDetailModal
        location={detailLocation}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onLocateOnMap={(loc) => handleLocateOnMap(loc)}
        onReportVerification={(loc) => handleOpenReportModal(loc)}
      />

      {/* Crowdsource Verification Modal */}
      <ReportModal
        location={reportLocation}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={handleCrowdsourceSubmit}
      />

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800/80 mt-16 py-8 px-4 text-center text-xs text-slate-500 bg-slate-950/90">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300">ClearRoute UK</span>
            <span>— Garhwal & Kumaon Real-Time Telemetry Platform</span>
          </div>
          <p className="text-slate-500">
            Uttarakhand Tourism, Density Analytics & Chokepoint Monitoring System • India
          </p>
        </div>
      </footer>
    </div>
  );
}
