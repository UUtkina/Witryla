import React from "react";
import SpeakerForm from "./SpeakerForm";

interface Speaker {
    id: number;
    avatar: string;
    firstName: string;
    lastName: string;
    position: string;
}

interface SpeakerListProps {
    speakers: Speaker[];
    onAddSpeaker: () => void;
    onSpeakerChange: (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    onAvatarChange: (index: number, url: string) => void;
    onFileChange: (index: number, file: File) => void;
}

const SpeakerList: React.FC<SpeakerListProps> = ({
    speakers,
    onAddSpeaker,
    onSpeakerChange,
    onAvatarChange,
    onFileChange,
}) => (
    <div>
        <div>
            <label>Speakers</label>
            {speakers.map((speaker, index) => (
                <SpeakerForm
                    key={speaker.id}
                    speaker={speaker}
                    index={index}
                    onChange={onSpeakerChange}
                    onAvatarChange={onAvatarChange}
                    onFileChange={onFileChange}
                />
            ))}
        </div>
        <div>
            <button
                type="button"
                onClick={onAddSpeaker}
                className="btn btn-secondary mb-3"
            >
                Add Speaker
            </button>
        </div>
    </div>
);

export default SpeakerList;
export {};
