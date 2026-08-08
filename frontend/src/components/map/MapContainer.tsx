'use client';

import React, { useEffect, useRef } from 'react';
import { LocationNode, LocationCoordinates, CrowdStatus } from '@/types/location';

interface MapContainerProps {
  locations: LocationNode[];
  selectedLocation: LocationNode | null;
  onSelectLocation: (node: LocationNode) => void;
  userCoords: LocationCoordinates | null;
  radiusKm: number;
  onOpenReportModal: (location: LocationNode) => void;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  userCoords,
  radiusKm,
  onOpenReportModal,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const radiusCircleRef = useRef<L.Circle | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Helper to color-code markers by crowd status
  const getStatusColor = (status: CrowdStatus): { bg: string; border: string } => {
    switch (status) {
      case 'Clear':
        return { bg: '#10b981', border: '#059669' };
      case 'Moderate':
        return { bg: '#f59e0b', border: '#d97706' };
      case 'Heavy':
        return { bg: '#ef4444', border: '#dc2626' };
      case 'Choked':
        return { bg: '#991b1b', border: '#7f1d1d' };
      default:
        return { bg: '#6b7280', border: '#4b5563' };
    }
  };

  useEffect(() => {
    const container = mapRef.current;
    if (typeof window === 'undefined' || !container) return;

    // Dynamically import Leaflet on client side
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!leafletMapRef.current) {
        // Center on Uttarakhand (~ 30.15, 78.85)
        const map = L.map(container, {
          center: [30.15, 78.85],
          zoom: 8,
          zoomControl: true,
        });

        // Dark-mode Mapbox / CartoDB dark matter tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }).addTo(map);

        leafletMapRef.current = map;
      }

      const map = leafletMapRef.current;

      // Update Node Markers
      locations.forEach((node) => {
        const { bg, border } = getStatusColor(node.crowdStatus);
        const isSelected = selectedLocation?.id === node.id;
        const isChoked = node.crowdStatus === 'Choked';
        const isGarhwal = node.division === 'Garhwal';

        const customIcon = L.divIcon({
          className: 'custom-crowd-marker',
          html: `
            <div style="
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              width: ${isSelected ? '36px' : '28px'};
              height: ${isSelected ? '36px' : '28px'};
              background-color: ${bg};
              border: 3px solid ${isSelected ? '#ffffff' : isGarhwal ? '#10b981' : '#06b6d4'};
              border-radius: 50%;
              box-shadow: 0 0 ${isChoked ? '16px' : '8px'} ${bg};
              cursor: pointer;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            ">
              <span style="color: white; font-weight: 800; font-size: ${
                isSelected ? '12px' : '10px'
              }; font-family: system-ui;">
                ${node.currentCrowdScore}
              </span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        if (markersRef.current[node.id]) {
          markersRef.current[node.id].setLatLng([node.coordinates.lat, node.coordinates.lng]);
          markersRef.current[node.id].setIcon(customIcon);
        } else {
          const marker = L.marker([node.coordinates.lat, node.coordinates.lng], {
            icon: customIcon,
          }).addTo(map);

          marker.on('click', () => {
            onSelectLocation(node);
          });

          markersRef.current[node.id] = marker;
        }

        // Enhanced Rich Popup Content
        const popupHtml = `
          <div style="min-width: 220px; max-width: 260px; padding: 2px; font-family: system-ui;">
            <div style="width: 100%; height: 100px; border-radius: 8px; overflow: hidden; margin-bottom: 8px; position: relative; background: #0f172a;">
              <img src="${node.imageUrl}" alt="${node.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'" />
              <div style="position: absolute; top: 6px; left: 6px; background: rgba(15, 23, 42, 0.85); color: ${isGarhwal ? '#6ee7b7' : '#67e8f9'}; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 800; border: 1px solid rgba(255,255,255,0.1);">
                ${node.division} Division
              </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
              <h3 style="margin: 0; font-size: 13px; font-weight: 800; color: #f8fafc;">${node.name}</h3>
              <span style="font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: ${bg}; color: #ffffff;">
                ${node.crowdStatus}
              </span>
            </div>

            <p style="margin: 0 0 6px 0; font-size: 11px; color: #94a3b8;">📍 ${node.district} • ${node.category}</p>

            <div style="background: rgba(15, 23, 42, 0.9); padding: 6px 8px; border-radius: 6px; margin-bottom: 8px; border: 1px solid rgba(51, 65, 85, 0.8);">
              <div style="display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 3px;">
                <span style="color: #94a3b8;">Crowd Density:</span>
                <span style="font-weight: 800; color: ${bg};">${node.currentCrowdScore} / 100</span>
              </div>
              <div style="width: 100%; height: 5px; background: #334155; border-radius: 3px; overflow: hidden;">
                <div style="width: ${node.currentCrowdScore}%; height: 100%; background: ${bg}; border-radius: 3px;"></div>
              </div>
            </div>

            <button 
              id="report-btn-${node.id}"
              style="width: 100%; padding: 6px; background: #10b981; color: #022c22; border: none; border-radius: 6px; font-size: 11px; font-weight: 800; cursor: pointer; transition: background 0.2s;"
            >
              ⚡ Verify Live Status
            </button>
          </div>
        `;

        const marker = markersRef.current[node.id];
        marker.bindPopup(popupHtml);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`report-btn-${node.id}`);
          if (btn) {
            btn.onclick = () => onOpenReportModal(node);
          }
        });
      });

      // Render User GPS Location & Search Radius Circle if active
      if (userCoords) {
        if (!userMarkerRef.current) {
          const userIcon = L.divIcon({
            className: 'user-gps-marker',
            html: `
              <div style="
                width: 18px;
                height: 18px;
                background-color: #3b82f6;
                border: 3px solid #ffffff;
                border-radius: 50%;
                box-shadow: 0 0 12px #3b82f6;
              "></div>
            `,
            iconSize: [18, 18],
            iconAnchor: [9, 9],
          });

          userMarkerRef.current = L.marker([userCoords.lat, userCoords.lng], {
            icon: userIcon,
          }).addTo(map);

          userMarkerRef.current.bindTooltip('Your Location', { permanent: false });
        } else {
          userMarkerRef.current.setLatLng([userCoords.lat, userCoords.lng]);
        }

        // Radius circle
        if (radiusKm > 0) {
          if (!radiusCircleRef.current) {
            radiusCircleRef.current = L.circle([userCoords.lat, userCoords.lng], {
              radius: radiusKm * 1000,
              color: '#3b82f6',
              fillColor: '#3b82f6',
              fillOpacity: 0.12,
              weight: 1.5,
              dashArray: '4, 6',
            }).addTo(map);
          } else {
            radiusCircleRef.current.setLatLng([userCoords.lat, userCoords.lng]);
            radiusCircleRef.current.setRadius(radiusKm * 1000);
          }
        }
      }
    });
  }, [locations, selectedLocation, userCoords, radiusKm]);

  // Center map on selected location node when clicked from sidebar or places grid
  useEffect(() => {
    if (selectedLocation && leafletMapRef.current) {
      leafletMapRef.current.flyTo(
        [selectedLocation.coordinates.lat, selectedLocation.coordinates.lng],
        11,
        { duration: 1.2 }
      );

      const marker = markersRef.current[selectedLocation.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedLocation]);

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-2xl">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 z-[400] glass-panel px-3 py-2 rounded-2xl text-xs flex flex-wrap items-center gap-3 border border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <span className="font-bold text-slate-300">Division Key:</span>
        <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Garhwal
        </div>
        <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Kumaon
        </div>
      </div>
    </div>
  );
};
