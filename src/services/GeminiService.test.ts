import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateItinerary } from './GeminiService';

// Mocking the firebase.config
vi.mock('../firebase.config', () => {
  return {
    model: {
      generateContent: vi.fn()
    }
  };
});

import { model } from '../firebase.config';

describe('GeminiService (Vertex AI)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a structured itinerary on success', async () => {
    (model.generateContent as any).mockResolvedValueOnce({
      response: {
        text: () => JSON.stringify({
          destination: "Paris",
          duration: "3 days",
          budgetRange: "Moderate",
          days: []
        })
      }
    });

    const itinerary = await generateItinerary('Paris', 3, 'Moderate', ['Art']);
    expect(itinerary.destination).toBe('Paris');
    expect(itinerary.days).toBeDefined();
  });

  it('should handle malformed JSON from AI', async () => {
    (model.generateContent as any).mockResolvedValueOnce({
      response: {
        text: () => "Invalid JSON"
      }
    });

    await expect(generateItinerary('Paris', 3, 'Moderate', ['Art']))
      .rejects.toThrow();
  });

  it('should handle API errors', async () => {
    (model.generateContent as any).mockRejectedValueOnce(new Error("API Down"));

    await expect(generateItinerary('Paris', 3, 'Moderate', ['Art']))
      .rejects.toThrow("API Down");
  });
});
