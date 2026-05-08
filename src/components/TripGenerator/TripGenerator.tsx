import React, { useState } from 'react';
import { generateItinerary, TripItinerary } from '../../services/GeminiService';
import { Plane, Calendar, Wallet, Heart, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TripGenerator: React.FC<{ onTripGenerated: (trip: TripItinerary) => void }> = ({ onTripGenerated }) => {
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
      const interestsArray = formData.interests.split(',').map(i => i.trim());
      const trip = await generateItinerary(
        formData.destination,
        formData.days,
        formData.budget,
        interestsArray
      );
      onTripGenerated(trip);
    } catch (error) {
      alert("Failed to generate itinerary. Ensure your Gemini API Key is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card"
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Plane className="text-primary" /> Start Your Adventure
      </h2>
      
      <form onSubmit={handleGenerate}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Destination</label>
          <div style={{ position: 'relative' }}>
            <input 
              required
              placeholder="e.g. Paris, Tokyo, Bali"
              value={formData.destination}
              onChange={e => setFormData({ ...formData, destination: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
              <Calendar size={14} style={{ marginRight: '4px' }} /> Duration (Days)
            </label>
            <input 
              type="number"
              min="1"
              max="14"
              value={formData.days}
              onChange={e => setFormData({ ...formData, days: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
              <Wallet size={14} style={{ marginRight: '4px' }} /> Budget
            </label>
            <select 
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
              <option>Budget</option>
              <option>Moderate</option>
              <option>Luxury</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
            <Heart size={14} style={{ marginRight: '4px' }} /> Interests (comma separated)
          </label>
          <input 
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
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Loader2 className="animate-spin" /> Designing your trip...
            </span>
          ) : "Generate Itinerary"}
        </button>
      </form>
    </motion.div>
  );
};

export default TripGenerator;
