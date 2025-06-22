import React from "react";

const SiteCard = ({ site, destinationName }) => {
  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <img src={site.image} className="card-img-top" alt={site.name} />
      <div className="card-body">
        <h5 className="card-title">{site.name}</h5>
        <p className="card-text"><strong>Destination:</strong> {destinationName}</p>
      </div>
    </div>
  );
};

export default SiteCard;
