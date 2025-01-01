const express = require("express");

const router = express.Router();
const ProfileController = require("../controllers/ProfileController");

router.get("/:id", (req, res) => {
    ProfileController.getProfile(req, res);
});
module.exports = router;