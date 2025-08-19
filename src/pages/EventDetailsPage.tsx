// src/pages/EventDetailPage.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { type DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { getEventById } from '../services/eventService';
import Spinner from '../components/ui/Spinner';

const EventDetailPage = () => {
    const { eventId } = useParams<{ eventId: string }>(); // Get eventId from URL
    const [event, setEvent] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventId) {
                setError('No event ID provided.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const docSnap: DocumentSnapshot<DocumentData> = await getEventById(eventId);

                if (docSnap.exists()) {
                    // Also check if the event is approved before showing it
                    const eventData = docSnap.data();
                    if (eventData.status === 'approved') {
                        setEvent(eventData);
                    } else {
                        setError('This event is not available.');
                    }
                } else {
                    setError('Event not found.');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="flex justify-center mt-16">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500 mt-8 text-xl">{error}</p>;
    }

    if (!event) {
        return null; // Should not happen if error handling is correct, but good practice
    }

    return (
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-sky-400 mb-4">{event.name}</h1>

            <div className="text-lg text-gray-300 mb-6 border-b border-gray-700 pb-4">
                <p><span className="font-bold">Date:</span> {formatDate(event.date)}</p>
                <p><span className="font-bold">Location:</span> {event.location}</p>
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
                <p>{event.description}</p>
            </div>

            {/* Placeholder for a map */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Location Map</h2>
                <div className="w-full h-64 bg-gray-700 rounded-md flex items-center justify-center">
                    <p className="text-gray-400">[Map integration would go here]</p>
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;