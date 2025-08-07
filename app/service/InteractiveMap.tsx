"use client";

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ className = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Coordinates for Mutukanio Village, Njoro Sub-county (approximate)
    const mutukanioCoords: [number, number] = [-0.3167, 35.9333];
    const egartonFuneralHome: [number, number] = [-0.3833, 35.9667];

    // Initialize the map
    const map = L.map(mapRef.current, {
      center: mutukanioCoords,
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      dragging: true,
    });

    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Custom icon for the family home
    const homeIcon = L.divIcon({
      html: `
        <div style="
          background-color: #8b5cf6;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          <div style="
            background-color: white;
            border-radius: 50%;
            width: 8px;
            height: 8px;
          "></div>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    // Custom icon for the funeral home
    const funeralHomeIcon = L.divIcon({
      html: `
        <div style="
          background-color: #f59e0b;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          <div style="
            background-color: white;
            border-radius: 50%;
            width: 8px;
            height: 8px;
          "></div>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    // Add marker for family home
    const homeMarker = L.marker(mutukanioCoords, { icon: homeIcon }).addTo(map);
    homeMarker.bindPopup(`
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #8b5cf6; font-weight: 600; font-size: 16px;">
          🏠 Family Home - Mutukanio Village
        </h3>
        <p style="margin: 0 0 4px 0; color: #374151; font-size: 14px;">
          <strong>Memorial Service:</strong> Friday, August 9th, 2025
        </p>
        <p style="margin: 0 0 4px 0; color: #374151; font-size: 14px;">
          <strong>Time:</strong> 10:45 AM
        </p>
        <p style="margin: 0; color: #6b7280; font-size: 13px;">
          Njoro Sub-county, Nakuru County
        </p>
      </div>
    `);

    // Add marker for funeral home
    const funeralMarker = L.marker(egartonFuneralHome, { icon: funeralHomeIcon }).addTo(map);
    funeralMarker.bindPopup(`
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #f59e0b; font-weight: 600; font-size: 16px;">
          🏥 Egerton University Funeral Home
        </h3>
        <p style="margin: 0 0 4px 0; color: #374151; font-size: 14px;">
          <strong>Departure:</strong> 9:30 AM
        </p>
        <p style="margin: 0; color: #6b7280; font-size: 13px;">
          Njoro, Nakuru County
        </p>
      </div>
    `);

    // Add a route line between the two locations
    const routeLine = L.polyline([egartonFuneralHome, mutukanioCoords], {
      color: '#8b5cf6',
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 5',
    }).addTo(map);

    routeLine.bindPopup(`
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #8b5cf6; font-weight: 600; font-size: 16px;">
          🚗 Cortège Route
        </h3>
        <p style="margin: 0 0 4px 0; color: #374151; font-size: 14px;">
          From Egerton University Funeral Home to Family Home
        </p>
        <p style="margin: 0; color: #6b7280; font-size: 13px;">
          Expected travel time: ~45 minutes
        </p>
      </div>
    `);

    // Fit the map to show both markers
    const group = new L.FeatureGroup([homeMarker, funeralMarker]);
    map.fitBounds(group.getBounds().pad(0.1));

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg"
        style={{ zIndex: 1 }}
      />
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-10 max-w-xs">
        <h4 className="font-semibold text-gray-800 mb-2 text-sm">Service Locations</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full border border-white shadow-sm"></div>
            <span className="text-gray-700">Family Home - Mutukanio Village</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full border border-white shadow-sm"></div>
            <span className="text-gray-700">Egerton University Funeral Home</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-0.5 bg-purple-500 opacity-70" style={{ borderTop: '2px dashed #8b5cf6' }}></div>
            <span className="text-gray-700">Cortège Route</span>
          </div>
        </div>
      </div>

      {/* Map Controls Info */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg z-10">
        <p className="text-xs text-gray-600">
          Click markers for details • Scroll to zoom • Drag to pan
        </p>
      </div>
    </div>
  );
};

export default InteractiveMap;
