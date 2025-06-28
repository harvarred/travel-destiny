import React, { useState } from "react";

const AddDestinationForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    destinationname: "",
    description: "",
    image: "",
    latitude: "",
    longitude: "",
    sites: [],
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSiteChange = (index, field, value) => {
    const updatedSites = [...formData.sites];
    updatedSites[index][field] = value;
    setFormData({ ...formData, sites: updatedSites });
  };

  const addSite = () => {
    setFormData({
      ...formData,
      sites: [...formData.sites, { name: "", image: "" }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card mt-4 p-3">
      <h5 className="mb-3">Add New Destination</h5>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Destination Name"
          value={formData.destinationname}
          onChange={(e) => handleChange("destinationname", e.target.value)}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => handleChange("image", e.target.value)}
          required
        />
        <div className="row">
          <div className="col-md-6">
            <input
              className="form-control mb-2"
              placeholder="Latitude"
              type="number"
              value={formData.latitude}
              onChange={(e) => handleChange("latitude", e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control mb-2"
              placeholder="Longitude"
              type="number"
              value={formData.longitude}
              onChange={(e) => handleChange("longitude", e.target.value)}
              required
            />
          </div>
        </div>

        <h6>Sites</h6>
        {formData.sites.map((site, idx) => (
          <div key={idx} className="mb-2">
            <input
              className="form-control mb-1"
              placeholder="Site Name"
              value={site.name}
              onChange={(e) => handleSiteChange(idx, "name", e.target.value)}
              required
            />
            <input
              className="form-control"
              placeholder="Site Image URL"
              value={site.image}
              onChange={(e) => handleSiteChange(idx, "image", e.target.value)}
              required
            />
          </div>
        ))}

        <button
          type="button"
          className="btn btn-sm btn-outline-primary mb-3"
          onClick={addSite}
        >
          ➕ Add Site
        </button>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDestinationForm;
