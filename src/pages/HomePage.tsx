// src/pages/HomePage.tsx
import { useState, useEffect } from 'react';
import type { DocumentData } from 'firebase/firestore';
import { getApprovedEvents } from '../services/eventService';
import EventList from '../components/event/EventList';
import Spinner from '../components/ui/Spinner';

const HomePage = () => {
    const [events, setEvents] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getApprovedEvents();
                const approvedEvents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEvents(approvedEvents);
            } catch (err) {
                console.error(err);
                setError('Failed to load events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center mt-16">
                    <Spinner />
                </div>
            );
        }

        if (error) {
            return <p className="text-center text-red-500 mt-8">{error}</p>;
        }

        if (events.length === 0) {
            return <p className="text-center text-gray-400 mt-8">No upcoming gatherings found. Check back soon!</p>;
        }

        return <EventList events={events} />;
    };

    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">Upcoming Tricking Gatherings</h1>
                <p className="text-lg text-gray-400">Find and share tricking events around the world.</p>
            </div>
            {renderContent()}
        </div>
    );
};

export default HomePage;