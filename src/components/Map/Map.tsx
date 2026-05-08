import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { TripItinerary } from '../../services/GeminiService';

const Map: React.FC<{ trip: TripItinerary }> = ({ trip }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(async (google) => {
      if (!mapRef.current) return;

      const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

      // Get first activity coordinates for initial center
      const firstActivity = trip.days[0].activities[0];
      const initialCenter = firstActivity.coordinates || { lat: 0, lng: 0 };

      const map = new Map(mapRef.current, {
        center: initialCenter,
        zoom: 12,
        mapId: 'DEMO_MAP_ID', // Replace with your Map ID if needed
      });

      // Add markers for all activities
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

      // Fit map to bounds
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
    });
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
