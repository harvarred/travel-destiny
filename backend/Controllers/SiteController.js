const Site = require("../Models/Site");

// ✅ Get all destinations
const getAllSites = async (req, res) => {
  try {
    const sites = await Site.find();
    res.status(200).json(sites);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sites", error: err.message });
  }
};

// ✅ Get a single destination by ID
const getSiteById = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ message: "Site not found" });
    res.status(200).json(site);
  } catch (err) {
    res.status(500).json({ message: "Error fetching site", error: err.message });
  }
};

// ✅ Create new destination
const createSite = async (req, res) => {
  const { destinationname, description, image, latitude, longitude, sites } = req.body;
  try {
    const newSite = await Site.create({
      destinationname,
      description,
      image,
      latitude,
      longitude,
      sites,
    });
    res.status(201).json(newSite);
  } catch (error) {
    res.status(400).json({ message: "Site not created", error });
  }
};


// ✅ Update a destination
const updateSite = async (req, res) => {
  const { destinationname, description, image, latitude, longitude, sites } = req.body;
  try {
    const updatedSite = await Site.findByIdAndUpdate(
      req.params.id,
      { destinationname, description, image, latitude, longitude, sites },
      { new: true }
    );
    if (!updatedSite) {
      return res.status(404).json({ message: "Site not updated" });
    }
    res.status(200).json(updatedSite);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error });
  }
};


// ✅ Delete a destination
const deleteSite = async (req, res) => {
  try {
    const deleted = await Site.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not deleted" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting", error: err.message });
  }
};

// ✅ Add review to a specific site inside a destination
const addReview = async (req, res) => {
  const { id } = req.params;
  const { username, comment, rating, siteName } = req.body;

  try {
    const destination = await Site.findById(id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    const targetSite = destination.sites.find((s) => s.name === siteName);
    if (!targetSite) return res.status(404).json({ message: "Site not found in destination" });

    // Ensure reviews array exists
    if (!targetSite.reviews) targetSite.reviews = [];

    targetSite.reviews.push({ username, comment, rating });

    await destination.save();

    res.status(201).json({ message: "Review added", reviews: targetSite.reviews });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ message: "Failed to add review", error: err.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ message: "Site not found" });

    // Flatten all reviews from nested sites[]
    const allReviews = site.sites.flatMap((s) =>
      (s.reviews || []).map((r) => ({
        ...r.toObject(),
        siteName: s.name, // Attach site name for filtering later
      }))
    );

    res.status(200).json(allReviews);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch reviews", error });
  }
};

const incrementViews = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ message: "Destination not found" });

    site.views = (site.views || 0) + 1;
    await site.save();

    res.status(200).json({ message: "View counted", views: site.views });
  } catch (err) {
    res.status(400).json({ message: "Failed to count view", error: err });
  }
};



module.exports = {
  getAllSites,
  getSiteById,
  createSite,
  updateSite,
  deleteSite,
  addReview,
  getReviews,
  incrementViews
};
