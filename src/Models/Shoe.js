import mongoose from 'mongoose';

// Product Details Schema
const productDetailsSchema = new mongoose.Schema({
    tagline: { type: String, default: null },
    benefits: { type: [String], default: [] },
    productDetails: { type: [String], default: [] },
});

// Size and Fit Schema (for recommendations)
const sizeAndFitSchema = new mongoose.Schema({
    recommendationText: { type: String, required: false, default: null }, // Size-related recommendations (e.g., "Fits large; we recommend ordering half a size down")
});

// Free Delivery and Returns Schema
const freeDeliveryAndReturnsSchema = new mongoose.Schema({
    text: { type: String, required: true },
});

// More Info Schema
`example text:
    The ® may appear once or twice on the tongue and/or sockliner as a result of a change implemented by Nike. The product you purchase may appear differently in this respect than the one depicted on Nike.com or NikeApp.
    Limited to (1) pair per consumer
`
const moreInfoSchema = new mongoose.Schema({
    text: { type: String, required: false, default: null }, 
});

// Color Variations Schema
const colorVariationSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the color (e.g., "Red")
    images: { type: [String], required: true }, // Array of image URLs specific to this color
    sizes: {
    type: [
        {
            size: { type: String, required: true }, // Specific size (e.g., UK 6, US 10)
            availability: { type: Boolean, default: true }, // Whether this size is available
        },
    ],
    required: true,
    },
    isDefault: { type: Boolean, default: false }, // Flag to indicate the default color
});

// Shoe Schema
const shoeSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the shoe
    category: { type: String, required: true }, // Category (e.g., running, casual)
    price: { 
        type: Number, 
        get: getPrice,
        set: setPrice,
        default: 0,
    },
    colors: { type: [colorVariationSchema], required: true }, // Array of color variations with specific details
    description: { type: String, required: true }, // General description of the shoe
    originCountry: { type: [String], required: true }, // Country where the shoe is manufactured
    productDetails: productDetailsSchema, // Embedded schema for detailed product info
    sizeAndFit: sizeAndFitSchema, // Embedded schema for size and fit information (recommendations)
    freeDeliveryAndReturns: freeDeliveryAndReturnsSchema, // Embedded schema for delivery/returns info
    moreInfo: moreInfoSchema, // Embedded schema for additional product info
    discount: {
    type: {
        percentage: { type: Number, min: 0, max: 100 }, // Discount percentage (e.g., 20 for 20% off)
        validUntil: { type: Date }, // Date when the discount expires
    },
    default: null, // No discount by default
    isExcluded: { type: Boolean, default: false }
    },
    availableSizes: {
    type: [
        {
            size: { type: String, required: true }, // Actual available sizes like "UK 6", "US 10"
            availability: { type: Boolean, default: true }, // Whether this size is available
        },
    ],
    required: true,
    },
}, {
    timestamps: true
});

// Set default color if only one color exists
shoeSchema.pre('save', function (next) {
    if (this.colors.length === 1 && !this.colors[0].isDefault) {
        this.colors[0].isDefault = true; // Set the first color as default if only one exists
    } // If there are multiple colors, check if any is marked as default
    else if (this.colors.length > 1) {
        // If no color is marked as default, set the first color as the default
        const defaultColor = this.colors.find(color => color.isDefault);
        if (!defaultColor) {
            this.colors[0].isDefault = true; // Set the first color as default if no default is set
        }
    }

    // If there is a discount, ensure isExcluded is false
    if (this.discount && this.discount.percentage > 0) {
        this.isExcluded = false;
    }

    // If isExcluded is true, remove discount
    if (this.isExcluded) {
        this.discount = null;
    }

    next();
});


function getPrice(num) {
    return (num / 100).toFixed(2); // Converts cents back to dollars (or currency)
}

function setPrice(num) {
    return num * 100; // Converts price in dollars to cents
}

export default mongoose.model('Shoe', shoeSchema);