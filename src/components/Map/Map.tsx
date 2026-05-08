/// <reference types="@types/google.maps" />
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import type { TripItinerary } from '../../services/GeminiService';

const Map: React.FC<{ trip: TripItinerary }> = ({ trip }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    const initMap = async () => {
      try {
        const { Map } = await (loader as any).importLibrary('maps');
        const { AdvancedMarkerElement } = await (loader as any).importLibrary('marker');
        
        if (!mapRef.current) return;

        const firstActivity = trip.days[0].activities[0];
        const initialCenter = firstActivity.coordinates || { lat: 0, lng: 0 };

        const map = new Map(mapRef.current, {
          center: initialCenter,
          zoom: 12,
          mapId: 'DEMO_MAP_ID',
        });

        const bounds = new google.maps.LatLngBounds();

        trip.days.forEach(day => {
          day.activities.forEach(activity => {
            if (activity.coordinates) {
              new AdvancedMarkerElement({
                map,
                position: activity.coordinates,
                title: activity.activity,
              });
              bounds.extend(activity.coordinates);
            }
          });
        });

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds);
        }
      } catch (error) {
        console.error("Map initialization failed", error);
      }
    };

    initMap();
  }, [trip]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '400px', 
        borderRadius: '12px', 
        marginBottom: '24px',
        border: '1px solid var(--border-color)'
      }} 
    />
  );
};

export default Map;
