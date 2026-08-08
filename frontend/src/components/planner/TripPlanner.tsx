'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Route, Map, IndianRupee, Navigation2, Compass, Hotel, Sparkles,
  CalendarDays, Users, ChevronRight, Info
} from 'lucide-react';
import { LocationNode, TripPlan, BudgetTier } from '@/types/location';
import { INITIAL_UTTARAKHAND_NODES, ROUTE_DISTANCES, BUDGET_RATES } from '@/data/mockData';
import { TripBuilderForm, TripFormState } from './TripBuilderForm';
import { ItineraryCard } from './ItineraryCard';
import { ExpenseBreakdown } from './ExpenseBreakdown';
import { RouteVisualizer } from './RouteVisualizer';
import { NearbyPlacesSuggester } from './NearbyPlacesSuggester';
import { StaysDirectory } from './StaysDirectory';

type PlannerTab = 'builder' | 'itinerary' | 'expenses' | 'route' | 'nearby' | 'stays';

const PLANNER_TABS: { id: PlannerTab; label: string; icon: React.ComponentType<any>; desc: string }[] = [
  { id: 'builder',   label: 'Trip Builder',   icon: CalendarDays,  desc: 'Set dates, group & budget' },
  { id: 'itinerary', label: 'Itinerary',       icon: Map,           desc: 'Day-by-day schedule' },
  { id: 'expenses',  label: 'Expense Planner', icon: IndianRupee,   desc: 'Cost breakdown' },
  { id: 'route',     label: 'Best Route',      icon: Navigation2,   desc: 'Optimized route map' },
  { id: 'nearby',    label: 'Nearby Places',   icon: Compass,       desc: 'Radius-based suggestions' },
  { id: 'stays',     label: 'Stays & Contacts',icon: Hotel,         desc: 'Homestays & hotels' },
];

/* ──────────────────────────────────────────────────────────────────────────────
   Core trip generation logic
   ────────────────────────────────────────────────────────────────────────── */
function generateTripPlan(form: TripFormState, allLocations: LocationNode[]): TripPlan {
  const start = new Date(form.startDate);
  const end = new Date(form.endDate);
  const totalDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000));
  const totalPeople = form.adults + form.children;

  // Filter locations by division & category preferences
  let pool = allLocations.filter(loc => {
    const divOk = form.division === 'Both' || loc.division === form.division;
    const catOk = form.categories.length === 0 || form.categories.includes(loc.category);
    return divOk && catOk;
  });

  // Sort by crowd score ascending (prefer less crowded)
  pool.sort((a, b) => a.currentCrowdScore - b.currentCrowdScore);

  // Determine how many stops based on total days (1 stop per 1-2 days)
  const maxStops = Math.min(pool.length, Math.max(1, Math.floor(totalDays / 1.5)));
  const selectedStops = pool.slice(0, maxStops);

  const nightsPerStop = Math.floor(totalDays / Math.max(selectedStops.length, 1));

  // Build stops with distances
  const stops = selectedStops.map((loc, i) => {
    const origin = form.originCity;
    const prevName = i === 0 ? origin : selectedStops[i - 1].name.split(' ')[0];
    const destName = loc.name.split(' ')[0];

    // Lookup distance from route matrix (bidirectional fallback)
    const fromOriginRow = ROUTE_DISTANCES[prevName] ?? ROUTE_DISTANCES[origin] ?? {};
    const distInfo = fromOriginRow[destName] ?? fromOriginRow[loc.district] ?? { km: 150 + i * 40, hours: 3 + i * 1.2 };

    return {
      locationId: loc.id,
      locationName: loc.name,
      dayIndex: i + 1,
      nightsToStay: Math.max(1, nightsPerStop),
      distanceFromPrevKm: i === 0 ? distInfo.km : distInfo.km,
      driveTimeHours: i === 0 ? distInfo.hours : distInfo.hours,
      suggestedActivities: loc.highlights?.slice(0, 4) ?? ['Sightseeing', 'Local market visit'],
    };
  });

  // Calculate total road distance
  const totalKm = stops.reduce((s, r) => s + r.distanceFromPrevKm, 0);

  // Cost calculations
  const kmRate = form.vehicleType === 'Car'
    ? BUDGET_RATES.transport.perKmCar
    : form.vehicleType === 'Taxi'
    ? BUDGET_RATES.transport.perKmTaxi
    : BUDGET_RATES.transport.perKmBus;

  const transport = Math.round(totalKm * kmRate);
  const accommodation = Math.round(BUDGET_RATES.accommodation[form.budgetTier] * Math.max(totalDays - 1, 1));
  const food = Math.round(BUDGET_RATES.food[form.budgetTier] * totalPeople * totalDays);
  const entryFees = stops.reduce((s, stop) => {
    const loc = allLocations.find(l => l.id === stop.locationId);
    if (!loc) return s;
    const fee = BUDGET_RATES.entryFees[loc.category] ?? 0;
    return s + fee * totalPeople;
  }, 0);
  const subtotal = transport + accommodation + food + entryFees;
  const miscellaneous = Math.round(subtotal * BUDGET_RATES.misc);
  const total = subtotal + miscellaneous;

  return {
    id: `plan-${Date.now()}`,
    originCity: form.originCity,
    startDate: form.startDate,
    endDate: form.endDate,
    totalDays,
    groupSize: { adults: form.adults, children: form.children },
    budgetTier: form.budgetTier,
    stops,
    estimatedCosts: { transport, accommodation, food, entryFees, miscellaneous, total },
  };
}

