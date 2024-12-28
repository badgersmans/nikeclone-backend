import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import { isValidEmail } from '../Utils/validate.js'; // Import the validate function

// Create the user schema
const SALT_ROUNDS = 15;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (email) {
                return isValidEmail(email);
            },
            message: 'Email is invalid',
        },
    },
    verified: {
        type: Boolean,
        default: false, // Default is unverified
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [72, 'Password cannot exceed 72 characters'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    stripeCustomerId: {
        type: String,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if the password is new or modified
    try {
        const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error); // Pass error to the next middleware
    }
});

// Method to compare the password
userSchema.methods.comparePassword = async function (userPassword) {
    return bcrypt.compare(userPassword, this.password);
};


export default mongoose.model('User', userSchema);