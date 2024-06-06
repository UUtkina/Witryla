import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface CategorySelectProps {
    categories: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
    categories,
    onChange,
}) => (
    <div className="mb-3">
        <label htmlFor="categorySelect" className="form-label">
            Categories
        </label>
        <select
            id="categorySelect"
            className="form-select"
            multiple
            value={categories}
            onChange={onChange}
            aria-label="Default select example"
        >
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
        </select>
    </div>
);

export default CategorySelect;
