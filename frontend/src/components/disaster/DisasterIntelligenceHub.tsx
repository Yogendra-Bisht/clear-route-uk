'use client';

import React, { useState } from 'react';
import { NATURAL_DISASTERS_DATA } from '@/data/mockData';
import { DisasterCategory, DisasterEvent } from '@/types/location';
import { ShieldAlert, AlertTriangle, CheckCircle2, History, MapPin, Activity, Navigation, Info, ShieldCheck } from 'lucide-react';

export const DisasterIntelligenceHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | DisasterCategory>('All');
  const [expandedId, setExpandedId] = useState<string | null>('disaster-kedarnath-2013');

  const categories: ('All' | DisasterCategory)[] = [
    'All',
    'Flash Flood',
    'Glacial Outburst',
    'Land Subsidence',
    'Landslide'
  ];

  const filteredDisasters = selectedCategory === 'All'
    ? NATURAL_DISASTERS_DATA
    : NATURAL_DISASTERS_DATA.filter(d => d.category === selectedCategory);

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'Severe':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'Moderate':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default:
        return 'bg-sky-500/20 text-sky-400 border-sky-500/40';
    }
  };

  return (
    <section className="w-full bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-red-500/20 shadow-2xl relative overflow-hidden my-8">
      {/* Glow Effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Live Alert Ticker Banner */}
      <div className="bg-red-950/70 border border-red-500/40 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg animate-pulse-slow">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400">
            <ShieldAlert className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-400">USDMA Live Safety Telemetry</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5">
              All Char Dham corridors (NH-58, NH-107, NH-109) monitored via <b>Doppler Weather Radars</b> & Sensor Grids.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-red-500/30 text-xs text-red-300 font-semibold self-stretch sm:self-auto justify-center">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Active SDRF Patrol Active</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-red-400 font-semibold text-sm tracking-wider uppercase mb-1">
            <History className="w-4 h-4" />
            <span>Disaster Memory & Safety Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Uttarakhand Natural Disaster History & Impact Hub
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-3xl">
            Detailed retrospective on past Himalayan natural disasters, infrastructure rebuild legacies, environmental lessons, and active safe travel advice for mountain corridors.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${
              selectedCategory === cat
                ? 'bg-red-500 text-slate-950 border-red-400 shadow-lg shadow-red-500/20 scale-105'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
            }`}
          >
            {cat === 'All' && <Activity className="w-4 h-4" />}
            {cat === 'Flash Flood' && <AlertTriangle className="w-4 h-4" />}
            {cat === 'Glacial Outburst' && <Info className="w-4 h-4" />}
            {cat === 'Land Subsidence' && <MapPin className="w-4 h-4" />}
            {cat === 'Landslide' && <Navigation className="w-4 h-4" />}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Disasters Timeline & Impact List */}
      <div className="space-y-6">
        {filteredDisasters.map((disaster) => {
          const isExpanded = expandedId === disaster.id;

          return (
            <div
              key={disaster.id}
              className={`bg-slate-900/80 border rounded-3xl overflow-hidden transition-all duration-300 shadow-xl ${
                isExpanded ? 'border-red-500/50 ring-1 ring-red-500/30' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : disaster.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 hover:bg-slate-850"
              >
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 items-center justify-center font-black text-lg shrink-0">
                    {disaster.year}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${getSeverityStyle(disaster.severity)}`}>
                        {disaster.severity} Severity
                      </span>
                      <span className="text-[11px] font-semibold bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-md">
                        {disaster.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        📍 {disaster.district}, {disaster.region} ({disaster.dateStr})
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-300 transition">
                      {disaster.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* Current Corridor Safety Rating Pill */}
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Current Safety Index</p>
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-base font-extrabold text-emerald-400">{disaster.currentSafetyScore}/100</span>
                    </div>
                  </div>

                  <button className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition text-xs font-semibold">
                    {isExpanded ? 'Collapse' : 'Inspect Impact'}
                  </button>
                </div>
              </div>

              {/* Expanded Detailed View */}
              {isExpanded && (
                <div className="p-6 border-t border-slate-800 bg-slate-950/60 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                  {/* Left Column: Summary & Media */}
                  <div className="lg:col-span-1 space-y-4">
                    <div className="h-44 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                      <img src={disaster.imageUrl} alt={disaster.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold uppercase text-red-400 mb-1">Event Summary</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{disaster.summary}</p>
                    </div>

                    {/* Affected Corridors */}
                    <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold uppercase text-slate-400 mb-2">Affected Road Corridors</p>
                      <div className="flex flex-wrap gap-1.5">
                        {disaster.impact.affectedCorridors.map((c, i) => (
                          <span key={i} className="text-[11px] bg-red-500/10 text-red-300 border border-red-500/20 px-2.5 py-1 rounded-lg">
                            🛣️ {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Infrastructure Impact & Reconstruction */}
                  <div className="space-y-4">
                    <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold uppercase text-amber-400 mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Infrastructure Impact
                      </p>
                      <p className="text-xs text-slate-300 mb-2"><b>Damage Report:</b> {disaster.impact.infrastructureDamage}</p>
                      {disaster.impact.livesAffected && (
                        <p className="text-xs text-red-300"><b>Human Impact:</b> {disaster.impact.livesAffected}</p>
                      )}
                    </div>

                    <div className="bg-slate-900/90 p-4 rounded-2xl border border-emerald-500/20">
                      <p className="text-xs font-bold uppercase text-emerald-400 mb-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Reconstruction Status Today
                      </p>
                      <p className="text-xs text-slate-200 leading-relaxed">{disaster.impact.reconstructionStatus}</p>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl">
                      <p className="text-xs font-bold uppercase text-amber-300 mb-1 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" />
                        Current Safety Advice for Travelers
                      </p>
                      <p className="text-xs text-amber-200 leading-relaxed">{disaster.impact.currentSafetyAdvice}</p>
                    </div>
                  </div>

                  {/* Right Column: Lessons Learned & Active Safeguards */}
                  <div className="space-y-4">
                    <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold uppercase text-sky-400 mb-2">Key Disaster Lessons Learned</p>
                      <ul className="space-y-2">
                        {disaster.lessonsLearned.map((lesson, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-sky-400 mt-0.5">•</span>
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold uppercase text-emerald-400 mb-2">Active Technological Safeguards</p>
                      <div className="space-y-1.5">
                        {disaster.mitigationMeasures.map((measure, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 p-2 rounded-xl border border-slate-800">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{measure}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
