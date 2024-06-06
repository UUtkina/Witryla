import React from "react";

interface FormErrorProps {
    error: string;
}

const FormError: React.FC<FormErrorProps> = ({ error }) =>
    error ? <div className="text-danger mb-3">{error}</div> : null;

export default FormError;
