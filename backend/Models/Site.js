const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  destinationname: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  sites: {
    type: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true }
      }
    ],
    required: true
  }
});

const Site = mongoose.model('Site', siteSchema);
module.exports = Site;
