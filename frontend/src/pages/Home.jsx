import React, { useEffect, useState } from "react";
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

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

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

  // ✅ If searching by destination name: show all its sites
  const matchedDestinationSites = destinations
    .filter((d) =>
      d.destinationname.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .flatMap((d) =>
      d.sites.map((site) => ({
        ...site,
        destinationName: d.destinationname,
      }))
    );

  return (
    <div className="container mt-3">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {searchQuery && matchedDestinationSites.length > 0 ? (
        <div className="row mt-3">
          {matchedDestinationSites.map((site, idx) => (
            <SiteCard
              key={idx}
              site={site}
              destinationName={site.destinationName}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="row mt-4">
            {destinations.map((dest) => (
              <DestinationCard
                key={dest._id}
                destination={dest}
                onDelete={handleDelete}
                onUpdate={handleUpdate} // update directly from card
              />
            ))}
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <div
                className="border p-4 rounded text-center bg-light"
                style={{ cursor: "pointer", height: "200px", width: "200px" }}
                onClick={() => setShowAddForm(true)}
              >
                <h2 style={{ fontSize: "30px", margin: 0 }}>➕</h2>
              </div>
            </div>
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
  );
};

export default Home;
