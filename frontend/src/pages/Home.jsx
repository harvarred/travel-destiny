import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getAllDestinations,
  deleteDestination,
  createDestination,
  updateDestination,
} from "../api";
import Navbar from "../components/Navbar";
import DestinationCard from "../components/DestinationCard";
import SiteCard from "../components/SiteCard";
import AddDestinationForm from "../components/AddDestinationForm";
import MapView from "../components/MapView";
import { incrementViews } from "../api";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("destination") || "";

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const fetchData = async () => {
    try {
      const res = await getAllDestinations();
      setDestinations(res.data);
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteDestination(id);
    fetchData();
  };

  const handleCreate = async (data) => {
    await createDestination(data);
    setShowAddForm(false);
    fetchData();
  };

  const handleUpdate = async (id, data) => {
    await updateDestination(id, data);
    fetchData();
  };

  const handleCardClick = async (destination) => {
  await incrementViews(destination._id); // ✅ Increase view count
  setSelectedDestination(destination);
};
  const filteredDestinations = destinations.filter((d) =>
    d.destinationname.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div>
      <Navbar
        searchQuery={selectedDestination ? undefined : searchQuery}
        setSearchQuery={
          selectedDestination
            ? undefined
            : (value) => setSearchParams(value ? { destination: value } : {})
        }
      />

      <div className="container mt-3">
        {selectedDestination ? (
          <>
            <h4 className="mt-4 mb-2">
              Sites in {selectedDestination.destinationname}
            </h4>
            <div className="row">
              {selectedDestination.sites.map((site, idx) => (
                <SiteCard
                  key={idx}
                  site={site}
                  destinationName={selectedDestination.destinationname}
                  destinationId={selectedDestination._id}
                />
              ))}
            </div>
            <button
              className="btn btn-outline-secondary mt-3"
              onClick={() => setSelectedDestination(null)}
            >
              ⬅ Back to All Destinations
            </button>
          </>
        ) : (
          <>
            {/* ✅ Map Section */}
            <div className="mb-4">
              <MapView destinations={filteredDestinations} />
            </div>

            {/* ✅ Destination Cards */}
            <div className="row">
              {filteredDestinations.map((dest) => (
                <DestinationCard
                  key={dest._id}
                  destination={dest}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                  onClickCard={() => handleCardClick(dest)}
                />
              ))}

              {isAdmin && (
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <div
                    className="border p-4 rounded text-center bg-light"
                    style={{
                      cursor: "pointer",
                      height: "200px",
                      width: "200px",
                    }}
                    onClick={() => setShowAddForm(true)}
                  >
                    <h2 style={{ fontSize: "30px", margin: 0 }}>➕</h2>
                  </div>
                </div>
              )}
            </div>

            {showAddForm && (
              <AddDestinationForm
                onCancel={() => setShowAddForm(false)}
                onSubmit={handleCreate}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
