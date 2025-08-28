const express = require("express");
const { 
  handleEmergencyRequest,
  getRequests,
  handleDeleteRequest 
} = require("../controllers/requestController");

const router = express.Router();

// Emergency Requests
router.post("/create", handleEmergencyRequest);        // POST /api/requests/create
router.get("/", getRequests);                          // GET /api/requests (existing)
router.delete("/:id", handleDeleteRequest);           // DELETE /api/requests/:id

module.exports = router;