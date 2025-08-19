// src/pages/SubmitEventPage.tsx
import EventForm from '../components/event/EventForm';

const SubmitEventPage = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Submit a New Gathering</h1>
            <div className="p-8 bg-gray-800 rounded-lg shadow-lg">
                <EventForm />
            </div>
        </div>
    );
};

export default SubmitEventPage;