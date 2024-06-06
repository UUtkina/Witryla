import React, { useRef } from "react";

interface Speaker {
    id: number;
    avatar: string;
    firstName: string;
    lastName: string;
    position: string;
}

interface SpeakerFormProps {
    speaker: Speaker;
    index: number;
    onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    onAvatarChange: (index: number, url: string) => void;
    onFileChange: (index: number, file: File) => void;
}

const SpeakerForm: React.FC<SpeakerFormProps> = ({
    speaker,
    index,
    onChange,
    onAvatarChange,
    onFileChange,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            onFileChange(index, file);
        }
    };

    return (
        <div className="mb-3">
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Avatar URL"
                name="avatar"
                value={speaker.avatar}
                onChange={(e) => onAvatarChange(index, e.target.value)}
            />
            <input
                type="file"
                className="form-control mb-2"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <input
                type="text"
                className="form-control mb-2"
                placeholder="First Name"
                name="firstName"
                value={speaker.firstName}
                onChange={(e) => onChange(index, e)}
            />
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Last Name"
                name="lastName"
                value={speaker.lastName}
                onChange={(e) => onChange(index, e)}
            />
            <input
                type="text"
                className="form-control"
                placeholder="Position"
                name="position"
                value={speaker.position}
                onChange={(e) => onChange(index, e)}
            />
        </div>
    );
};

export default SpeakerForm;
