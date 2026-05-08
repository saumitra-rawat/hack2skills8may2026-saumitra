import React from 'react';
import type { TripItinerary } from '../../services/GeminiService';
import { Clock, MapPin, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import Map from '../Map/Map';

const ItineraryDisplay: React.FC<{ trip: TripItinerary }> = ({ trip }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '32px', textAlign: 'center' }}
      >
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Your Trip to {trip.destination}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{trip.duration} adventure tailored for you</p>
      </motion.div>

      <Map trip={trip} />

      {trip.days.map((day, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="card"
          style={{ marginBottom: '24px' }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <CalendarDays className="text-primary" size={24} />
            <h3 style={{ fontSize: '20px' }}>Day {day.day}: {day.theme}</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {day.activities.map((activity, aIdx) => (
              <div key={aIdx} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ minWidth: '80px', color: 'var(--primary)', fontWeight: 600, fontSize: '14px' }}>
                  <Clock size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  {activity.time}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>{activity.activity}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    {activity.description}
                  </p>
                  <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)' }}>
                    <MapPin size={12} /> {activity.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ItineraryDisplay;
