import React from "react";

interface FormTextareaProps {
    label: string;
    id: string;
    name: string;
    value: string;
    error: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
    label,
    id,
    name,
    value,
    error,
    onChange,
}) => (
    <div className="mb-3">
        <label htmlFor={id} className="form-label">
            {label}
        </label>
        <textarea
            className={`form-control ${error ? "is-invalid" : ""}`}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
);

export default FormTextarea;
