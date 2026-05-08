import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveTrip, getUserTrips, deleteTrip } from './FirestoreService';
import { addDoc, getDocs, deleteDoc } from 'firebase/firestore';

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  Timestamp: {
    now: () => ({ toMillis: () => 1000 })
  }
}));

vi.mock('../firebase.config', () => ({
  db: {}
}));

describe('FirestoreService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should save a trip successfully', async () => {
    (addDoc as any).mockResolvedValueOnce({ id: 'trip123' });
    const id = await saveTrip('user1', { destination: 'Paris' } as any);
    expect(id).toBe('trip123');
    expect(addDoc).toHaveBeenCalled();
  });

  it('should fetch user trips', async () => {
    (getDocs as any).mockResolvedValueOnce({
      docs: [
        { id: '1', data: () => ({ destination: 'London' }) }
      ]
    });
    const trips = await getUserTrips('user1');
    expect(trips).toHaveLength(1);
    expect(trips[0].destination).toBe('London');
  });

  it('should delete a trip', async () => {
    (deleteDoc as any).mockResolvedValueOnce(undefined);
    await deleteTrip('trip123');
    expect(deleteDoc).toHaveBeenCalled();
  });
});
