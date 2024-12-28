import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Ensure that all required environment variables are defined
const myEmail = process.env.EMAIL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const accessToken = process.env.ACCESS_TOKEN;

// Set up OAuth2 client using the credentials from .env file
const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  'https://developers.google.com/oauthplayground' // Redirect URL for OAuth flow
);

// Set refresh token to retrieve a new access token when expired
oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

// Create the transporter object using the OAuth2 mechanism for authentication
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: myEmail, // Your email address
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
    accessToken: accessToken,
  },
});

/**
 * Function to generate a 6-digit random verification code
 * @returns {string} A 6-digit verification code
 */
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


/**
 * Function to send an email with a verification code
 * @param {string} email - The recipient's email address
 * @param {string} name - The recipient's name
 * @param {string} verificationCode - The verification code to send
 */
const sendVerificationEmail = async (email, name, verificationCode) => {
  try {
      // Get a new access token if expired
      const { token } = await oauth2Client.getAccessToken();

      // Update transporter with the new access token
      transporter.options.auth.accessToken = token;

      // Set up email data
      const mailOptions = {
          from: myEmail, // Sender address
          to: email, // Recipient address
          subject: "Verify Your Email", // Subject line
          html: `
              <h1>Email Confirmation</h1>
              <h2>Hello ${name}</h2>
              <p>
                  Thank you for joining us! Please confirm your email with the following code.
              </p>
              <h3>${verificationCode}</h3>
          `
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
  } catch (error) {
      console.error('Error sending email:', error);
  }
};


/**
 * Function to resend a verification email (e.g., for password reset)
 * @param {string} email - The recipient's email address
 * @param {string} name - The recipient's name
 * @param {string} verificationCode - The verification code to send
 */
const resendVerificationEmail = async (email, name, verificationCode) => {
  try {
      // Get a new access token if expired
      const { token } = await oauth2Client.getAccessToken();

      // Update transporter with the new access token
      transporter.options.auth.accessToken = token;

      // Set up email data
      const mailOptions = {
          from: myEmail,
          to: email,
          subject: "Forgot Password Request",
          html: `
              <h1>Reset Password</h1>
              <h2>Hello ${name}</h2>
              <p>
                  We received a request to reset your password. Use the code below to reset your password.
              </p>
              <h3>${verificationCode}</h3>
              <p>
                  If you did not request this, please ignore this email.
              </p>
          `
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Reset Password email sent: %s', info.messageId);
  } catch (error) {
      console.error('Error sending Reset Password email:', error);
  }
};

export { 
  generateVerificationCode,
  sendVerificationEmail,
  resendVerificationEmail
 };