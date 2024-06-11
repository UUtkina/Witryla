import React from "react";

interface FormInputProps {
    label: string;
    id: string;
    name: string;
    value: string;
    error: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
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
        <input
            type="text"
            className={`form-control ${error ? "is-invalid" : ""}`}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
);

export default FormInput;
