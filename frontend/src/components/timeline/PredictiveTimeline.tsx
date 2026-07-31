'use client';

import React from 'react';
import { TimelinePoint } from '@/types/location';
import { Info, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PredictiveTimelineProps {
  forecast: TimelinePoint[];
}

export const PredictiveTimeline: React.FC<PredictiveTimelineProps> = ({ forecast }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Clear':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Moderate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Heavy':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'Choked':
        return 'bg-red-950/60 text-red-300 border-red-700/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getBarColor = (score: number) => {
    if (score <= 35) return 'from-emerald-500 to-teal-400';
    if (score <= 70) return 'from-amber-500 to-yellow-400';
    if (score <= 85) return 'from-red-500 to-amber-600';
    return 'from-red-700 to-red-900';
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-6">
      {/* Header & Disclaimer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100">7-Day Density Forecast</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800 font-medium">
            Heuristic Baseline Model (v1.0)
          </span>
        </div>

        {/* Explicit Non-ML MVP Disclaimer Banner */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-200">MVP Heuristic Prediction Notice</p>
            <p className="text-amber-300/80 leading-relaxed mt-0.5">
              These 7-day crowd forecasts are calculated from historical Chardham registration volumes, public holiday calendars, and seasonal Yatra influx heuristics. <strong className="text-amber-200">No machine learning model is deployed in this MVP stage.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Bars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {forecast.map((item, idx) => (
          <div
            key={idx}
            className="glass-card p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-400">{item.dayName}</span>
                <span className="text-[10px] text-slate-500">{item.date.slice(5)}</span>
              </div>
              <div className="text-xl font-extrabold text-slate-100 my-2 flex items-baseline gap-1">
                {item.predictedScore}
                <span className="text-xs font-normal text-slate-500">/100</span>
              </div>
            </div>

            {/* Score Bar */}
            <div className="w-full bg-slate-800/80 rounded-full h-2 my-2 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getBarColor(item.predictedScore)} transition-all duration-500`}
                style={{ width: `${item.predictedScore}%` }}
              />
            </div>

            <div className="mt-2 space-y-2">
              <span
                className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getStatusBadge(
                  item.status
                )}`}
              >
                {item.status}
              </span>
              <p className="text-[11px] text-slate-400 line-clamp-3 leading-snug group-hover:text-slate-300 transition-colors">
                {item.heuristicNote}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