interface Props {
  locations: LocationNode[];
  onLocateOnMap: (loc: LocationNode) => void;
}

export const TripPlanner: React.FC<Props> = ({ locations, onLocateOnMap }) => {
  const [activeTab, setActiveTab] = useState<PlannerTab>('builder');
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [form, setForm] = useState<TripFormState>({
    originCity: 'Dehradun',
    startDate: '',
    endDate: '',
    adults: 2,
    children: 0,
    budgetTier: 'Moderate',
    categories: [],
    division: 'Both',
    vehicleType: 'Car',
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newPlan = generateTripPlan(form, locations);
      setPlan(newPlan);
      setIsGenerating(false);
      setActiveTab('itinerary');
    }, 1200);
  };

  // Resolve LocationNodes from stop IDs
  const stopNodes: LocationNode[] = useMemo(() => {
    if (!plan) return [];
    return plan.stops
      .map(s => locations.find(l => l.id === s.locationId))
      .filter(Boolean) as LocationNode[];
  }, [plan, locations]);

  const routeStops = useMemo(() => {
    if (!plan) return [];
    return plan.stops.map((s, i) => ({
      location: locations.find(l => l.id === s.locationId)!,
      dayIndex: s.dayIndex,
      distanceFromPrevKm: s.distanceFromPrevKm,
      driveTimeHours: s.driveTimeHours,
      activities: s.suggestedActivities,
    })).filter(r => !!r.location);
  }, [plan, locations]);

  const totalPeople = form.adults + form.children;

  return (
    <div className="space-y-6">
      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-8"
      >
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-black uppercase tracking-widest">
              <Route className="w-3.5 h-3.5" />
              AI-Powered Trip Planner
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              Plan Your Perfect <span className="text-emerald-400">Uttarakhand</span> Journey
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Get a personalised day-by-day itinerary, real-time crowd-optimised route, expense calculator,
              and curated homestay & hotel contacts — all in one place.
            </p>
          </div>

          {plan && (
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-center">
                <p className="text-xs text-emerald-400 font-bold">Trip Ready</p>
                <p className="text-xl font-black text-white">
                  ₹{plan.estimatedCosts.total.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-slate-400">{plan.totalDays} days • {stopNodes.length} stops</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tab navigation */}
      <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 overflow-x-auto custom-scrollbar">
        {PLANNER_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isLocked = tab.id !== 'builder' && !plan;
          return (
            <button
              key={tab.id}
              onClick={() => !isLocked && setActiveTab(tab.id)}
              disabled={isLocked}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 z-10 ${
                isActive ? 'text-slate-950' : isLocked ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div layoutId="plannerPill"
                  className="absolute inset-0 bg-emerald-400 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'builder' && (
            <TripBuilderForm
              form={form}
              onChange={setForm}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )}

          {activeTab === 'itinerary' && plan && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                Showing {stopNodes.length} stops across {plan.totalDays} days. Destinations are sorted by crowd score (least crowded first).
              </div>
              {plan.stops.map((stop, i) => {
                const loc = locations.find(l => l.id === stop.locationId);
                if (!loc) return null;
                return (
                  <ItineraryCard
                    key={stop.locationId}
                    dayIndex={stop.dayIndex}
                    location={loc}
                    activities={stop.suggestedActivities}
                    nightsToStay={stop.nightsToStay}
                    distanceFromPrev={stop.distanceFromPrevKm}
                    driveTime={stop.driveTimeHours}
                    isFirst={i === 0}
                    onLocateOnMap={onLocateOnMap}
                  />
                );
              })}
            </div>
          )}

          {activeTab === 'expenses' && plan && (
            <ExpenseBreakdown plan={plan} totalPeople={totalPeople} />
          )}

          {activeTab === 'route' && plan && (
            <RouteVisualizer
              originCity={form.originCity}
              stops={routeStops}
              onLocateOnMap={onLocateOnMap}
            />
          )}

          {activeTab === 'nearby' && (
            <NearbyPlacesSuggester
              locations={locations}
              baseLocation={stopNodes[0] ?? null}
              onLocateOnMap={onLocateOnMap}
            />
          )}

          {activeTab === 'stays' && (
            <StaysDirectory stops={stopNodes} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
