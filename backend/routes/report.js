const express = require("express");

const router = express.Router();
const ReportController = require("../controllers/ReportController");

// Get All report details 
router.get("/", (req, res) => {
  ReportController.getReports(req, res);
});



module.exports = router;
