const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: String,
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

const siteSchema = new mongoose.Schema({
  destinationname: String,
  description: String,
  image: String,
  latitude: Number,          // ✅ New field
  longitude: Number,
  views: {
    type: Number,
    default: 0
  },     // ✅ New field
  sites: [
    {
      name: String,
      image: String,
      reviews: [reviewSchema],
    },
  ],
});

const Site = mongoose.model("Site", siteSchema);
module.exports = Site;
