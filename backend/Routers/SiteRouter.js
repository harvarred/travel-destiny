const express = require("express");
const router = express.Router();
const SiteController = require("../Controllers/SiteController");
const verifyAdmin = require("../middleware/verifyAdmin");

router.get("/", SiteController.getAllSites);         // Public
router.get("/:id", SiteController.getSiteById);      // Public

router.post("/", verifyAdmin, SiteController.createSite);    // Admin only
router.put("/:id", verifyAdmin, SiteController.updateSite);  // Admin only
router.delete("/:id", verifyAdmin, SiteController.deleteSite); // Admin only

router.post("/:id/reviews", SiteController.addReview);  // Public
router.get("/:id/reviews", SiteController.getReviews);  // Public

router.put("/:id/views", SiteController.incrementViews); // Public

module.exports = router;

