import mongoose from 'mongoose';
import Shoe from '../Models/Shoe.js'; // Assuming you have a Product model in this path
import dotenv from 'dotenv';

dotenv.config();

const ukShoeSizes = {
    "3": 3,
    "3.5": 3.5,
    "4": 4,
    "4.5": 4.5,
    "5": 5,
    "5.5": 5.5,
    "6": 6,
    "6.5": 6.5,
    "7": 7,
    "7.5": 7.5,
    "8": 8,
    "8.5": 8.5,
    "9": 9,
    "9.5": 9.5,
    "10": 10,
    "10.5": 10.5,
    "11": 11,
    "11.5": 11.5,
    "12": 12,
    "12.5": 12.5,
    "13": 13,
    "13.5": 13.5,
    "14": 14,
    "14.5": 14.5,
    "15": 15,
    "15.5": 15.5,
    "16": 16,
    "16.5": 16.5,
    "17": 17,
    "17.5": 17.5,
    "18": 18,
    "18.5": 18.5,
    "19": 19,
    "19.5": 19.5,
    "20": 20,
    "20.5": 20.5,
    "21": 21
};

// Function to get a random size from the UK shoe sizes object
function getRandomSize() {
    const sizes = Object.keys(ukShoeSizes);
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    return `UK ${randomSize}`; // Adding "UK" prefix to the size
}

const db = process.env.DB_URL;
const placeholderImage = "https://raw.githack.com/badgersmans/nikeclone-backend-assets/main/assets/Shoes/default.png";

