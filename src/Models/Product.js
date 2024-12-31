import mongoose from 'mongoose';

const Category = {
    Phone: 'iphone',
    Computers: 'macbook',
    Tablets: 'ipad',
    Watches: 'applewatch',
    Audio: 'airpods'
};

// Create the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: Object.values(Category),
        default: Category.Phone
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    numReviews: {
        type: Number,
        required: [true, 'Number of reviews is required'],
        default: 0,
    },
    price: { 
        type: Number, 
        get: getPrice,
        set: setPrice,
        default: 0,
    },
    stockCount: {
        type: Number,
        required: [true, 'Stock Count is required'],
        default: 1,
    },
    views: {
        type: Number,
        default: 0,
    },
    ratings: {
        type: Number,
        required: [true, 'Rating is required'],
        default: 0,
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

function getPrice(num) {
    return (num / 100).toFixed(2); // Converts cents back to dollars (or currency)
}

function setPrice(num) {
    return num * 100; // Converts price in dollars to cents
}


export default mongoose.model('Product', productSchema);