const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const donorRoutes = require("./routes/donorRoutes");
const requestRoutes = require("./routes/requestRoutes");
//const authRoutes = require("./routes/authRoutes");
//const notificationRoutes = require("./routes/notificationRoutes"); // Add this

// Debug: Log when routes are loaded
console.log('Routes loaded successfully');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection with better error handling
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Handle mongoose connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Routes
app.get("/", (req, res) => res.send("Organ Donation API Running"));

// Debug: Log when setting up routes
console.log('Setting up API routes...');
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
//app.use("/api/auth", authRoutes);
//app.use("/api/notifications", notificationRoutes); // Add this
console.log('API routes configured successfully');

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment variables loaded:');
  console.log('- PORT:', process.env.PORT || 'Not set (using default 5000)');
  console.log('- MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
});
//EMAIL LOGIC
app.get("/api/test-email", async (req, res) => {
  try {
    const sendEmail = require("./utils/email");
    
    // Test email
    await sendEmail(
      "rajesoni16@gmail.com", // Replace with your email
      "Test Email from JeevanLink",
      "This is a test email to verify the email configuration."
    );
    
    res.json({ 
      message: "Test email sent successfully!", 
      success: true 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to send test email", 
      error: error.message, 
      success: false 
    });
  }
});