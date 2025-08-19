// src/services/eventService.ts
import {
    collection,
    addDoc,
    getDoc,
    serverTimestamp,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

// Define a type for our event data for type safety
interface EventData {
    name: string;
    date: string;
    location: string;
    description: string;
    submittedBy: string; // User's UID
}

export const submitEventForApproval = (eventData: EventData) => {
    const eventCollectionRef = collection(db, "events");
    return addDoc(eventCollectionRef, {
        ...eventData,
        status: "pending", // Add the initial approval status
        createdAt: serverTimestamp(), // Add a creation timestamp
    });
};

export const getPendingEvents = () => {
    const eventsCollectionRef = collection(db, "events");
    const q = query(eventsCollectionRef, where("status", "==", "pending"));
    return getDocs(q);
};

// New function to approve an event
export const approveEvent = (eventId: string) => {
    const eventDocRef = doc(db, "events", eventId);
    return updateDoc(eventDocRef, {
        status: "approved",
    });
};

export const getApprovedEvents = () => {
    const eventsCollectionRef = collection(db, "events");
    // Create a query that filters by status and orders by the event date
    const q = query(
        eventsCollectionRef,
        where("status", "==", "approved"),
        orderBy("date", "asc") // Show upcoming events first
    );
    return getDocs(q);
};

export const getEventById = (eventId: string) => {
    const eventDocRef = doc(db, "events", eventId);
    return getDoc(eventDocRef);
};
