import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 1️⃣ Landing Page
  if (location.pathname === "/") return null;

  // 2️⃣ Login or Signup
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return (
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">
          🌍 <a style={{ color: "inherit", textDecoration: "none" }} href="/">TravelDestiny</a>
        </span>
        <div className="ms-auto">
          {location.pathname === "/login" ? (
            <a href="/signup" className="btn btn-outline-light">Signup</a>
          ) : (
            <a href="/login" className="btn btn-outline-light">Login</a>
          )}
        </div>
      </nav>
    );
  }

  // 3️⃣ Authenticated pages (except site view)
  const isSiteView = location.pathname.startsWith("/destination/");
  return (
    <nav className="navbar bg-dark px-4">
      <span className="navbar-brand mb-0 h1 text-white">🌍 TravelDestiny</span>

      {user && !isSiteView && (
        <>
          {typeof searchQuery !== "undefined" && typeof setSearchQuery === "function" && (
            <div className="d-flex align-items-center w-50">
              <input
                type="text"
                className="form-control"
                placeholder="Search destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={() => setSearchQuery("")}
                >
                  ×
                </button>
              )}
            </div>
          )}
        </>
      )}

      {user && (
        <button
          className="btn btn-outline-light ms-3"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Sign out
        </button>
      )}
    </nav>
  );
};

export default Navbar;
