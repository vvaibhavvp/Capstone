import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { Toaster } from "react-hot-toast";
import Camps from "./components/Camps";
import { useAuth } from "./context/AuthProvider.js";
import Logout from "./components/Logout.js";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/footer";
import ForgotPasswordPage from "./components/ForgotPasswordPage.js";
import ResetPasswordPage from "./components/ResetPasswordPage.js";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <div>
      <Router>
        <Header />
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
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Routes>
        <Footer />
      </Router>
      <Toaster />
    </div>
  );
}

export default App;