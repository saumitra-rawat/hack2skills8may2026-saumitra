import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc, 
  doc, 
  Timestamp 
} from "firebase/firestore";
import { db } from "../firebase.config";
import type { TripItinerary } from "./GeminiService";

export interface SavedTrip extends TripItinerary {
  id: string;
  userId: string;
  createdAt: Timestamp;
}

/**
 * Saves a generated trip itinerary to Firestore.
 * @param userId - The ID of the user who owns the trip.
 * @param trip - The itinerary data to save.
 * @returns The ID of the newly created document.
 */
export const saveTrip = async (userId: string, trip: TripItinerary) => {
  try {
    const docRef = await addDoc(collection(db, "trips"), {
      ...trip,
      userId,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving trip:", error);
    throw error;
  }
};

/**
 * Fetches all trips saved by a specific user.
 * @param userId - The ID of the user whose trips to fetch.
 * @returns A promise resolving to an array of saved trips.
 */
export const getUserTrips = async (userId: string): Promise<SavedTrip[]> => {
  try {
    const q = query(collection(db, "trips"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as SavedTrip[];
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error;
  }
};

/**
 * Deletes a trip itinerary from Firestore.
 * @param tripId - The ID of the trip to delete.
 */
export const deleteTrip = async (tripId: string) => {
  try {
    await deleteDoc(doc(db, "trips", tripId));
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw error;
  }
};
