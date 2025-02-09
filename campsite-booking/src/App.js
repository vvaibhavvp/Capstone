import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { Toaster } from "react-hot-toast";
import Camps from "./components/Camps";
import { useAuth } from "./context/AuthProvider.js";
import Logout from "./components/Logout.js";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/camps" element={<Camps />} /> */}
        <Route
            path="/camps"
            element={authUser ? <Camps /> : <Navigate to="/login" />}
          />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
    <Toaster />
    </div>
  );
}

export default App;