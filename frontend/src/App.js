// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup setAuth={setIsAuthenticated} />} />
            <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
            <Route
                path="/dashboard"
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            />
        </Routes>
    );
}

export default App;
