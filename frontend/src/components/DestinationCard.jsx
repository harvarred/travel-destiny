import React, { useState, useEffect } from "react";
import axios from "axios";
import StarDisplay from "./StarDisplay";

const DestinationCard = ({ destination, onDelete, onUpdate, onClickCard }) => {
  const [formData, setFormData] = useState({
    destinationname: destination.destinationname,
    description: destination.description,
    image: destination.image,
    sites: destination.sites,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  // 🔁 Fetch average rating from backend
  const fetchAverage = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/home/${destination._id}/reviews`);
      const allReviews = res.data || [];
      const total = allReviews.reduce((sum, r) => sum + r.rating, 0);
      setAverageRating(allReviews.length ? total / allReviews.length : 0);
    } catch (err) {
      console.error("❌ Error loading ratings", err);
    }
  };

  useEffect(() => {
    fetchAverage();
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSiteChange = (index, field, value) => {
    const updatedSites = [...formData.sites];
    updatedSites[index][field] = value;
    setFormData({ ...formData, sites: updatedSites });
  };

  const handleSave = () => {
    onUpdate(destination._id, formData);
    setIsEditing(false);
  };

  return (
    <div
      className="card m-3"
      style={{
        width: "500px",
        height: "500px",
        overflowY: "auto",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        cursor: "pointer",
      }}
      onClick={() => !isEditing && onClickCard()}
    >
      {/* Image */}
      <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
        <img
          src={formData.image}
          className="card-img-top"
          alt={formData.destinationname}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <p className="text-muted small">
  👁 {destination.views || 0} views
</p>


      {/* Body */}
      <div className="card-body">
        {/* ⭐ Average Rating */}
        <div className="d-flex align-items-center mb-2">
          <StarDisplay rating={averageRating} />
          <span className="ms-2 text-muted small">({averageRating.toFixed(1)})</span>
        </div>

        {isEditing ? (
          <>
            <input
              className="form-control mb-2"
              value={formData.destinationname}
              onChange={(e) => handleChange("destinationname", e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <input
              className="form-control mb-2"
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />
            <h6>Edit Sites:</h6>
            {formData.sites.map((site, idx) => (
              <div key={idx} className="mb-2">
                <input
                  className="form-control mb-1"
                  value={site.name}
                  onChange={(e) => handleSiteChange(idx, "name", e.target.value)}
                />
                <input
                  className="form-control"
                  value={site.image}
                  onChange={(e) => handleSiteChange(idx, "image", e.target.value)}
                />
              </div>
            ))}
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <h5 className="card-title">{formData.destinationname}</h5>
            <p className="card-text">{formData.description}</p>
            <ul>
              {formData.sites.map((site, idx) => (
                <li key={idx}>{site.name}</li>
              ))}
            </ul>
            {isAdmin && (
              <>
                <button
                  className="btn btn-primary me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(destination._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DestinationCard;
