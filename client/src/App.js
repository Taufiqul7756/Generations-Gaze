import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/login" /> : <Register />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
