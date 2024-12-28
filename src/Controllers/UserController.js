import User from "../Models/User.js";
import Code from "../Models/Code.js";
import { isValidEmail } from "../Utils/validate.js";
import { sendVerificationEmail, resendVerificationEmail, generateVerificationCode } from "../Utils/mailer.js";
import { generateJWT } from "../Utils/jwtToken.js";


export const registerUser = async (req, res) => {
    try {
        const { name, email, password, verified } = req.body;

        // Input Validation
        if (!name || !email || !password) {
            res.status(400).json({ message: "Name, email, and password are required." });
            return;
        }

        // Email Validation using isValidEmail
        if (!isValidEmail(email)) {
            res.status(400).json({ message: "Invalid email format." });
            return;
        }

        // Password Validation (at least 8 characters)
        if (password.length < 8) {
            res.status(400).json({ message: "Password must be at least 8 characters long." });
            return;
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User with this email already exists." });
            return;
        }

        // Create and save the user (password hashing is handled by the model)
        const newUser = new User({
            name,
            email,
            password,
            verified: verified || false, // Default to false if not provided
        });

        await newUser.save();

        // Delete any existing verification codes for this user
        await Code.deleteMany({
            user: newUser._id,
        });

        // Generate a new verification code
        const verificationCode = generateVerificationCode();

        // Save the new verification code to the database
        const newCode = new Code({
            code: verificationCode,
            user: newUser._id,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Set expiration to 10 minutes
        });

        await newCode.save();

        // Send verification email to the user
        if (!newUser.email || !newUser.name) {
            throw new Error('User email or name is undefined.');
        }
        
        await sendVerificationEmail(newUser.email, newUser.name, verificationCode); // Pass the code to the email function

        res.status(201).json({
            message: 'User created and verification email sent.',
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "An error occurred during registration. Please try again." });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input Validation
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required." });
            return;
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }

        // Compare entered password with stored hash
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid email or password." });
            return 
        }

        // Check if the user is verified
        if (!user.verified) {
            res.status(403).json({ message: "Your account is not verified. Please check your email for the verification code." });
            return;
        }

        // Generate JWT
        const token = generateJWT(
            { id: user._id }
        )

        // Set JWT as a cookie (Optional: You can also set httpOnly, secure flags for added security)
        res.cookie("auth_token", token, {
            httpOnly: true, // Ensures the cookie can't be accessed via JavaScript
            secure: process.env.NODE_ENV === "production", // Set to true in production to use https
            maxAge: 60000, // in milliseconds (1 minute here)
            sameSite: "strict", // Helps prevent CSRF attacks
        });

        res.status(200).json({
            message: "Login successfully",
            admin: user.isAdmin,
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An error occurred during login. Please try again." });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input Validation
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required." });
            return;
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }

        // Check if the user is verified
        if (!user.verified) {
            res.status(403).json({ message: "Your account is not verified. Please check your email for the verification code." });
            return;
        }

        await User.findByIdAndUpdate(user._id, {password})

        res.status(200).json({
            message: "Password Reset Successfully, please log in",
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "An error occurred while resetting password. Please try again." });
    }
};


export const verifyCode = async (req, res) => {
    try {
        const { code } = req.body;

        // Validate inputs
        if (!code) {
            res.status(400).json({ message: 'Verification code is required.' });
            return;
        }

        // Check if the code is valid (exactly 6 digits)
        if (!/^[0-9]{6}$/.test(code)) {
            res.status(400).json({ message: 'Invalid verification code format.' });
            return;
        }

        // Find the verification code in the database
        const verificationEntry = await Code.findOne({ code }).populate('user');

        if (!verificationEntry) {
            res.status(404).json({ message: 'Verification code not found.' });
            return;
        }

        // Check if the associated user is already verified
        const user = await User.findById(verificationEntry.user._id);
        if (user?.verified) {
            res.status(400).json({ message: 'This email is already verified.' });
            return;
        }

        // Check if the code is expired
        if (verificationEntry.expiresAt < new Date()) {
            res.status(400).json({ message: 'Verification code has expired.' });
            return;
        }

        // Code is valid, mark the associated user as verified
        await User.findByIdAndUpdate(verificationEntry.user._id, { verified: true });

        // Optionally, delete the verification code after successful verification
        await Code.deleteMany({ user: verificationEntry.user._id });

        res.status(200).json({ message: 'Account has been activated' });
    } catch (error) {
        console.error('Error verifying code:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


export const verifyResentCode = async (req, res) => {
    try {
        const { code } = req.body;

        // Validate inputs
        if (!code) {
            res.status(400).json({ message: 'Verification code is required.' });
            return;
        }

        // Check if the code is valid (exactly 6 digits)
        if (!/^[0-9]{6}$/.test(code)) {
            res.status(400).json({ message: 'Invalid verification code format.' });
            return;
        }

        // Find the verification code in the database
        const verificationEntry = await Code.findOne({ code }).populate('user');

        if (!verificationEntry) {
            res.status(404).json({ message: 'Verification code not found.' });
            return;
        }

        // Check if the associated user is already verified
        const user = await User.findById(verificationEntry.user._id);
        if (user?.verified) {
            res.status(400).json({ message: 'This email is already verified.' });
            return;
        }

        // Check if the code is expired
        if (verificationEntry.expiresAt < new Date()) {
            res.status(400).json({ message: 'Verification code has expired.' });
            return;
        }

        // Optionally, delete the verification code after successful verification
        await Code.deleteMany({ user: verificationEntry.user._id });

        res.status(200).json({ message: 'You can now change your password' });
    } catch (error) {
        console.error('Error verifying code:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


export const resendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            res.status(400).json({ message: 'Email is required.' });
            return;
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        // Check if the user is already verified
        if (user.verified) {
            res.status(400).json({ message: 'This email is already verified.' });
            return;
        }

        await Code.deleteMany({ user: user._id });

        const newVerificationCode = generateVerificationCode();

        const newCode = new Code({
            code: newVerificationCode,
            user: user._id,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),  // Example expiration (10 minutes)
        });
        await newCode.save();

        // Send the verification code email
        await resendVerificationEmail(email, user.name, newVerificationCode);

        res.status(200).json({ message: 'Verification code has been resent.' });
    } catch (error) {
        console.error('Error resending verification code:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};