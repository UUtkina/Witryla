import React from "react";

interface FormDateInputProps {
    label: string;
    id: string;
    name: string;
    value: string;
    error: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormDateInput: React.FC<FormDateInputProps> = ({
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
            type="date"
            className={`form-control ${error ? "is-invalid" : ""}`}
            id={id}
            name={name}
            value={value}
            min={new Date().toISOString().split("T")[0]}
            onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
);

export default FormDateInput;
