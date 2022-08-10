import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import AuthBox from "./AuthBox";
import { useGlobalContext } from "../context/GlobalContext";
import Dashboard from "./Dashboard";

const Layout = () => {
  const { fetchingUser } = useGlobalContext();

  return fetchingUser ? (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  ) : (
    <Router>
      {/* ADD HEADER */}
      <Header />
      <Routes>
        <Route exact path="/" element={<AuthBox />} />
        <Route path="/register" element={<AuthBox register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default Layout;
