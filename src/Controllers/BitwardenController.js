import axios from 'axios';

export const registerToken = async (req, res) => {
  try {
    const { 
      userId,
      username,
      displayname,
      authenticatorType = 'any',
      userVerification = 'preferred',
      // aliases = [],
      // aliasHashing = true
    } = req.body;

    // Input Validation
    if (!userId || !username) {
      res.status(400).json({ message: "UserId and username are required." });
      return;
    }

    const baseURL = 'https://v4.passwordless.dev';

    // Payload to be sent to Passwordless API
    const payload = {
      userId,
      username,
      // displayname,
      // authenticatorType,
      // userVerification,
      // aliases,
      // aliasHashing
    };

    // Make the POST request to the Passwordless API
    const response = await axios.post(`${baseURL}/register/token`, payload, {
      headers: {
        'ApiSecret': process.env.BW_PASSWORDLESS_API,
        'Content-Type': 'application/json'
      }
    });

    // Check if the response contains a token
    if (response.data && response.data.token) {
      res.status(200).json({
        message: 'Success',
        token: response.data.token,
      });
    } else {
      res.status(500).json({ message: 'Failed to register user' });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "An error occurred during registration. Please try again." });
  }
};
