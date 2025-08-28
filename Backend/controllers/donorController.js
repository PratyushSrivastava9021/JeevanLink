const Donor = require("../models/Donor");

// Your existing functions
exports.addDonor = async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add the missing functions that your routes expect
exports.handleDonorRegistration = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      bloodGroup,
      organType,
      location,
      city,
      state,
      age
    } = req.body;

    // Validation
    if (!name || !email || !phone || !bloodGroup || !organType) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, phone, bloodGroup, organType'
      });
    }

    // Check if donor already exists
    const existingDonor = await Donor.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingDonor) {
      return res.status(409).json({
        error: 'Donor already registered with this email or phone number'
      });
    }

    // Create new donor
    const donor = new Donor({
      name,
      email,
      phone,
      bloodGroup,
      organType,
      location,
      city,
      state,
      age,
      isAvailable: true
    });

    await donor.save();
    
    res.status(201).json({
      message: 'Donor registered successfully',
      donor: donor
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.handleToggleDonorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    if (typeof isAvailable !== 'boolean') {
      return res.status(400).json({
        error: 'isAvailable must be a boolean value'
      });
    }

    const donor = await Donor.findByIdAndUpdate(
      id,
      { isAvailable },
      { new: true }
    );

    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.json({
      message: 'Donor status updated successfully',
      donor: donor
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMatchingDonors = async (req, res) => {
  try {
    const { organType, bloodGroup, location } = req.query;

    if (!organType || !bloodGroup) {
      return res.status(400).json({
        error: 'organType and bloodGroup are required parameters'
      });
    }

    // Build search criteria
    const searchCriteria = {
      organType: { $regex: new RegExp(organType, 'i') },
      bloodGroup: bloodGroup,
      isAvailable: true
    };

    // Add location filter if provided
    if (location) {
      searchCriteria.$or = [
        { location: { $regex: new RegExp(location, 'i') } },
        { city: { $regex: new RegExp(location, 'i') } },
        { state: { $regex: new RegExp(location, 'i') } }
      ];
    }

    const matchingDonors = await Donor.find(searchCriteria);

    res.json({
      message: `Found ${matchingDonors.length} matching donors`,
      donors: matchingDonors,
      searchCriteria: { organType, bloodGroup, location }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};