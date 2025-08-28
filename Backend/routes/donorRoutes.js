const express = require("express");
const { 
  handleDonorRegistration, 
  handleToggleDonorStatus,
  getDonors,
  getMatchingDonors 
} = require("../controllers/donorController");
const router = express.Router();

// Donor Management
router.post("/register", handleDonorRegistration);     // POST /api/donors/register
router.put("/:id/status", handleToggleDonorStatus);    // PUT /api/donors/:id/status
router.get("/", getDonors);                            // GET /api/donors/ (existing)

// Donor Matching
router.get("/match", getMatchingDonors);               // GET /api/donors/match

module.exports = router;