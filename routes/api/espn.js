const express = require("express");
const router = express.Router();
const espnCtrl = require("../../controllers/api/espn");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST to /api/espn
router.post("/", ensureLoggedIn, espnCtrl.create);

module.exports = router;
