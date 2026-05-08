import { model } from "../firebase.config";

export interface TripItinerary {
  destination: string;
  duration: string;
  budgetRange: string;
  days: {
    day: number;
    theme: string;
    activities: {
      time: string;
      activity: string;
      description: string;
      location: string;
      coordinates?: { lat: number; lng: number };
    }[];
  }[];
}

/**
 * Generates a travel itinerary using Vertex AI (Gemini 1.5 Flash).
 * @param destination - The target city or country.
 * @param days - Number of days for the trip.
 * @param budget - The budget level (Economy, Moderate, Luxury).
 * @param interests - List of user interests (e.g., Art, Food, Adventure).
 * @returns A promise resolving to a structured TripItinerary object.
 */
export const generateItinerary = async (
  destination: string,
  days: number,
  budget: string,
  interests: string[]
): Promise<TripItinerary> => {
  const prompt = `
    Generate a detailed travel itinerary for ${destination} for ${days} days.
    Budget: ${budget}. 
    Interests: ${interests.join(", ")}.

    Return the response strictly as a JSON object with the following structure:
    {
      "destination": "string",
      "duration": "string",
      "budgetRange": "string",
      "days": [
        {
          "day": number,
          "theme": "string",
          "activities": [
            {
              "time": "string (e.g. 09:00 AM)",
              "activity": "string",
              "description": "string",
              "location": "string",
              "coordinates": { "lat": number, "lng": number }
            }
          ]
        }
      ]
    }

    Ensure coordinates are realistic for the locations. 
    Only return the JSON. No markdown formatting.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean text in case Gemini adds markdown blocks
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanText) as TripItinerary;
  } catch (error) {
    console.error("Vertex AI generation failed:", error);
    throw error;
  }
};
