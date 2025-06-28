import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/user/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("✅ Login successful!");
      setFormData({ username: "", password: "" });
      setTimeout(() => (window.location.href = "/destinations"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container-fluid vh-100"
        style={{
          background: "linear-gradient(135deg, #e0eafc 0%,rgb(229, 232, 235) 100%)",
        }}
      >
        <div className="row h-100">
          {/* Left: Form as Card */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div
              className="card shadow-lg border-0"
              style={{
                maxWidth: "320px",
                width: "100%",
                borderRadius: "1rem",
                background: "rgba(255,255,255,0.97)",
              }}
            >
              <div className="card-body p-3">
                <h4 className="mb-3 text-center fw-bold" style={{ color: "#2b6777" }}>
                  🔐 Login to <span style={{ color: "#52ab98" }}>TravelDestiny</span>
                </h4>
                {message && (
                  <div className="alert alert-info text-center py-2 px-1" style={{ fontSize: "0.95rem" }}>{message}</div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-2">
                    <label className="fw-semibold mb-1" style={{ fontSize: "0.95rem" }}>Username</label>
                    <input
                      name="username"
                      className="form-control form-control-sm"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      autoFocus
                      placeholder="Enter your username"
                      style={{ fontSize: "0.95rem" }}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="fw-semibold mb-1" style={{ fontSize: "0.95rem" }}>Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control form-control-sm"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        style={{ fontSize: "0.95rem" }}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        tabIndex={-1}
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-success w-100 py-1 fw-bold"
                    style={{
                      fontSize: "1rem",
                      background: "linear-gradient(90deg, #52ab98 0%, #2b6777 100%)",
                      border: "none",
                      transition: "box-shadow 0.2s",
                      boxShadow: "0 2px 8px rgba(82,171,152,0.15)",
                    }}
                    onMouseOver={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(82,171,152,0.25)")}
                    onMouseOut={e => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(82,171,152,0.15)")}
                  >
                    Login
                  </button>
                </form>
                <p className="mt-3 text-center text-secondary" style={{ fontSize: "0.95rem" }}>
                  Don't have an account?{" "}
                  <a href="/signup" style={{ color: "#2b6777", fontWeight: 500 }}>
                    Signup
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="col-md-6 d-none d-md-block p-0">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="travel"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderTopRightRadius: "1.5rem",
                borderBottomRightRadius: "1.5rem",
                boxShadow: "0 0 32px rgba(44, 103, 119, 0.12)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;