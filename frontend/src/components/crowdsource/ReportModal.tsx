'use client';

import React, { useState } from 'react';
import { LocationNode, CrowdStatus, CrowdsourcedReportPayload } from '@/types/location';
import { isWithinGeofence } from '@/lib/geo';
import { X, ShieldCheck, AlertOctagon, CheckCircle2, Navigation, Send } from 'lucide-react';

interface ReportModalProps {
  location: LocationNode | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (payload: CrowdsourcedReportPayload) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  location,
  isOpen,
  onClose,
  onSubmitReport,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<CrowdStatus>('Moderate');
  const [comment, setComment] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen || !location) return null;

  const handleVerifyAndSubmit = () => {
    setIsVerifying(true);
    setValidationError(null);
    setSuccessMessage(null);

    if (!navigator.geolocation) {
      setIsVerifying(false);
      setValidationError('GPS Geolocation service is unavailable on your device.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Geofence check: maximum 3.0 km distance allowed from target location
        const { isValid, distanceKm } = isWithinGeofence(userCoords, location.coordinates, 3.0);

        if (!isValid) {
          setIsVerifying(false);
          setValidationError(
            `GPS Proximity Check Failed: You are ${distanceKm} km away from ${location.name}. Live report verification requires being within 3 km of the node.`
          );
          return;
        }

        // Passed verification!
        const scoreEstimateMap: Record<CrowdStatus, number> = {
          Clear: 20,
          Moderate: 50,
          Heavy: 78,
          Choked: 95,
        };

        const payload: CrowdsourcedReportPayload = {
          locationId: location.id,
          locationName: location.name,
          userCoordinates: userCoords,
          reportedStatus: selectedStatus,
          crowdScoreEstimate: scoreEstimateMap[selectedStatus],
          comment: comment.trim() || undefined,
          timestamp: new Date().toISOString(),
        };

        onSubmitReport(payload);
        setIsVerifying(false);
        setSuccessMessage('GPS Verified! Live status report successfully broadcasted.');

        setTimeout(() => {
          setSuccessMessage(null);
          onClose();
        }, 2000);
      },
      (error) => {
        setIsVerifying(false);
        setValidationError(
          'Location permission denied. GPS verification is mandatory to prevent spoofed crowd reports.'
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-800 p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Live Crowdsourced Report</h3>
              <p className="text-xs text-slate-400">Node: {location.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Verification Requirement Banner */}
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-center gap-2.5">
          <Navigation className="w-4 h-4 text-blue-400 shrink-0" />
          <span>
            GPS verification active: Your live location coordinates will be validated before this report updates the public map.
          </span>
        </div>

        {/* Status Selection Buttons */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Select Current Crowd State:</label>
          <div className="grid grid-cols-2 gap-2">
            {(['Clear', 'Moderate', 'Heavy', 'Choked'] as CrowdStatus[]).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`p-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                  selectedStatus === status
                    ? status === 'Clear'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : status === 'Moderate'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : status === 'Heavy'
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-red-950/60 border-red-700 text-red-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/40'
                }`}
              >
                <span>{status}</span>
                {selectedStatus === status && <CheckCircle2 className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Comment Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Observation Notes (Optional):</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="e.g. Traffic moving smoothly near Darshan entrance; bottleneck near parking block."
            rows={2}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition-all resize-none"
          />
        </div>

        {/* Validation Error Message */}
        {validationError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2">
            <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleVerifyAndSubmit}
          disabled={isVerifying}
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isVerifying ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Verifying GPS Coordinates...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Validate & Broadcast Report</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
