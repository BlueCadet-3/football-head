const express = require("express");
const router = express.Router();
const espnCtrl = require("../../controllers/api/espn");
// const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", espnCtrl.create);
router.get("/season", espnCtrl.findSeason)
// POST /api/users

module.exports = router;
