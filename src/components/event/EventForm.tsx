// src/components/event/EventForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { submitEventForApproval } from '../../services/eventService';
import Input from '../ui/Input';
import Button from '../ui/Button';

const EventForm = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { currentUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            setError('You must be logged in to submit an event.');
            return;
        }

        setError('');
        setMessage('');
        setIsLoading(true);

        try {
            await submitEventForApproval({
                name: eventName,
                date: eventDate,
                location,
                description,
                submittedBy: currentUser.uid,
            });
            setMessage('Event submitted successfully! It is now pending approval.');
            // Optionally clear the form
            setEventName('');
            setEventDate('');
            setLocation('');
            setDescription('');
            // Or redirect after a short delay
            // setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError('Failed to submit event. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="eventName" className="block text-sm font-medium text-gray-300">Gathering Name</label>
                <Input id="eventName" type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-300">Date</label>
                <Input id="eventDate" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300">Location (e.g., City, Country)</label>
                <Input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-400">{message}</p>}
            <Button type="submit" isLoading={isLoading}>Submit for Approval</Button>
        </form>
    );
};

export default EventForm;