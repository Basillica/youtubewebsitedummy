// @ts-nocheck
import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { RootPage } from "./models/root";

const App = () => {
    const [state, setState] = useState("HOME");
    return (
        <>
            <Navbar setState={setState} />
            <Routes>
                <Route index element={<RootPage state={state} setState={setState} />} />
            </Routes>
        </>
    );
};

export default App;
