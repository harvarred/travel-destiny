import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";


const images = [
  "https://images.unsplash.com/photo-1695981152719-3fc012dc3da4?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1612193827340-1e11a9a7feab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI4fHxpbmRpYW4lMjB0cmF2ZWwlMjBwbGFjZXN8ZW58MHx8MHx8fDA%3D"
];

const Landing = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `url(${images[index]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out"
      }}
    >
      {/* Top Navbar */}
      <div className="top-navbar px-4 py-3 d-flex justify-content-between align-items-center">
        <h4 className="text-white fw-bold m-0">🌍 TravelDestiny</h4>
        <div>
          <button className="btn btn-outline-light me-2" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn btn-light" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
      </div>

      {/* Center Card */}
      <div className="overlay">
        <div className="landing-card text-center p-5">
          <h1 className="display-4 fw-bold text-dark">Explore the World</h1>
          <p className="lead text-secondary">
            Discover stunning places, plan your trip, and save your favorites.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-primary px-4" onClick={() => navigate("/login")}>
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
