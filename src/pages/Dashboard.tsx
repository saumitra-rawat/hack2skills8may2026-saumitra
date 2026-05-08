import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/useAuth';
import { getUserTrips, saveTrip, deleteTrip } from '../services/FirestoreService';
import type { SavedTrip } from '../services/FirestoreService';
import type { TripItinerary } from '../services/GeminiService';
import TripGenerator from '../components/TripGenerator/TripGenerator';
import ItineraryDisplay from '../components/TripGenerator/ItineraryDisplay';
import { LogOut, Plus, History, Trash2, Map as MapIcon, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<TripItinerary | null>(null);
  const [view, setView] = useState<'home' | 'generate' | 'itinerary'>('home');
  const [loading, setLoading] = useState(true);

  const fetchTrips = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getUserTrips(user.uid);
      setTrips(data.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) fetchTrips();
  }, [user, fetchTrips]);

  const handleTripGenerated = async (trip: TripItinerary) => {
    setCurrentTrip(trip);
    setView('itinerary');
    try {
      await saveTrip(user!.uid, trip);
      fetchTrips();
    } catch (error) {
      console.error("Auto-save failed", error);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Delete this trip?")) {
      await deleteTrip(id);
      fetchTrips();
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Navbar */}
      <nav className="glass" style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        padding: '12px 24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid var(--border-color)'
      }} aria-label="Main Navigation">
        <div 
          role="button"
          tabIndex={0}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} 
          onClick={() => setView('home')}
          onKeyDown={(e) => e.key === 'Enter' && setView('home')}
          aria-label="Go to Home"
        >
          <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '6px', borderRadius: '8px' }} aria-hidden="true">
            <MapIcon size={20} />
          </div>
          <h2 style={{ fontSize: '18px' }}>Wanderlust AI</h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={user?.photoURL || ''} 
              alt={user?.displayName || "User profile"} 
              style={{ width: '32px', height: '32px', borderRadius: '50%' }}
              loading="lazy"
            />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>{user?.displayName}</span>
          </div>
          <button 
            onClick={logout} 
            aria-label="Log out of application"
            style={{ background: 'none', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}
          >
            <LogOut size={16} aria-hidden="true" /> Logout
          </button>
        </div>
      </nav>

      <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="region"
              aria-labelledby="dashboard-title"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                  <h1 id="dashboard-title" style={{ fontSize: '28px', marginBottom: '4px' }}>My Adventures</h1>
                  <p style={{ color: 'var(--text-secondary)' }}>Your saved AI-powered itineraries</p>
                </div>
                <button 
                  onClick={() => setView('generate')}
                  className="btn-primary" 
                  aria-label="Plan a new travel itinerary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Plus size={20} aria-hidden="true" /> Plan New Trip
                </button>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }} aria-live="polite">Loading trips...</div>
              ) : trips.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '60px' }} role="status">
                  <History size={48} style={{ color: 'var(--border-color)', marginBottom: '16px' }} aria-hidden="true" />
                  <h3>No trips found</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>You haven't planned any adventures yet.</p>
                  <button onClick={() => setView('generate')} className="btn-primary" aria-label="Create your first trip now">Create Your First Trip</button>
                </div>
              ) : (
                <div 
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}
                  role="list"
                  aria-label="List of saved trips"
                >
                  {trips.map(trip => (
                    <motion.div 
                      key={trip.id}
                      whileHover={{ y: -5 }}
                      className="card"
                      role="listitem"
                      tabIndex={0}
                      onClick={() => {
                        setCurrentTrip(trip);
                        setView('itinerary');
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && (setCurrentTrip(trip), setView('itinerary'))}
                      style={{ cursor: 'pointer', position: 'relative' }}
                      aria-label={`View itinerary for ${trip.destination}`}
                    >
                      <h3 style={{ marginBottom: '8px' }}>{trip.destination}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        {trip.duration} trip
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 500 }} aria-hidden="true">
                          View Itinerary
                        </span>
                        <button 
                          onClick={(e) => handleDelete(trip.id, e)}
                          aria-label={`Delete trip to ${trip.destination}`}
                          style={{ background: 'none', color: 'var(--error)', padding: '4px' }}
                        >
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {view === 'generate' && (
            <motion.div 
              key="generate"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button 
                onClick={() => setView('home')}
                aria-label="Return to your saved trips"
                style={{ background: 'none', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px', color: 'var(--text-secondary)' }}
              >
                <ChevronLeft size={16} aria-hidden="true" /> Back to My Trips
              </button>
              <TripGenerator onTripGenerated={handleTripGenerated} />
            </motion.div>
          )}

          {view === 'itinerary' && currentTrip && (
            <motion.div 
              key="itinerary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button 
                onClick={() => setView('home')}
                aria-label="Return to your saved trips"
                style={{ background: 'none', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px', color: 'var(--text-secondary)' }}
              >
                <ChevronLeft size={16} aria-hidden="true" /> Back to My Trips
              </button>
              <ItineraryDisplay trip={currentTrip} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
