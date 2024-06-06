import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CategorySelect from "../Component/CategorySelect";
import SpeakerList from "../Component/SpeakerList";
import FormInput from "../Component/componentsForm/FormInput";
import FormTextarea from "../Component/componentsForm/FormTextarea";
import FormDateInput from "../Component/componentsForm/FormDateInput";
import FormError from "../Component/componentsForm/FormError";

interface Speaker {
    id: number;
    avatar: string;
    firstName: string;
    lastName: string;
    position: string;
}

const EventForm: React.FC = () => {
    const [formState, setFormState] = useState({
        title: "",
        description: "",
        startDate: "",
        speakers: [] as Speaker[],
        categories: [] as string[],
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        startDate: "",
        categories: "",
        speakers: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = e.target.options;
        const selectedCategories: string[] = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedCategories.push(options[i].value);
            }
        }
        setFormState({
            ...formState,
            categories: selectedCategories,
        });
        setErrors({
            ...errors,
            categories: "",
        });
    };

    const handleSpeakerChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const updatedSpeakers = formState.speakers.map((speaker, i) =>
            i === index ? { ...speaker, [name]: value } : speaker
        );
        setFormState({
            ...formState,
            speakers: updatedSpeakers,
        });
        setErrors({
            ...errors,
            speakers: "",
        });
    };

    const handleAvatarChange = (index: number, url: string) => {
        const updatedSpeakers = formState.speakers.map((speaker, i) =>
            i === index ? { ...speaker, avatar: url } : speaker
        );
        setFormState({
            ...formState,
            speakers: updatedSpeakers,
        });
        setErrors({
            ...errors,
            speakers: "",
        });
    };

    const handleFileChange = (index: number, file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const url = e.target?.result as string;
            handleAvatarChange(index, url);
        };
        reader.readAsDataURL(file);
    };

    const handleAddSpeaker = () => {
        setFormState({
            ...formState,
            speakers: [
                ...formState.speakers,
                {
                    id: Date.now(),
                    avatar: "",
                    firstName: "",
                    lastName: "",
                    position: "",
                },
            ],
        });
        setErrors({
            ...errors,
            speakers: "",
        });
    };

    const validateForm = () => {
        const today = new Date().toISOString().split("T")[0];
        let valid = true;
        const newErrors = {
            title: "",
            description: "",
            startDate: "",
            categories: "",
            speakers: "",
        };

        if (formState.title.trim() === "") {
            newErrors.title = "Title is required.";
            valid = false;
        }
        if (formState.description.trim() === "") {
            newErrors.description = "Description is required.";
            valid = false;
        }
        if (formState.startDate.trim() === "") {
            newErrors.startDate = "Start date is required.";
            valid = false;
        } else if (formState.startDate < today) {
            newErrors.startDate = "Start date cannot be earlier than today.";
            valid = false;
        }
        if (formState.categories.length === 0) {
            newErrors.categories = "At least one category is required.";
            valid = false;
        }
        if (formState.speakers.length === 0) {
            newErrors.speakers = "At least one speaker is required.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const submitForm = async () => {
        try {
            console.log("Submitting form:", formState);
            const response = await axios.post(
                "http://localhost:5000/api/events/add",
                formState
            );
            console.log("Form submitted:", response.data);
            // Очистка формы
            setFormState({
                title: "",
                description: "",
                startDate: "",
                speakers: [],
                categories: [],
            });
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    };

    return (
        <div>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Title"
                    id="title"
                    name="title"
                    value={formState.title}
                    error={errors.title}
                    onChange={handleChange}
                />
                <FormTextarea
                    label="Description"
                    id="description"
                    name="description"
                    value={formState.description}
                    error={errors.description}
                    onChange={handleChange}
                />
                <FormDateInput
                    label="Start Date"
                    id="startDate"
                    name="startDate"
                    value={formState.startDate}
                    error={errors.startDate}
                    onChange={handleChange}
                />
                <CategorySelect
                    categories={formState.categories}
                    onChange={handleCategoryChange}
                />
                <FormError error={errors.categories} />
                <SpeakerList
                    speakers={formState.speakers}
                    onAddSpeaker={handleAddSpeaker}
                    onSpeakerChange={handleSpeakerChange}
                    onAvatarChange={handleAvatarChange}
                    onFileChange={handleFileChange}
                />
                <FormError error={errors.speakers} />
                <button type="submit" className="btn btn-primary">
                    Create Event
                </button>
            </form>

            <div className="mt-5">
                <h2>Current Speakers</h2>
                <ul className="list-group">
                    {formState.speakers.map((speaker) => (
                        <li key={speaker.id} className="list-group-item">
                            <img
                                src={speaker.avatar}
                                alt="Avatar"
                                width="50"
                                height="50"
                                className="me-3"
                            />
                            {speaker.firstName} {speaker.lastName} -{" "}
                            {speaker.position}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EventForm;