const FREE_DELIVERY_AND_RETURNS_TEXT = `
Your order of RM 400 or more gets free standard delivery.

Standard delivered 2-6 Business Days
Express delivered 2-4 Business Days

Orders are processed and delivered Monday-Friday (excluding public holidays)

Nike Members enjoy free returns. Exclusions apply.`;

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('SEEDER connected to MongoDB ✅');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Function to seed product data
const seedShoe = async () => {
    try {
        await Shoe.deleteMany({});

        // 1st one is real data
        const shoeData = [
            {
                "name": "Air Jordan 11 Retro 'Legend Blue'",
                "category": "Men's Shoes",
                "price": 96900,
                "colors": [
                  {
                    "name": "White",
                    "images": [
                          "https://raw.githubusercontent.com/badgersmans/nikeclone-backend-assets/main/assets/Shoes/Air%20Jordan%2011%20Retro%20'Legend%20Blue'/1.png",
                          "https://raw.githubusercontent.com/badgersmans/nikeclone-backend-assets/main/assets/Shoes/Air%20Jordan%2011%20Retro%20'Legend%20Blue'/2.png",
                          "https://raw.githubusercontent.com/badgersmans/nikeclone-backend-assets/main/assets/Shoes/Air%20Jordan%2011%20Retro%20'Legend%20Blue'/3.png",
                          "https://raw.githubusercontent.com/badgersmans/nikeclone-backend-assets/main/assets/Shoes/Air%20Jordan%2011%20Retro%20'Legend%20Blue'/4.png",
                          "https://raw.githubusercontent.com/badgersmans/nikeclone-backend-assets/main/assets/Shoes/Air%20Jordan%2011%20Retro%20'Legend%20Blue'/5.png",
                          "https://raw.githubusercontent.com/badgersmans/nikeclone-backend-assets/main/assets/Shoes/Air%20Jordan%2011%20Retro%20'Legend%20Blue'/6.png",
                          "https://raw.githubusercontent.com/badgersmans/nikeclone-backend-assets/main/assets/Shoes/Air%20Jordan%2011%20Retro%20'Legend%20Blue'/7.png",
                          "https://raw.githubusercontent.com/badgersmans/nikeclone-backend-assets/main/assets/Shoes/Air%20Jordan%2011%20Retro%20'Legend%20Blue'/8.png",
                          "https://raw.githubusercontent.com/badgersmans/nikeclone-backend-assets/main/assets/Shoes/Air%20Jordan%2011%20Retro%20'Legend%20Blue'/9.png",
                          "https://raw.githack.com/badgersmans/nikeclone-backend-assets/main/assets/Shoes/Air%20Jordan%2011%20Retro%20'Legend%20Blue'/video.mp4",
                      ],
                    "sizes": [
                          { "size": "UK 6", "availability": true },
                          { "size": "UK 6.5", "availability": false },
                          { "size": "UK 7", "availability": true },
                          { "size": "UK 7.5", "availability": false },
                          { "size": "UK 8", "availability": true },
                          { "size": "UK 8.5", "availability": false },
                          { "size": "UK 9", "availability": true },
                          { "size": "UK 10", "availability": true },
                          { "size": "UK 10.5", "availability": false },
                          { "size": "UK 11", "availability": false },
                          { "size": "UK 12", "availability": true },
                      ]
                  }
                ],
                "description": "Let's cut to the chase—the AJ11 is all-time. MJ won 72 games and a title while wearing 'em. Now, the icon returns in classic colours. From its slick patent leather mudguard to the frosted outsole, this Tinker Hatfield design brings the off-court allure. And for the final touch? Full-length Air cushioning is the cherry on top (er, bottom).",
                "originCountry": "Vietnam",
                "productDetails": {
                  "benefits": [
                      "Full-length Air-Sole unit delivers lightweight cushioning.",
                      "Contoured mudguard wraps the entire shoe, providing durability with sleek distinction.",
                      "Lightweight carbon fibre component provides stability.",
                  ],
                  "productDetails": [
                      "Sculpted foam midsole",
                      "Rubber outsole",
                      "Padded tongue and collar",
                      "Round laces",
                      "Colour Shown: White/Black/Legend Blue",
                      "Style: CT8012-104",
                  ],
                },
                "freeDeliveryAndReturns": {
                  "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "discount": {
                  "isExcluded": true,
                },
                "availableSizes": [
                  { "size": "UK 6", "availability": true },
                  { "size": "UK 6.5", "availability": false },
                  { "size": "UK 7", "availability": true },
                  { "size": "UK 7.5", "availability": false },
                  { "size": "UK 8", "availability": true },
                  { "size": "UK 8.5", "availability": false },
                  { "size": "UK 9", "availability": true },
                  { "size": "UK 10", "availability": true },
                  { "size": "UK 10.5", "availability": false },
                  { "size": "UK 11", "availability": false },
                  { "size": "UK 12", "availability": true },
                ]
            },
            {
                "name": "Nike Zoom Fly 5",
                "category": "Running Shoes",
                "price": 129900,
                "colors": [
                  {
                    "name": "Blue Orbit",
                    "images": [
                        placeholderImage
                    ],
                    "sizes": [
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": false },
                      { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": true
                  }
                ],
                "description": "Lightweight and fast, perfect for everyday runners.",
                "originCountry": ["Indonesia"],
                "productDetails": {
                  "tagline": "Go the distance.",
                  "benefits": [
                    "Breathable mesh upper for comfort.",
                    "Responsive foam midsole for added energy."
                  ],
                  "productDetails": ["Weight: 250g", "Stack Height: 39mm"]
                },
                "sizeAndFit": {
                  "recommendationText": "Fits true to size."
                },
                "freeDeliveryAndReturns": {
                  "text": "Enjoy free delivery and hassle-free returns within 30 days."
                },
                "moreInfo": {
                  "text": "Limited availability; secure your pair now."
                },
                "discount": null,
                "availableSizes": [
                  { "size": getRandomSize(), "availability": true },
                  { "size": getRandomSize(), "availability": false },
                  { "size": getRandomSize(), "availability": true }
                ]
            },
            {
            "name": "Adidas Ultraboost 21",
            "category": "Lifestyle Shoes",
            "price": 180000,
            "colors": [
                {
                "name": "Core Black",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false }
                ],
                "isDefault": false
                },
                {
                "name": "Cloud White",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Experience unmatched comfort in every step.",
            "originCountry": ["Vietnam", "China"],
            "productDetails": {
                "tagline": null,
                "benefits": [],
                "productDetails": null
            },
            "sizeAndFit": null,
            "freeDeliveryAndReturns": {
                "text": "Free returns within 60 days."
            },
            "moreInfo": null,
            "discount": {
                "percentage": 15,
                "validUntil": "2024-12-31T00:00:00.000Z"
            },
            "availableSizes": [
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
                "name": "Puma Deviate Nitro",
                "category": "Running Shoes",
                "price": 150000,
                "colors": [
                  {
                    "name": "Electric Yellow",
                    "images": [
                        placeholderImage


                    ],
                    "sizes": [
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": false }
                    ],
                    "isDefault": true
                  }
                ],
                "description": "Designed for speed and comfort with advanced Nitro foam.",
                "originCountry": ["Germany"],
                "productDetails": {
                  "tagline": "Push beyond your limits.",
                  "benefits": [
                    "Carbon fiber plate for propulsion.",
                    "Durable outsole for various terrains."
                  ],
                  "productDetails": ["Weight: 240g", "Stack Height: 38mm"]
                },
                "sizeAndFit": {
                  "recommendationText": "Recommended to size up for a snug fit."
                },
                "freeDeliveryAndReturns": {
                  "text": "Free returns within 30 days for unworn products."
                },
                "moreInfo": {
                  "text": "Available in limited quantities."
                },
                "discount": {
                  "percentage": 10,
                  "validUntil": "2024-11-15T00:00:00.000Z"
                },
                "availableSizes": [
                  { "size": getRandomSize(), "availability": true },
                  { "size": getRandomSize(), "availability": false },
                  { "size": getRandomSize(), "availability": true }
                ]
            },
            {
            "name": "New Balance Fresh Foam 1080",
            "category": "Running Shoes",
            "price": 160000,
            "colors": [
                {
                "name": "Moonbeam Grey",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Engineered for a smooth ride and exceptional support.",
            "originCountry": ["USA"],
            "productDetails": {
                "tagline": "Every step, perfected.",
                "benefits": [
                "Hypoknit upper for flexibility.",
                "Fresh Foam X midsole for premium cushioning."
                ],
                "productDetails": ["Weight: 280g", "Stack Height: 34mm"]
            },
            "sizeAndFit": null,
            "freeDeliveryAndReturns": {
                "text": "Free shipping on orders over $50."
            },
            "moreInfo": null,
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Asics Gel-Kayano 30",
            "category": "Stability Running Shoes",
            "price": 170000,
            "colors": [
                {
                "name": "Lime Zest",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false }
                ],
                "isDefault": true
                }
            ],
            "description": "A premium choice for overpronators seeking long-lasting comfort.",
            "originCountry": ["Japan"],
            "productDetails": {
                "tagline": "Run with stability.",
                "benefits": [
                "Dynamic DuoMax support system.",
                "Ortholite X-55 sockliner for enhanced step-in comfort."
                ],
                "productDetails": ["Weight: 310g", "Stack Height: 37mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Order half a size up for the best fit."
            },
            "freeDeliveryAndReturns": {
                "text": "Complimentary returns on all orders."
            },
            "moreInfo": null,
            "discount": {
                "percentage": 20,
                "validUntil": "2024-12-01T00:00:00.000Z"
            },
            "availableSizes": [
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Hoka Clifton 9",
            "category": "Cushioned Running Shoes",
            "price": 140000,
            "colors": [
                {
                "name": "Fiesta Red",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": false
                },
                {
                "name": "Arctic Blue",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false }
                ],
                "isDefault": true
                }
            ],
            "description": "Maximal comfort and minimal weight for daily runs.",
            "originCountry": ["Vietnam"],
            "productDetails": {
                "tagline": null,
                "benefits": ["Soft cushioning for impact protection."],
                "productDetails": ["Weight: 220g", "Stack Height: 40mm"]
            },
            "sizeAndFit": null,
            "freeDeliveryAndReturns": {
                "text": "Free exchanges within 30 days."
            },
            "moreInfo": null,
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Brooks Ghost 15",
            "category": "Neutral Running Shoes",
            "price": 130000,
            "colors": [
                {
                "name": "Midnight Blue",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false }
                ],
                "isDefault": true
                }
            ],
            "description": "Perfect balance of soft cushioning and responsiveness.",
            "originCountry": ["USA"],
            "productDetails": {
                "tagline": "Feel the flow.",
                "benefits": [
                "DNA Loft midsole for ultra-smooth transitions.",
                "Engineered mesh upper for breathability."
                ],
                "productDetails": ["Weight: 280g", "Stack Height: 36mm"]
            },
            "sizeAndFit": {
                "recommendationText": "True to size with a roomy toe box."
            },
            "freeDeliveryAndReturns": {
                "text": "Free delivery and returns for VIP members."
            },
            "moreInfo": null,
            "discount": {
                "percentage": 5,
                "validUntil": "2024-11-10T00:00:00.000Z"
            },
            "availableSizes": [
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
                "name": "Adidas Ultraboost Light",
                "category": "Running Shoes",
                "price": 180000,
                "colors": [
                  {
                    "name": "Solar Red",
                    "images": [
                        placeholderImage


                    ],
                    "sizes": [
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": false },
                      { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": true
                  },
                  {
                    "name": "Core Black",
                    "images": [
                        placeholderImage


                    ],
                    "sizes": [
                      { "size": getRandomSize(), "availability": false },
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": false
                  }
                ],
                "description": "Experience the ultimate energy return with a lighter Ultraboost design.",
                "originCountry": ["Germany"],
                "productDetails": {
                  "tagline": "Light up your run.",
                  "benefits": [
                    "Boost Light midsole for unparalleled cushioning.",
                    "Primeknit+ upper for adaptive support."
                  ],
                  "productDetails": ["Weight: 260g", "Stack Height: 40mm"]
                },
                "sizeAndFit": {
                  "recommendationText": "True to size, with a snug fit."
                },
                "freeDeliveryAndReturns": {
                  "text": "30-day trial with free returns."
                },
                "moreInfo": {
                  "text": "Sustainably crafted with Parley Ocean Plastic."
                },
                "discount": {
                  "percentage": 15,
                  "validUntil": "2024-11-20T00:00:00.000Z"
                },
                "availableSizes": [
                  { "size": getRandomSize(), "availability": true },
                  { "size": getRandomSize(), "availability": false },
                  { "size": getRandomSize(), "availability": true }
                ]
            },
            {
            "name": "Nike ZoomX Vaporfly Next% 3",
            "category": "Elite Racing Shoes",
            "price": 250000,
            "colors": [
                {
                "name": "Bright Crimson",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false }
                ],
                "isDefault": true
                }
            ],
            "description": "The pinnacle of speed, designed for breaking records on race day.",
            "originCountry": ["USA"],
            "productDetails": {
                "tagline": "Every second counts.",
                "benefits": [
                "ZoomX foam and full-length carbon plate for unmatched energy return.",
                "Lightweight upper for breathability and reduced weight."
                ],
                "productDetails": ["Weight: 200g", "Stack Height: 40mm (maximum allowed for racing)"]
            },
            "sizeAndFit": {
                "recommendationText": "Order half a size up for racing fit."
            },
            "freeDeliveryAndReturns": {
                "text": "Free two-day delivery for Nike+ members."
            },
            "moreInfo": {
                "text": "Limited edition colorways available."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
            ]
            },  
            {
                "name": "Nike ZoomX Vaporfly Next% 3",
                "category": "Elite Racing Shoes",
                "price": 250000,
                "colors": [
                {
                    "name": "Volt/Black",
                    "images": [
                    placeholderImage
                    ],
                    "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": true
                }
                ],
                "description": "The pinnacle of speed, designed for breaking records on race day.",
                "originCountry": ["USA"],
                "productDetails": {
                "tagline": "Every second counts.",
                "benefits": [
                    "ZoomX foam and full-length carbon plate for unmatched energy return.",
                    "Lightweight upper for breathability and reduced weight."
                ],
                "productDetails": ["Weight: 200g", "Stack Height: 40mm (maximum allowed for racing)"]
                },
                "sizeAndFit": {
                "recommendationText": "Order half a size up for racing fit."
                },
                "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                "text": "Limited edition colorways available."
                },
                "discount": null,
                "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
                ]
            },
            {
                "name": "Nike Air Zoom Pegasus 40",
                "category": "Running Shoes",
                "price": 159900,
                "colors": [
                {
                    "name": "Smoke Grey/White",
                    "images": [
                    placeholderImage
                    ],
                    "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": false
                }
                ],
                "description": "Run with unmatched comfort and support in the Nike Air Zoom Pegasus 40.",
                "originCountry": ["Vietnam"],
                "productDetails": {
                "tagline": "Reliable and durable.",
                "benefits": [
                    "Zoom Air unit for responsive cushioning.",
                    "Durable rubber outsole for great traction."
                ],
                "productDetails": ["Weight: 300g", "Stack Height: 34mm"]
                },
                "sizeAndFit": {
                "recommendationText": "True to size for a regular fit."
                },
                "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                "text": "Available in a variety of colors."
                },
                "discount": null,
                "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
                ]
            },
            {
                "name": "Nike React Infinity Run Flyknit 2",
                "category": "Running Shoes",
                "price": 179900,
                "colors": [
                {
                    "name": "Game Royal/Black",
                    "images": [
                    placeholderImage
                    ],
                    "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": true
                }
                ],
                "description": "Maximum cushioning with a secure fit. Perfect for long-distance running.",
                "originCountry": ["Indonesia"],
                "productDetails": {
                "tagline": "Built for comfort and stability.",
                "benefits": [
                    "React foam for soft, responsive cushioning.",
                    "Flyknit upper for a snug, breathable fit."
                ],
                "productDetails": ["Weight: 310g", "Stack Height: 36mm"]
                },
                "sizeAndFit": {
                "recommendationText": "Fits true to size."
                },
                "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                "text": "Now available with an updated color palette."
                },
                "discount": null,
                "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false }
                ]
            },
            {
                "name": "Nike Free RN 5.0",
                "category": "Training Shoes",
                "price": 129900,
                "colors": [
                {
                    "name": "Black/White",
                    "images": [
                    placeholderImage
                    ],
                    "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": false
                }
                ],
                "description": "Sleek and flexible, designed to move with your foot during every stride.",
                "originCountry": ["China"],
                "productDetails": {
                "tagline": "Unrestricted flexibility for faster movements.",
                "benefits": [
                    "Free sole construction for natural motion.",
                    "Breathable mesh upper for lightweight comfort."
                ],
                "productDetails": ["Weight: 245g", "Stack Height: 22mm"]
                },
                "sizeAndFit": {
                "recommendationText": "Consider sizing up for extra comfort."
                },
                "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                "text": "Available in multiple styles."
                },
                "discount": null,
                "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
                ]
            },
            {
                "name": "Nike Air Max 270 React",
                "category": "Lifestyle Shoes",
                "price": 79900,
                "colors": [
                {
                    "name": "White/Black",
                    "images": [
                    placeholderImage
                    ],
                    "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false }
                    ],
                    "isDefault": true
                }
                ],
                "description": "Max cushioning for all-day wearability and comfort.",
                "originCountry": ["Vietnam"],
                "productDetails": {
                "tagline": "The best of Air Max cushioning.",
                "benefits": [
                    "Air Max cushioning for responsive support.",
                    "React foam for added comfort."
                ],
                "productDetails": ["Weight: 290g", "Stack Height: 32mm"]
                },
                "sizeAndFit": {
                "recommendationText": "Fits true to size for all-day comfort."
                },
                "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                "text": "Available in multiple colorways."
                },
                "discount": null,
                "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
                ]
            },
            {
                "name": "Nike Air Zoom Pegasus 39",
                "category": "Running Shoes",
                "price": 139900,
                "colors": [
                  {
                    "name": "Red/White",
                    "images": [
                      placeholderImage
                    ],
                    "sizes": [
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": false },
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": true
                  }
                ],
                "description": "Built for speed and comfort, designed for long runs.",
                "originCountry": ["USA"],
                "productDetails": {
                  "tagline": "Fly through your run.",
                  "benefits": [
                    "ZoomX foam for lightweight cushioning.",
                    "Breathable mesh upper for a secure fit."
                  ],
                  "productDetails": ["Weight: 250g", "Stack Height: 35mm"]
                },
                "sizeAndFit": {
                  "recommendationText": "Order true to size for a snug fit."
                },
                "freeDeliveryAndReturns": {
                  "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                  "text": "Now available in various colorways."
                },
                "discount": null,
                "availableSizes": [
                  { "size": getRandomSize(), "availability": true },
                  { "size": getRandomSize(), "availability": false },
                  { "size": getRandomSize(), "availability": true },
                  { "size": getRandomSize(), "availability": true }
                ]
            },
            {
            "name": "Nike React Infinity Run Flyknit",
            "category": "Running Shoes",
            "price": 160000,
            "colors": [
                {
                "name": "Black/White",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Stay comfortable and supported on every run.",
            "originCountry": ["Vietnam"],
            "productDetails": {
                "tagline": "Maximum cushioning, endless comfort.",
                "benefits": [
                "React foam for soft yet responsive cushioning.",
                "Flyknit upper for breathability and flexibility."
                ],
                "productDetails": ["Weight: 310g", "Stack Height: 36mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Fits true to size with extra cushioning."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Available in more colors coming soon."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Nike Air Zoom Structure 24",
            "category": "Running Shoes",
            "price": 149900,
            "colors": [
                {
                "name": "Blue/Black",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Designed for stability and comfort during long runs.",
            "originCountry": ["China"],
            "productDetails": {
                "tagline": "Stability meets speed.",
                "benefits": [
                "Zoom Air cushioning for responsive support.",
                "Engineered mesh upper for enhanced airflow."
                ],
                "productDetails": ["Weight: 320g", "Stack Height: 30mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Order half a size up for added comfort."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "More color options available soon."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Nike Air Max 90",
            "category": "Lifestyle Shoes",
            "price": 129900,
            "colors": [
                {
                "name": "White/Red",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false }
                ],
                "isDefault": true
                }
            ],
            "description": "Iconic design with Max Air cushioning for everyday comfort.",
            "originCountry": ["Indonesia"],
            "productDetails": {
                "tagline": "Comfort, style, and cushioning.",
                "benefits": [
                "Max Air cushioning for responsive comfort.",
                "Durable leather upper for long-lasting wear."
                ],
                "productDetails": ["Weight: 350g", "Stack Height: 34mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Fits true to size for comfort and style."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Classic colorways for every occasion."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Nike Air Force 1 '07",
            "category": "Lifestyle Shoes",
            "price": 89900,
            "colors": [
                {
                "name": "Black/White",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Timeless style with Air cushioning for everyday comfort.",
            "originCountry": ["China"],
            "productDetails": {
                "tagline": "An icon reimagined.",
                "benefits": [
                "Air cushioning for all-day wearability.",
                "Soft leather upper for comfort and style."
                ],
                "productDetails": ["Weight: 400g", "Stack Height: 35mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Fits true to size with a classic look."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Available in a range of iconic colors."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
            ]
            },    
            {
                "name": "Nike Air Zoom Pegasus 39",
                "category": "Running Shoes",
                "price": 139900,
                "colors": [
                {
                    "name": "Red/White",
                    "images": [
                    placeholderImage
                    ],
                    "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": true
                }
                ],
                "description": "Built for speed and comfort, designed for long runs.",
                "originCountry": ["USA"],
                "productDetails": {
                "tagline": "Fly through your run.",
                "benefits": [
                    "ZoomX foam for lightweight cushioning.",
                    "Breathable mesh upper for a secure fit."
                ],
                "productDetails": ["Weight: 250g", "Stack Height: 35mm"]
                },
                "sizeAndFit": {
                "recommendationText": "Order true to size for a snug fit."
                },
                "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                "text": "Now available in various colorways."
                },
                "discount": null,
                "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
                ]
            },
            {
                "name": "Nike React Infinity Run Flyknit",
                "category": "Running Shoes",
                "price": 160000,
                "colors": [
                {
                    "name": "Black/White",
                    "images": [
                    placeholderImage
                    ],
                    "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": true
                }
                ],
                "description": "Stay comfortable and supported on every run.",
                "originCountry": ["Vietnam"],
                "productDetails": {
                "tagline": "Maximum cushioning, endless comfort.",
                "benefits": [
                    "React foam for soft yet responsive cushioning.",
                    "Flyknit upper for breathability and flexibility."
                ],
                "productDetails": ["Weight: 310g", "Stack Height: 36mm"]
                },
                "sizeAndFit": {
                "recommendationText": "Fits true to size with extra cushioning."
                },
                "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                "text": "Available in more colors coming soon."
                },
                "discount": null,
                "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
                ]
            },
            {
                "name": "Nike Air Zoom Structure 24",
                "category": "Running Shoes",
                "price": 149900,
                "colors": [
                {
                    "name": "Blue/Black",
                    "images": [
                    placeholderImage
                    ],
                    "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": true
                }
                ],
                "description": "Designed for stability and comfort during long runs.",
                "originCountry": ["China"],
                "productDetails": {
                "tagline": "Stability meets speed.",
                "benefits": [
                    "Zoom Air cushioning for responsive support.",
                    "Engineered mesh upper for enhanced airflow."
                ],
                "productDetails": ["Weight: 320g", "Stack Height: 30mm"]
                },
                "sizeAndFit": {
                "recommendationText": "Order half a size up for added comfort."
                },
                "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                "text": "More color options available soon."
                },
                "discount": null,
                "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
                ]
            },
            {
                "name": "Nike Air Max 90",
                "category": "Lifestyle Shoes",
                "price": 129900,
                "colors": [
                {
                    "name": "White/Red",
                    "images": [
                    placeholderImage
                    ],
                    "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false }
                    ],
                    "isDefault": true
                }
                ],
                "description": "Iconic design with Max Air cushioning for everyday comfort.",
                "originCountry": ["Indonesia"],
                "productDetails": {
                "tagline": "Comfort, style, and cushioning.",
                "benefits": [
                    "Max Air cushioning for responsive comfort.",
                    "Durable leather upper for long-lasting wear."
                ],
                "productDetails": ["Weight: 350g", "Stack Height: 34mm"]
                },
                "sizeAndFit": {
                "recommendationText": "Fits true to size for comfort and style."
                },
                "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                "text": "Classic colorways for every occasion."
                },
                "discount": null,
                "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
                ]
            },
            {
                "name": "Nike Air Force 1 '07",
                "category": "Lifestyle Shoes",
                "price": 89900,
                "colors": [
                {
                    "name": "Black/White",
                    "images": [
                    placeholderImage
                    ],
                    "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": true
                }
                ],
                "description": "Timeless style with Air cushioning for everyday comfort.",
                "originCountry": ["China"],
                "productDetails": {
                "tagline": "An icon reimagined.",
                "benefits": [
                    "Air cushioning for all-day wearability.",
                    "Soft leather upper for comfort and style."
                ],
                "productDetails": ["Weight: 400g", "Stack Height: 35mm"]
                },
                "sizeAndFit": {
                "recommendationText": "Fits true to size with a classic look."
                },
                "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                "text": "Available in a range of iconic colors."
                },
                "discount": null,
                "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
                ]
            },
            {
                "name": "Nike Air Zoom Pegasus 39",
                "category": "Running Shoes",
                "price": 139900,
                "colors": [
                  {
                    "name": "Red/White",
                    "images": [
                      placeholderImage
                    ],
                    "sizes": [
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": false },
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": true
                  }
                ],
                "description": "Built for speed and comfort, designed for long runs.",
                "originCountry": ["USA"],
                "productDetails": {
                  "tagline": "Fly through your run.",
                  "benefits": [
                    "ZoomX foam for lightweight cushioning.",
                    "Breathable mesh upper for a secure fit."
                  ],
                  "productDetails": ["Weight: 250g", "Stack Height: 35mm"]
                },
                "sizeAndFit": {
                  "recommendationText": "Order true to size for a snug fit."
                },
                "freeDeliveryAndReturns": {
                  "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                  "text": "Now available in various colorways."
                },
                "discount": null,
                "availableSizes": [
                  { "size": getRandomSize(), "availability": true },
                  { "size": getRandomSize(), "availability": false },
                  { "size": getRandomSize(), "availability": true },
                  { "size": getRandomSize(), "availability": true }
                ]
            },
            {
            "name": "Nike React Infinity Run Flyknit",
            "category": "Running Shoes",
            "price": 160000,
            "colors": [
                {
                "name": "Black/White",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Stay comfortable and supported on every run.",
            "originCountry": ["Vietnam"],
            "productDetails": {
                "tagline": "Maximum cushioning, endless comfort.",
                "benefits": [
                "React foam for soft yet responsive cushioning.",
                "Flyknit upper for breathability and flexibility."
                ],
                "productDetails": ["Weight: 310g", "Stack Height: 36mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Fits true to size with extra cushioning."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Available in more colors coming soon."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Nike Air Zoom Structure 24",
            "category": "Running Shoes",
            "price": 149900,
            "colors": [
                {
                "name": "Blue/Black",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Designed for stability and comfort during long runs.",
            "originCountry": ["China"],
            "productDetails": {
                "tagline": "Stability meets speed.",
                "benefits": [
                "Zoom Air cushioning for responsive support.",
                "Engineered mesh upper for enhanced airflow."
                ],
                "productDetails": ["Weight: 320g", "Stack Height: 30mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Order half a size up for added comfort."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "More color options available soon."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Nike Air Max 90",
            "category": "Lifestyle Shoes",
            "price": 129900,
            "colors": [
                {
                "name": "White/Red",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false }
                ],
                "isDefault": true
                }
            ],
            "description": "Iconic design with Max Air cushioning for everyday comfort.",
            "originCountry": ["Indonesia"],
            "productDetails": {
                "tagline": "Comfort, style, and cushioning.",
                "benefits": [
                "Max Air cushioning for responsive comfort.",
                "Durable leather upper for long-lasting wear."
                ],
                "productDetails": ["Weight: 350g", "Stack Height: 34mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Fits true to size for comfort and style."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Classic colorways for every occasion."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Nike Air Force 1 '07",
            "category": "Lifestyle Shoes",
            "price": 89900,
            "colors": [
                {
                "name": "Black/White",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Timeless style with Air cushioning for everyday comfort.",
            "originCountry": ["China"],
            "productDetails": {
                "tagline": "An icon reimagined.",
                "benefits": [
                "Air cushioning for all-day wearability.",
                "Soft leather upper for comfort and style."
                ],
                "productDetails": ["Weight: 400g", "Stack Height: 35mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Fits true to size with a classic look."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Available in a range of iconic colors."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
                "name": "Nike Air Zoom Pegasus 39",
                "category": "Running Shoes",
                "price": 139900,
                "colors": [
                  {
                    "name": "Red/White",
                    "images": [
                      placeholderImage
                    ],
                    "sizes": [
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": false },
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": true
                  }
                ],
                "description": "Built for speed and comfort, designed for long runs.",
                "originCountry": ["USA", "China", "Vietnam"],
                "productDetails": {
                  "tagline": "Fly through your run.",
                  "benefits": [
                    "ZoomX foam for lightweight cushioning.",
                    "Breathable mesh upper for a secure fit."
                  ],
                  "productDetails": ["Weight: 250g", "Stack Height: 35mm"]
                },
                "sizeAndFit": {
                  "recommendationText": "Order true to size for a snug fit."
                },
                "freeDeliveryAndReturns": {
                  "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                  "text": "Now available in various colorways."
                },
                "discount": null,
                "availableSizes": [
                  { "size": getRandomSize(), "availability": true },
                  { "size": getRandomSize(), "availability": false },
                  { "size": getRandomSize(), "availability": true },
                  { "size": getRandomSize(), "availability": true }
                ]
            },
            {
            "name": "Nike React Infinity Run Flyknit",
            "category": "Running Shoes",
            "price": 160000,
            "colors": [
                {
                "name": "Black/White",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Stay comfortable and supported on every run.",
            "originCountry": ["Vietnam", "Indonesia", "USA"],
            "productDetails": {
                "tagline": "Maximum cushioning, endless comfort.",
                "benefits": [
                "React foam for soft yet responsive cushioning.",
                "Flyknit upper for breathability and flexibility."
                ],
                "productDetails": ["Weight: 310g", "Stack Height: 36mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Fits true to size with extra cushioning."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Available in more colors coming soon."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Nike Air Zoom Structure 24",
            "category": "Running Shoes",
            "price": 149900,
            "colors": [
                {
                "name": "Blue/Black",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Designed for stability and comfort during long runs.",
            "originCountry": ["China", "India", "Vietnam"],
            "productDetails": {
                "tagline": "Stability meets speed.",
                "benefits": [
                "Zoom Air cushioning for responsive support.",
                "Engineered mesh upper for enhanced airflow."
                ],
                "productDetails": ["Weight: 320g", "Stack Height: 30mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Order half a size up for added comfort."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "More color options available soon."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Nike Air Max 90",
            "category": "Lifestyle Shoes",
            "price": 129900,
            "colors": [
                {
                "name": "White/Red",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false }
                ],
                "isDefault": true
                }
            ],
            "description": "Iconic design with Max Air cushioning for everyday comfort.",
            "originCountry": ["Indonesia", "China", "Vietnam"],
            "productDetails": {
                "tagline": "Comfort, style, and cushioning.",
                "benefits": [
                "Max Air cushioning for responsive comfort.",
                "Durable leather upper for long-lasting wear."
                ],
                "productDetails": ["Weight: 350g", "Stack Height: 34mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Fits true to size for comfort and style."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Classic colorways for every occasion."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Nike Air Force 1 '07",
            "category": "Lifestyle Shoes",
            "price": 89900,
            "colors": [
                {
                "name": "Black/White",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Timeless style with Air cushioning for everyday comfort.",
            "originCountry": ["China", "Vietnam", "Indonesia"],
            "productDetails": {
                "tagline": "An icon reimagined.",
                "benefits": [
                "Air cushioning for all-day wearability.",
                "Soft leather upper for comfort and style."
                ],
                "productDetails": ["Weight: 400g", "Stack Height: 35mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Fits true to size with a classic look."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Available in a range of iconic colors."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
                "name": "Nike ZoomX Invincible Run Flyknit",
                "category": "Running Shoes",
                "price": 180000,
                "colors": [
                  {
                    "name": "Vivid Purple/Black",
                    "images": [
                      placeholderImage
                    ],
                    "sizes": [
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": true },
                      { "size": getRandomSize(), "availability": false },
                      { "size": getRandomSize(), "availability": true }
                    ],
                    "isDefault": true
                  }
                ],
                "description": "Unmatched comfort for long-distance running.",
                "originCountry": ["USA", "China", "Vietnam", "Indonesia"],
                "productDetails": {
                  "tagline": "Ultra-soft cushioning for all-day comfort.",
                  "benefits": [
                    "ZoomX foam for maximum energy return.",
                    "Flyknit upper for breathable, supportive fit."
                  ],
                  "productDetails": ["Weight: 330g", "Stack Height: 35mm"]
                },
                "sizeAndFit": {
                  "recommendationText": "Fits true to size for a secure fit."
                },
                "freeDeliveryAndReturns": {
                  "text": FREE_DELIVERY_AND_RETURNS_TEXT
                },
                "moreInfo": {
                  "text": "Perfect for long runs and recovery."
                },
                "discount": null,
                "availableSizes": [
                  { "size": getRandomSize(), "availability": true },
                  { "size": getRandomSize(), "availability": false },
                  { "size": getRandomSize(), "availability": true }
                ]
            },
            {
            "name": "Nike Air Zoom Terra Kiger 8",
            "category": "Trail Running Shoes",
            "price": 140000,
            "colors": [
                {
                "name": "Green/Black",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Engineered for rugged trails and rough terrain.",
            "originCountry": ["USA", "Vietnam", "China", "Mexico"],
            "productDetails": {
                "tagline": "Conquer the trails with confidence.",
                "benefits": [
                "Aggressive tread pattern for superior grip.",
                "Zoom Air cushioning for responsive support."
                ],
                "productDetails": ["Weight: 280g", "Stack Height: 28mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Order true to size for a stable fit."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Available in different trail-specific colorways."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false }
            ]
            },
            {
            "name": "Nike Blazer Mid '77 Vintage",
            "category": "Lifestyle Shoes",
            "price": 119900,
            "colors": [
                {
                "name": "White/Red",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "A timeless classic with vintage details.",
            "originCountry": ["China", "Vietnam", "Indonesia", "India"],
            "productDetails": {
                "tagline": "A retro look with modern comfort.",
                "benefits": [
                "Soft leather upper for a premium feel.",
                "Rubber outsole for durability and traction."
                ],
                "productDetails": ["Weight: 450g", "Stack Height: 30mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Fits true to size for a snug, comfortable fit."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Retro design available in classic colorways."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
            ]
            },
            {
            "name": "Nike Free RN 5.0",
            "category": "Running Shoes",
            "price": 129900,
            "colors": [
                {
                "name": "Black/White",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false }
                ],
                "isDefault": true
                }
            ],
            "description": "Ultra-flexible for natural movement during runs.",
            "originCountry": ["China", "Vietnam", "USA", "Indonesia"],
            "productDetails": {
                "tagline": "Flexibility for your fastest run.",
                "benefits": [
                "Free flex sole for a natural feel.",
                "Lightweight upper for breathability."
                ],
                "productDetails": ["Weight: 220g", "Stack Height: 25mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Fits true to size for a flexible, natural fit."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Available in multiple sleek color options."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false }
            ]
            },
            {
            "name": "Nike Air Max 720",
            "category": "Lifestyle Shoes",
            "price": 150000,
            "colors": [
                {
                "name": "Midnight Navy/White",
                "images": [
                    placeholderImage
                ],
                "sizes": [
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": true },
                    { "size": getRandomSize(), "availability": false },
                    { "size": getRandomSize(), "availability": true }
                ],
                "isDefault": true
                }
            ],
            "description": "Bold design with maximum cushioning.",
            "originCountry": ["USA", "Vietnam", "China", "Indonesia", "India"],
            "productDetails": {
                "tagline": "Style and comfort in every step.",
                "benefits": [
                "Max Air cushioning for all-day comfort.",
                "Breathable upper for a lightweight feel."
                ],
                "productDetails": ["Weight: 380g", "Stack Height: 38mm"]
            },
            "sizeAndFit": {
                "recommendationText": "Fits true to size for all-day comfort."
            },
            "freeDeliveryAndReturns": {
                "text": FREE_DELIVERY_AND_RETURNS_TEXT
            },
            "moreInfo": {
                "text": "Available in multiple colors and editions."
            },
            "discount": null,
            "availableSizes": [
                { "size": getRandomSize(), "availability": true },
                { "size": getRandomSize(), "availability": false },
                { "size": getRandomSize(), "availability": true }
            ]
            },
          ];

        // Save shoe to MongoDB
        await Shoe.insertMany(shoeData);
        console.log('Shoe seeded successfully:');
    } catch (error) {
        console.error('Error seeding shoes:', error);
    }
};

// Run the seeder
const runProductSeeder = async () => {
    await connectDB();
    await seedShoe();
    mongoose.disconnect(); // Disconnect after seeding
};

runProductSeeder();