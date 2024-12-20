import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import UserLogin from "./pages/user/UserLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import UserSignUp from "./pages/user/UserSignUp";
import AdminSignUp from "./pages/admin/AdminSignUp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminsignup" element={<AdminSignUp />} />
          <Route path="/usersignup" element={<UserSignUp />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
