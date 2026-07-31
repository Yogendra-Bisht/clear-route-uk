'use client';

import React, { useState, useEffect } from 'react';
import { LocationNode, LocationCoordinates, CrowdsourcedReportPayload } from '@/types/location';
import { INITIAL_UTTARAKHAND_NODES, INITIAL_7DAY_FORECAST } from '@/data/mockData';
import { subscribeToCrowdUpdates } from '@/lib/socket';
import { Navbar } from '@/components/Navbar';
import { MapContainer } from '@/components/map/MapContainer';
import { PredictiveTimeline } from '@/components/timeline/PredictiveTimeline';
import { RadiusFilter } from '@/components/search/RadiusFilter';
import { ReportModal } from '@/components/crowdsource/ReportModal';
import { Activity, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

export default function Home() {
  const [locations, setLocations] = useState<LocationNode[]>(INITIAL_UTTARAKHAND_NODES);
  const [forecast] = useState(INITIAL_7DAY_FORECAST);
  const [selectedLocation, setSelectedLocation] = useState<LocationNode | null>(INITIAL_UTTARAKHAND_NODES[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [radiusKm, setRadiusKm] = useState<number>(0);
  const [userCoords, setUserCoords] = useState<LocationCoordinates | null>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'timeline' | 'report'>('map');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [reportLocation, setReportLocation] = useState<LocationNode | null>(null);

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

  const handleCrowdsourceSubmit = (payload: CrowdsourcedReportPayload) => {
    // Dynamically update the node in local state to demonstrate live crowdsourced verification
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

  const chokedCount = locations.filter((loc) => loc.crowdStatus === 'Choked').length;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isConnected={isConnected}
        chokedCount={chokedCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-8">
        {/* Top Hero Summary Bar */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-wide text-slate-100 uppercase">
                Uttarakhand Tourist Density Telemetry
              </h2>
              <p className="text-xs text-slate-400">
                Monitoring key pilgrimage corridors, hill stations, and transit choke points in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{locations.length} Hotspots Active</span>
            </div>

            <button
              onClick={() => handleOpenReportModal(selectedLocation || locations[0])}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Live Verification Report</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Live Crowd Map & Geospatial Query View */}
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sidebar Controls (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <RadiusFilter
                locations={locations}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                radiusKm={radiusKm}
                setRadiusKm={setRadiusKm}
                userCoords={userCoords}
                setUserCoords={setUserCoords}
                selectedLocation={selectedLocation}
                onSelectLocation={(node) => setSelectedLocation(node)}
              />
            </div>

            {/* Map Container (8 cols) */}
            <div className="lg:col-span-8 h-[640px]">
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
        )}

        {/* Tab 2: 7-Day Density Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <PredictiveTimeline forecast={forecast} />
          </div>
        )}

        {/* Full-width Timeline Section always accessible below Map */}
        {activeTab === 'map' && (
          <div className="pt-4 border-t border-slate-800/80">
            <PredictiveTimeline forecast={forecast} />
          </div>
        )}
      </main>

      {/* Crowdsource Verification Modal */}
      <ReportModal
        location={reportLocation}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={handleCrowdsourceSubmit}
      />

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800/80 mt-12 py-6 px-4 text-center text-xs text-slate-500">
        <p>
          ClearRoute UK — Real-Time Tourist Density & Heuristic Forecasting Platform • Uttarakhand, India
        </p>
      </footer>
    </div>
  );
}
