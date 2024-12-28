import mongoose from 'mongoose';

// Schema definition for the VerificationCode
const verificationCodeSchema = new mongoose.Schema({
  code: { type: String, required: true }, // Code is required, but not unique
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  expiresAt: { type: Date, required: true }, // Expiration time for the code
});

// Create a model based on the schema
export default mongoose.model('VerificationCode', verificationCodeSchema);