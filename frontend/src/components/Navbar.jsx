import React from "react";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="navbar bg-dark p-3">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 text-white">TravelDestiny</span>
        <input
          className="form-control w-50"
          type="search"
          placeholder="Search destination..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
