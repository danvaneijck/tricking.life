import { useState, useEffect } from 'react';
import { getPendingEvents, approveEvent } from '../../services/eventService';
import type { DocumentData } from 'firebase/firestore';
import Button from '../../components/ui/Button';

const DashboardPage = () => {
    const [pendingEvents, setPendingEvents] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPendingEvents = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getPendingEvents();
            const events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPendingEvents(events);
        } catch (err) {
            setError('Failed to fetch pending events.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingEvents();
    }, []);

    const handleApprove = async (eventId: string) => {
        try {
            await approveEvent(eventId);
            // Refresh the list by removing the approved event from the state
            setPendingEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        } catch (err) {
            setError('Failed to approve event.');
        }
    };

    if (loading) return <div className="text-center">Loading pending events...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <h2 className="text-2xl font-semibold mb-4">Pending Event Approvals</h2>
            {pendingEvents.length === 0 ? (
                <p>No events are currently pending approval.</p>
            ) : (
                <div className="space-y-4">
                    {pendingEvents.map(event => (
                        <div key={event.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold">{event.name}</h3>
                                <p className="text-gray-400">{event.location} - {event.date}</p>
                            </div>
                            <Button onClick={() => handleApprove(event.id)} className="w-auto">
                                Approve
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;