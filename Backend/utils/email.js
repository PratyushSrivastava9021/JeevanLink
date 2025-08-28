require('dotenv').config();

const nodemailer = require('nodemailer');

// Create email transporter with robust configuration
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error(' Email configuration missing: EMAIL_USER and EMAIL_PASS must be set in .env');
    return null;
  }

  console.log(' Creating email transporter for:', process.env.EMAIL_USER);
  
  return nodemailer.createTransport({
    service: 'gmail',
    
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    // Enhanced timeout and connection settings
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000,   // 30 seconds
    socketTimeout: 60000,     // 60 seconds
    // TLS settings for better compatibility
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    },
    // Pool settings for better performance
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    // Retry settings
    debug: true, // Enable debug logs
    logger: true // Enable logging
  });
};

// Send email function with retry logic
const sendEmail = async (to, subject, text, retryCount = 3) => {
  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      const transporter = createTransporter();
      
      if (!transporter) {
        throw new Error('Email transporter not configured');
      }

      console.log(` Attempt ${attempt}/${retryCount}: Verifying email connection...`);
      
      // Verify connection with timeout
      await Promise.race([
        transporter.verify(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection verification timeout')), 30000)
        )
      ]);
      
      console.log(' Email connection verified');

      const mailOptions = {
        from: `"JeevanLink" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        text: text,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h2> JeevanLink - Organ Donation Request</h2>
            </div>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px;">
              <div style="background: #ff4757; color: white; padding: 10px; text-align: center; font-weight: bold; margin-bottom: 20px; border-radius: 5px;">
                 URGENT REQUEST - IMMEDIATE ACTION NEEDED
              </div>
              <div style="background: white; padding: 15px; border-left: 4px solid #e74c3c; border-radius: 5px;">
                <p style="white-space: pre-line; line-height: 1.6;">${text}</p>
              </div>
              <p style="text-align: center; margin: 20px 0;">
                <strong>JeevanLink Team</strong><br>
                Connecting Lives, Saving Lives ❤️
              </p>
            </div>
          </div>
        `
      };

      console.log(` Attempt ${attempt}/${retryCount}: Sending email to ${to}...`);
      
      // Send email with timeout
      const result = await Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email send timeout')), 45000)
        )
      ]);
      
      console.log(` Email sent successfully to ${to} | Message ID: ${result.messageId}`);
      
      // Close the transporter
      transporter.close();
      
      return { success: true, messageId: result.messageId };
      
    } catch (error) {
      console.error(` Attempt ${attempt}/${retryCount} failed:`, error.message);
      
      // Don't retry for authentication errors
      if (error.code === 'EAUTH') {
        console.error(' Authentication failed - no point in retrying');
        throw error;
      }
      
      // If this was the last attempt, throw the error
      if (attempt === retryCount) {
        console.error(` All ${retryCount} attempts failed`);
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s...
      console.log(` Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Test email configuration with better error handling
const testEmailConfig = async () => {
  try {
    console.log(' Testing email configuration...');
    const transporter = createTransporter();
    
    if (!transporter) {
      return false;
    }
    
    // Test connection with timeout
    await Promise.race([
      transporter.verify(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout - check your network')), 30000)
      )
    ]);
    
    console.log(' Email configuration is valid');
    transporter.close();
    return true;
  } catch (error) {
    console.error(' Email configuration test failed:', error.message);
    
    if (error.code === 'EAUTH') {
      console.error(' Authentication issue - Generate a new Gmail App Password');
      console.error(' Steps:');
      console.error('   1. Go to https://myaccount.google.com/security');
      console.error('   2. Enable 2-Step Verification');
      console.error('   3. App passwords → Generate new password');
      console.error('   4. Update EMAIL_PASS in .env (no spaces)');
    } else if (error.message.includes('timeout')) {
      console.error(' Connection timeout - possible causes:');
      console.error('   1. Firewall blocking SMTP (port 587)');
      console.error('   2. Network connectivity issues');
      console.error('   3. Gmail temporarily blocking your IP');
    }
    
    return false;
  }
};

module.exports = { sendEmail, testEmailConfig };