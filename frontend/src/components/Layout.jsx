import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Outlet /> {/* This renders the page content */}
      <Footer />
    </div>
  );
};

export default Layout;
