import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import AuthPage from "./pages/AuthPage";

// Component for protected routes
function ProtectedRoute({ children }) {
  const username = localStorage.getItem("username");
  return username ? children : <Navigate to="/auth" replace />;
}

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white pb-16">
        <Routes>
          {/* Authentication Page */}
          <Route path="/auth" element={username ? <Navigate to={`/${username}/dashboard`} replace /> : <AuthPage setUsername={setUsername} />} />

          {/* Protected Routes (Only accessible after login) */}
          <Route path="/:username/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/:username/community/:id" element={<ProtectedRoute><Community /></ProtectedRoute>} />

          {/* Fallback Route - Redirect to Auth or Dashboard */}
          <Route path="*" element={username ? <Navigate to={`/${username}/dashboard`} replace /> : <Navigate to="/auth" replace />} />
        </Routes>

        {/* Navbar appears only when logged in */}
        {username && <Navbar />}
      </div>
    </BrowserRouter>
  );
}

export default App;
