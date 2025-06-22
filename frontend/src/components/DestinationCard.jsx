import React, { useState } from "react";

const DestinationCard = ({ destination, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    destinationname: destination.destinationname || destination.name,
    description: destination.description,
    image: destination.image,
    sites: destination.sites,
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSiteChange = (index, field, value) => {
    const updatedSites = [...formData.sites];
    updatedSites[index][field] = value;
    setFormData({ ...formData, sites: updatedSites });
  };

  const handleSave = () => {
    onUpdate(destination._id, formData); // ✅ Directly update database
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div
      className="card m-3"
      style={{
        width: "500px",
        height: "500px",
        overflowY: "auto",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
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

      <div className="card-body">
        {isEditing ? (
          <>
            <input
              className="form-control mb-2"
              placeholder="Destination Name"
              value={formData.destinationname}
              onChange={(e) => handleChange("destinationname", e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />

            <h6>Edit Sites:</h6>
            {formData.sites.map((site, idx) => (
              <div key={idx} className="mb-2">
                <input
                  className="form-control mb-1"
                  placeholder="Site Name"
                  value={site.name}
                  onChange={(e) => handleSiteChange(idx, "name", e.target.value)}
                />
                <input
                  className="form-control"
                  placeholder="Site Image URL"
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
            <h6>Sites:</h6>
            <ul>
              {formData.sites.map((site, idx) => (
                <li key={idx}>{site.name}</li>
              ))}
            </ul>
            <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)}>
              Update
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(destination._id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DestinationCard;
