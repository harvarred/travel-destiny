const Site = require('../Models/Site.js');

const getAllSites = async (req, res) => {
  const getSites = await Site.find({});
  if (!getSites) {
    return res.status(404).json({ message: "No sites found" });
  }
  res.status(200).json(getSites);
};

const getSiteById = async (req, res) => {
  const getSite = await Site.findById(req.params.id);
  if (!getSite) {
    return res.status(404).json({ message: "No site found" });
  }
  res.status(200).json(getSite);
};

const createSite = async (req, res) => {
  const { destinationname, description, image, sites } = req.body;
  try {
    const newSite = await Site.create({ destinationname, description, image, sites });
    res.status(201).json(newSite);
  } catch (error) {
    res.status(400).json({ message: "Site not created", error });
  }
};

const updateSite = async (req, res) => {
  const { destinationname, description, image, sites } = req.body;
  try {
    const updatedSite = await Site.findByIdAndUpdate(
      req.params.id,
      { destinationname, description, image, sites },
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

const deleteSite = async (req, res) => {
  const deletedSite = await Site.findByIdAndDelete(req.params.id);
  if (!deletedSite) {
    return res.status(404).json({ message: "Site not deleted" });
  }
  res.status(200).json({ message: "Site deleted successfully" });
};

module.exports = {
  getAllSites,
  getSiteById,
  createSite,
  updateSite,
  deleteSite
};
