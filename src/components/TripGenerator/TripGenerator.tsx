import React, { useState, memo } from 'react';
import { generateItinerary } from '../../services/GeminiService';
import type { TripItinerary } from '../../services/GeminiService';
import { Plane, Calendar, Wallet, Heart, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * TripGenerator component allows users to input their travel preferences
 * and generate a customized AI itinerary.
 */
const TripGenerator: React.FC<{ onTripGenerated: (trip: TripItinerary) => void }> = memo(({ onTripGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    days: 3,
    budget: 'Moderate',
    interests: ''
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const interestsArray = formData.interests.split(',').map(i => i.trim()).filter(i => i !== "");
      const trip = await generateItinerary(
        formData.destination,
        formData.days,
        formData.budget,
        interestsArray
      );
      onTripGenerated(trip);
    } catch {
      alert("Failed to generate itinerary. Ensure your Gemini API Key is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card"
      style={{ maxWidth: '600px', margin: '0 auto' }}
      aria-labelledby="generator-title"
    >
      <h2 id="generator-title" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Plane className="text-primary" aria-hidden="true" /> Start Your Adventure
      </h2>
      
      <form onSubmit={handleGenerate} aria-label="Trip preference form">
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="destination-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
            Destination
          </label>
          <input 
            id="destination-input"
            required
            placeholder="e.g. Paris, Tokyo, Bali"
            value={formData.destination}
            onChange={e => setFormData({ ...formData, destination: e.target.value })}
            aria-required="true"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label htmlFor="days-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
              <Calendar size={14} style={{ marginRight: '4px' }} aria-hidden="true" /> Duration (Days)
            </label>
            <input 
              id="days-input"
              type="number"
              min="1"
              max="14"
              required
              value={formData.days}
              onChange={e => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="budget-select" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
              <Wallet size={14} style={{ marginRight: '4px' }} aria-hidden="true" /> Budget
            </label>
            <select 
              id="budget-select"
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)',
                backgroundColor: 'white'
              }}
              value={formData.budget}
              onChange={e => setFormData({ ...formData, budget: e.target.value })}
            >
              <option value="Economy">Economy</option>
              <option value="Moderate">Moderate</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="interests-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
            <Heart size={14} style={{ marginRight: '4px' }} aria-hidden="true" /> Interests (comma separated)
          </label>
          <input 
            id="interests-input"
            placeholder="e.g. History, Food, Hiking, Art"
            value={formData.interests}
            onChange={e => setFormData({ ...formData, interests: e.target.value })}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '16px' }}
          aria-busy={loading}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Loader2 className="animate-spin" aria-hidden="true" /> Designing your trip...
            </span>
          ) : "Generate Itinerary"}
        </button>
      </form>
    </motion.section>
  );
});

TripGenerator.displayName = 'TripGenerator';

export default TripGenerator;
