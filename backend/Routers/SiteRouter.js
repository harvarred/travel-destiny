const express = require('express');
const router = express.Router();
const SiteController = require('../Controllers/SiteController.js');

router.get('/', SiteController.getAllSites);
router.get('/:id', SiteController.getSiteById);
router.post('/', SiteController.createSite);
router.put('/:id', SiteController.updateSite);
router.delete('/:id', SiteController.deleteSite);

module.exports = router;
