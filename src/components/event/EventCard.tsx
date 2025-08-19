// src/components/event/EventCard.tsx
import type { DocumentData } from 'firebase/firestore';
import { Link } from 'react-router-dom';

interface EventCardProps {
    event: DocumentData;
}

const EventCard = ({ event }: EventCardProps) => {
    // A simple function to format the date
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Link to={`/event/${event.id}`} className="block">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full">
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-sky-400 mb-2">{event.name}</h3>
                    <p className="text-gray-300 font-semibold mb-2">{formatDate(event.date)}</p>
                    <p className="text-gray-400 mb-4">{event.location}</p>
                    <p className="text-gray-400 line-clamp-3">{event.description}</p>
                    <div className="text-right mt-4">
                        <span className="text-sky-500 hover:text-sky-400 font-semibold">
                            View Details &rarr;
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;