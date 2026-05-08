import { describe, it, expect, vi } from 'vitest';
import { generateItinerary } from './GeminiService';

// Mocking the firebase.config
vi.mock('../firebase.config', () => {
  return {
    model: {
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => JSON.stringify({
            destination: "Paris",
            duration: "3 days",
            budgetRange: "Moderate",
            days: []
          })
        }
      })
    }
  };
});

describe('GeminiService (Vertex AI)', () => {
  it('should return a structured itinerary', async () => {
    const itinerary = await generateItinerary('Paris', 3, 'Moderate', ['Art']);
    expect(itinerary.destination).toBe('Paris');
    expect(itinerary.days).toBeDefined();
  });
});
