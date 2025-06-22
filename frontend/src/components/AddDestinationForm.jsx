import React, { useState, useEffect } from "react";

function AddDestinationForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    destinationname: "",
    description: "",
    image: "",
    sites: [{ name: "", image: "" }],
  });

  // If editing, load the initial data
  useEffect(() => {
    if (initialData) {
      setFormData({
        destinationname: initialData.destinationname || "",
        description: initialData.description || "",
        image: initialData.image || "",
        sites: initialData.sites.length
          ? initialData.sites
          : [{ name: "", image: "" }],
      });
    }
  }, [initialData]);

  const handleSiteChange = (index, field, value) => {
    const updatedSites = [...formData.sites];
    updatedSites[index][field] = value;
    setFormData({ ...formData, sites: updatedSites });
  };

  const handleAddSiteField = () => {
    setFormData({
      ...formData,
      sites: [...formData.sites, { name: "", image: "" }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    // Reset form only if adding, not editing
    if (!initialData) {
      setFormData({
        destinationname: "",
        description: "",
        image: "",
        sites: [{ name: "", image: "" }],
      });
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h5 className="mb-3">{initialData ? "Edit Destination" : "Add New Destination"}</h5>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Destination Name"
          value={formData.destinationname}
          onChange={(e) => setFormData({ ...formData, destinationname: e.target.value })}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Destination Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />

        <h6 className="mt-3">Sites</h6>
        {formData.sites.map((site, index) => (
          <div key={index} className="mb-3">
            <input
              className="form-control mb-1"
              placeholder="Site Name"
              value={site.name}
              onChange={(e) =>
                handleSiteChange(index, "name", e.target.value)
              }
              required
            />
            <input
              className="form-control"
              placeholder="Site Image URL"
              value={site.image}
              onChange={(e) =>
                handleSiteChange(index, "image", e.target.value)
              }
              required
            />
          </div>
        ))}

        <div className="d-flex justify-content-center mt-3">
          <button
            type="button"
            onClick={handleAddSiteField}
            className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center"
            style={{
              width: "32px",
              height: "32px",
              fontSize: "1rem",
              padding: "0",
              borderRadius: "50%",
            }}
            title="Add Site"
          >
            +
          </button>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDestinationForm;
