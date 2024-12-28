import mongoose from 'mongoose';
import Product from '../Models/Product.js';
import User from '../Models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const Category = {
    Phone: 'iphone',
    Computers: 'macbook',
    Tablets: 'ipad',
    Watches: 'applewatch',
    Audio: 'airpods'
};

const db = process.env.DB_URL
const placeholderImage = "https://placehold.co/400"

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('SEEDER connected to mongodb ✅');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};


const seedProducts = async () => {
    try {
        // Clear existing products if any
        await Product.deleteMany({});
        await User.deleteMany({});

        // Create a sample user (this is for associating products with a user)
        const user = new User({
            name: 'Shawn',
            email: 'shawnlaw6669@gmail.com',
            password: 'Password!23',
            isAdmin: true,
            verified: true,
        });
        await user.save();

        const products = [
            // Phones
            {
                user: user._id,
                name: 'iPhone 14 Pro',
                image: placeholderImage,
                category: Category.Phone,
                description: 'Latest iPhone with amazing features.',
                price: 999.99,
                stockCount: 50,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'iPhone 13',
                image: placeholderImage,
                category: Category.Phone,
                description: 'Previous generation iPhone with solid performance.',
                price: 799.99,
                stockCount: 80,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Samsung Galaxy S23',
                image: placeholderImage,
                category: Category.Phone,
                description: 'Flagship Android phone with top-tier specs.',
                price: 899.99,
                stockCount: 60,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Google Pixel 7',
                image: placeholderImage,
                category: Category.Phone,
                description: 'A premium Android phone with a clean OS experience.',
                price: 699.99,
                stockCount: 40,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'OnePlus 11',
                image: placeholderImage,
                category: Category.Phone,
                description: 'Fast, affordable, and powerful Android phone.',
                price: 749.99,
                stockCount: 70,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Samsung Galaxy Z Fold 5',
                image: placeholderImage,
                category: Category.Phone,
                description: 'Premium foldable phone with cutting-edge technology.',
                price: 1799.99,
                stockCount: 30,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Xiaomi Mi 13',
                image: placeholderImage,
                category: Category.Phone,
                description: 'Affordable high-performance phone from Xiaomi.',
                price: 649.99,
                stockCount: 85,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Motorola Edge 40',
                image: placeholderImage,
                category: Category.Phone,
                description: 'Premium mid-range phone from Motorola.',
                price: 599.99,
                stockCount: 55,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Sony Xperia 1 IV',
                image: placeholderImage,
                category: Category.Phone,
                description: 'A flagship phone with a focus on photography and media.',
                price: 1199.99,
                stockCount: 25,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Oppo Find X5 Pro',
                image: placeholderImage,
                category: Category.Phone,
                description: 'High-end phone with excellent display and camera.',
                price: 1099.99,
                stockCount: 60,
                views: Math.floor(Math.random() * 10001)
            },
        
            // Computers
            {
                user: user._id,
                name: 'MacBook Pro 16"',
                image: placeholderImage,
                category: Category.Computers,
                description: 'Powerful MacBook Pro for professionals.',
                price: 2399.99,
                stockCount: 30,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'MacBook Air M2',
                image: placeholderImage,
                category: Category.Computers,
                description: 'Lightweight and powerful laptop with Apple M2 chip.',
                price: 1299.99,
                stockCount: 45,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Dell XPS 13',
                image: placeholderImage,
                category: Category.Computers,
                description: 'Premium ultrabook with a sleek design.',
                price: 999.99,
                stockCount: 60,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'HP Spectre x360',
                image: placeholderImage,
                category: Category.Computers,
                description: '2-in-1 convertible laptop with high performance.',
                price: 1499.99,
                stockCount: 40,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Asus ROG Zephyrus G14',
                image: placeholderImage,
                category: Category.Computers,
                description: 'Compact gaming laptop with powerful specs.',
                price: 1799.99,
                stockCount: 50,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Microsoft Surface Laptop 5',
                image: placeholderImage,
                category: Category.Computers,
                description: 'Thin and light laptop with high resolution touchscreen.',
                price: 1199.99,
                stockCount: 35,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Lenovo ThinkPad X1 Carbon',
                image: placeholderImage,
                category: Category.Computers,
                description: 'Business-oriented laptop with excellent durability.',
                price: 1499.99,
                stockCount: 45,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Razer Blade 15',
                image: placeholderImage,
                category: Category.Computers,
                description: 'Premium gaming laptop with thin profile.',
                price: 2199.99,
                stockCount: 30,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Acer Predator Helios 300',
                image: placeholderImage,
                category: Category.Computers,
                description: 'High-performance gaming laptop with great cooling.',
                price: 1599.99,
                stockCount: 60,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Google Pixelbook Go',
                image: placeholderImage,
                category: Category.Computers,
                description: 'Light and affordable Chromebook from Google.',
                price: 649.99,
                stockCount: 100,
                views: Math.floor(Math.random() * 10001)
            },
        
            // Tablets
            {
                user: user._id,
                name: 'iPad Pro 11"',
                image: placeholderImage,
                category: Category.Tablets,
                description: 'Portable and powerful tablet from Apple.',
                price: 799.99,
                stockCount: 100,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Samsung Galaxy Tab S8',
                image: placeholderImage,
                category: Category.Tablets,
                description: 'High-end Android tablet with great display.',
                price: 899.99,
                stockCount: 90,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Microsoft Surface Pro 9',
                image: placeholderImage,
                category: Category.Tablets,
                description: 'Versatile tablet with detachable keyboard for productivity.',
                price: 1099.99,
                stockCount: 60,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Lenovo Tab P12 Pro',
                image: placeholderImage,
                category: Category.Tablets,
                description: 'Premium tablet with a 12.6-inch AMOLED display.',
                price: 799.99,
                stockCount: 50,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Amazon Fire HD 10',
                image: placeholderImage,
                category: Category.Tablets,
                description: 'Affordable tablet with great performance for entertainment.',
                price: 149.99,
                stockCount: 200,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Huawei MatePad Pro 12.6"',
                image: placeholderImage,
                category: Category.Tablets,
                description: 'Flagship Android tablet with powerful specs.',
                price: 799.99,
                stockCount: 40,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Xiaomi Pad 5',
                image: placeholderImage,
                category: Category.Tablets,
                description: 'Affordable tablet with solid performance.',
                price: 349.99,
                stockCount: 80,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Vivo Tab 11',
                image: placeholderImage,
                category: Category.Tablets,
                description: 'Budget-friendly tablet with good specs for its price.',
                price: 299.99,
                stockCount: 100,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Samsung Galaxy Tab A8',
                image: placeholderImage,
                category: Category.Tablets,
                description: 'Affordable and reliable Android tablet for basic tasks.',
                price: 229.99,
                stockCount: 120,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Apple iPad 10.2"',
                image: placeholderImage,
                category: Category.Tablets,
                description: 'Affordable iPad with good performance.',
                price: 329.99,
                stockCount: 130,
                views: Math.floor(Math.random() * 10001)
            },
        
            // Watches
            {
                user: user._id,
                name: 'Apple Watch Series 8',
                image: placeholderImage,
                category: Category.Watches,
                description: 'Smartwatch with health monitoring features.',
                price: 399.99,
                stockCount: 80,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Samsung Galaxy Watch 5',
                image: placeholderImage,
                category: Category.Watches,
                description: 'Smartwatch with fitness tracking and great display.',
                price: 279.99,
                stockCount: 100,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Garmin Forerunner 945',
                image: placeholderImage,
                category: Category.Watches,
                description: 'GPS smartwatch designed for athletes and outdoor enthusiasts.',
                price: 599.99,
                stockCount: 40,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Fitbit Charge 5',
                image: placeholderImage,
                category: Category.Watches,
                description: 'Fitness tracker with built-in GPS and heart rate monitoring.',
                price: 179.99,
                stockCount: 120,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Garmin Fenix 7',
                image: placeholderImage,
                category: Category.Watches,
                description: 'Rugged smartwatch with great battery life and GPS.',
                price: 699.99,
                stockCount: 50,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Amazfit GTR 3 Pro',
                image: placeholderImage,
                category: Category.Watches,
                description: 'Affordable smartwatch with great performance and health tracking.',
                price: 199.99,
                stockCount: 150,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Fossil Gen 6',
                image: placeholderImage,
                category: Category.Watches,
                description: 'Stylish smartwatch with Wear OS and good fitness features.',
                price: 299.99,
                stockCount: 70,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Suunto 9 Peak',
                image: placeholderImage,
                category: Category.Watches,
                description: 'Smartwatch designed for extreme sports and outdoor adventures.',
                price: 499.99,
                stockCount: 45,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Withings Steel HR Sport',
                image: placeholderImage,
                category: Category.Watches,
                description: 'Hybrid smartwatch with heart rate monitoring and long battery life.',
                price: 199.99,
                stockCount: 85,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Huawei Watch GT 3 Pro',
                image: placeholderImage,
                category: Category.Watches,
                description: 'Luxury smartwatch with health and fitness features.',
                price: 399.99,
                stockCount: 60,
                views: Math.floor(Math.random() * 10001)
            },
        
            // Audio
            {
                user: user._id,
                name: 'AirPods Pro 2nd Gen',
                image: placeholderImage,
                category: Category.Audio,
                description: 'Noise-canceling true wireless earphones.',
                price: 249.99,
                stockCount: 150,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Beats Studio Buds',
                image: placeholderImage,
                category: Category.Audio,
                description: 'Compact wireless earbuds with active noise canceling.',
                price: 149.99,
                stockCount: 180,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Sony WH-1000XM5',
                image: placeholderImage,
                category: Category.Audio,
                description: 'Industry-leading noise-canceling headphones.',
                price: 349.99,
                stockCount: 120,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Bose QuietComfort 45',
                image: placeholderImage,
                category: Category.Audio,
                description: 'Top-tier noise-canceling headphones.',
                price: 329.99,
                stockCount: 100,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Sennheiser Momentum 4',
                image: placeholderImage,
                category: Category.Audio,
                description: 'High-fidelity wireless headphones with excellent sound quality.',
                price: 379.99,
                stockCount: 85,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'JBL Live 650BTNC',
                image: placeholderImage,
                category: Category.Audio,
                description: 'Wireless headphones with active noise cancellation.',
                price: 129.99,
                stockCount: 150,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Bang & Olufsen Beoplay H95',
                image: placeholderImage,
                category: Category.Audio,
                description: 'Luxury wireless headphones with premium materials.',
                price: 799.99,
                stockCount: 40,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'AKG N700NC M2',
                image: placeholderImage,
                category: Category.Audio,
                description: 'Noise-canceling headphones with great sound quality.',
                price: 349.99,
                stockCount: 55,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Audio-Technica ATH-M50x',
                image: placeholderImage,
                category: Category.Audio,
                description: 'Professional-grade headphones with a focus on sound accuracy.',
                price: 169.99,
                stockCount: 120,
                views: Math.floor(Math.random() * 10001)
            },
            {
                user: user._id,
                name: 'Anker Soundcore Liberty 3 Pro',
                image: placeholderImage,
                category: Category.Audio,
                description: 'True wireless earphones with great sound and noise canceling.',
                price: 169.99,
                stockCount: 160,
                views: Math.floor(Math.random() * 10001)
            },
        ];
        
        await Product.insertMany(products);

        console.log('Sample products have been seeded.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

// Run the seeder
const runProductSeeder = async () => {
    await connectDB();
    await seedProducts();
};

runProductSeeder();
