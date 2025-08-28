const Request = require("../models/Request");
const Donor = require("../models/Donor");
const sendEmail = require("../utils/email");

exports.addRequest = async (req, res) => {
  try {
    console.log(' Creating new request:', req.body);
    
    const request = new Request(req.body);
    await request.save();
    
    console.log(` Request saved: ${request._id}`);

    // Find matching donors
    console.log(` Searching for matching donors...`);
    const matchingDonors = await Donor.find({
      bloodGroup: request.bloodGroup,
      organType: request.organType,
      isAvailable: true
    });

    console.log(` Found ${matchingDonors.length} matching donors`);

    // Send emails to matching donors
    if (matchingDonors.length > 0) {
      console.log(' Sending email notifications...');
      
      const emailPromises = matchingDonors.map(async (donor) => {
        try {
          const emailContent = `Dear ${donor.name},

 URGENT ORGAN DONATION REQUEST

Patient Details:
- Name: ${request.patientName || 'Patient Name Confidential'}
- Organ Needed: ${request.organType}
- Blood Group: ${request.bloodGroup}
- Hospital: ${request.hospitalName}
- Location: ${request.city || 'Location details available'}
- Urgency: ${request.urgency || 'High Priority'}

Contact Information:
- Email: ${request.contactEmail || 'Will be provided'}

Request ID: ${request._id}
Time: ${new Date().toLocaleString()}

If you are available to donate and can help save a life, please contact the hospital immediately.

Thank you for being registered as an organ donor. Your generosity can make the difference between life and death.

JeevanLink Team
Connecting Lives, Saving Lives`;

          await sendEmail(
            donor.email,
            " URGENT: Organ Donation Request - JeevanLink",
            emailContent
          );
          
          return { success: true, email: donor.email, name: donor.name };
        } catch (error) {
          console.error(`Failed to send email to ${donor.email}:`, error.message);
          return { success: false, email: donor.email, name: donor.name, error: error.message };
        }
      });

      // Wait for all emails to be processed
      const emailResults = await Promise.allSettled(emailPromises);
      
      const successfulEmails = emailResults.filter(result => 
        result.status === 'fulfilled' && result.value.success
      ).length;
      
      console.log(` Email results: ${successfulEmails}/${matchingDonors.length} sent successfully`);
      
      // Update request with notification info
      await Request.findByIdAndUpdate(request._id, {
        notificationsSent: true,
        notificationsSentAt: new Date(),
        notifiedDonorsCount: successfulEmails
      });
    }

    res.status(201).json({
      message: 'Request created successfully',
      success: true,
      request: request,
      matchingDonors: matchingDonors.length,
      emailssent: matchingDonors.length > 0 ? 'Notifications sent to matching donors' : 'No matching donors found'
    });
    
  } catch (err) {
    console.error(' Error in addRequest:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: requests.length,
      requests: requests
    });
  } catch (err) {
    console.error(' Error in getRequests:', err);
    res.status(500).json({ error: err.message });
  }
};

// Add functions that your routes expect
exports.handleEmergencyRequest = exports.addRequest;

exports.handleDeleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({
        error: 'Request not found'
      });
    }

    console.log(` Request deleted: ${deletedRequest._id}`);

    res.status(200).json({
      message: 'Request deleted successfully',
      success: true,
      deletedRequest: {
        id: deletedRequest._id,
        patientName: deletedRequest.patientName,
        organType: deletedRequest.organType
      }
    });

  } catch (err) {
    console.error(' Error in handleDeleteRequest:', err);
    res.status(500).json({ error: err.message });
  }
};