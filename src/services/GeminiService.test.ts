import { describe, it, expect, vi } from 'vitest';
import { generateItinerary } from './GeminiService';

// Mocking the generative AI package
vi.mock('@google/generative-ai', () => {
  const GoogleGenerativeAI = vi.fn().mockImplementation(function (this: any) {
    this.getGenerativeModel = vi.fn().mockReturnValue({
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
    });
  });
  return { GoogleGenerativeAI };
});

describe('GeminiService', () => {
  it('should return a structured itinerary', async () => {
    const itinerary = await generateItinerary('Paris', 3, 'Moderate', ['Art']);
    expect(itinerary.destination).toBe('Paris');
    expect(itinerary.days).toBeDefined();
  });
});
