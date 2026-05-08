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
import { TripItinerary } from "./GeminiService";

export interface SavedTrip extends TripItinerary {
  id: string;
  userId: string;
  createdAt: Timestamp;
}

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

export const deleteTrip = async (tripId: string) => {
  try {
    await deleteDoc(doc(db, "trips", tripId));
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw error;
  }
};
