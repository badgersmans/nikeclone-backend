import mongoose from 'mongoose';


// Create the review schema
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    shoe: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shoe', 
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [2, 'Title must be at least 2 characters'],
        maxlength: [50, 'Title cannot exceed 50 characters'],
    },
    comment: {
        type: String,
        required: [true, 'Comment is required'],
        maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5'],
    }
}, {
    timestamps: true,
});


export default mongoose.model('Review', reviewSchema);