require('dotenv').config();

const nodemailer = require('nodemailer');

// Test function
async function testNodemailer() {
  try {
    console.log(' Testing Nodemailer Configuration...\n');

    // Create transporter (replace with your actual config)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
    });

    // Verify transporter configuration
    console.log('1️ Verifying transporter configuration...');
    await transporter.verify();
    console.log(' Transporter configuration is valid!\n');

    // Send test email
    console.log('2️ Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'your-test-email@example.com', // Replace with your test email
      subject: ' Nodemailer Test - JeevanLink',
      text: 'This is a test email to verify nodemailer is working correctly!',
      html: `
        <h2> Nodemailer Test Successful!</h2>
        <p>This email confirms that your nodemailer setup is working correctly.</p>
        <p><strong>Test Details:</strong></p>
        <ul>
          <li>Time: ${new Date().toLocaleString()}</li>
          <li>Service: Gmail</li>
          <li>Status: Working </li>
        </ul>
      `
    });

    console.log(' Test email sent successfully!');
    console.log(' Message ID:', info.messageId);
    console.log(' Preview URL:', nodemailer.getTestMessageUrl(info));
    
  } catch (error) {
    console.error(' Test failed:', error.message);
    console.error('Full error:', error);
  }
}

// Run the test
testNodemailer();