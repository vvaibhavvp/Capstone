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
import AdminDashboard from "./components/AdminDashboard";
import CustomerList from "./components/CustomerList.js";
import CustomerCreate from "./components/CustomerCreate.js";
import CustomerEdit from "./components/CustomerEdit.js";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  // const isAdmin = authUser
  const isAdmin = authUser && authUser.role === "Admin"

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
          <Route path="/admin" element={authUser?.role === "Admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<SignupPage />} />

           {/* Admin Routes */}
           <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/admin/customers" element={isAdmin ? <CustomerList /> : <Navigate to="/login" />} />
          <Route path="/admin/customers/create" element={isAdmin ? <CustomerCreate /> : <Navigate to="/login" />} />
          <Route path="/admin/customers/edit/:id" element={isAdmin ? <CustomerEdit /> : <Navigate to="/login" />} />
        </Routes>
        <Footer />
      </Router>
      <Toaster />
    </div>
  );
}

export default App;