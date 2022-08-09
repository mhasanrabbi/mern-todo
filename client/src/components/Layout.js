import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import AuthBox from "./AuthBox";

const Layout = () => {
  return (
    <Router>
      {/* ADD HEADER */}
      <Header />
      <Routes>
        <Route exact path="/" element={<AuthBox />} />
        <Route path="/register" element={<AuthBox register />} />
      </Routes>
    </Router>
  );
};

export default Layout;
