import React from "react";

interface EventDetailsProps {
    title: string;
    description: string;
    startDate: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({
    title,
    description,
    startDate,
    onChange,
}) => (
    <div>
        <div>
            <label>Event Title</label>
            <input
                type="text"
                name="title"
                value={title}
                onChange={onChange}
                required
            />
        </div>
        <div>
            <label>Description</label>
            <textarea
                name="description"
                value={description}
                onChange={onChange}
                required
            />
        </div>
        <div>
            <label>Start Date</label>
            <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={onChange}
                required
            />
        </div>
    </div>
);

export default EventDetails;
export {};
