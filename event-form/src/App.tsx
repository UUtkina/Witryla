import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import EventForm from "./Component/EventForm";

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="container mt-5">
                <EventForm />
            </div>
        </div>
    );
};

export default App;
