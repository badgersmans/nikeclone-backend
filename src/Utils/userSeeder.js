import mongoose from 'mongoose';
import User from '../Models/User.js'
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.DB_URL

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

const users = [
    {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'Password!23',
        isAdmin: false,
        verified: false,
    },
    {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        password: 'Password!23',
        isAdmin: false,
        verified: false,
    },
    {
        name: 'Alice Johnson',
        email: 'alicejohnson@example.com',
        password: 'Password!23',
        isAdmin: false,
        verified: false,
    },
    {
        name: 'Bob Brown',
        email: 'bobbrown@example.com',
        password: 'Password!23',
        isAdmin: false,
        verified: false,
    },
    {
        name: 'Charlie Davis',
        email: 'charliedavis@example.com',
        password: 'Password!23',
        isAdmin: false,
        verified: false,
    },
    {
        name: 'Emily Wilson',
        email: 'emilywilson@example.com',
        password: 'Password!23',
        isAdmin: false,
        verified: false,
    },
    {
        name: 'Michael Taylor',
        email: 'michaeltaylor@example.com',
        password: 'Password!23',
        isAdmin: false,
        verified: false,
    },
    {
        name: 'Sarah Martinez',
        email: 'sarahmartinez@example.com',
        password: 'Password!23',
        isAdmin: false,
        verified: false,
    },
    {
        name: 'David Lee',
        email: 'davidlee@example.com',
        password: 'Password!23',
        isAdmin: false,
        verified: false,
    },
    {
        name: 'Laura Harris',
        email: 'lauraharris@example.com',
        password: 'Password!23',
        isAdmin: false,
        verified: false,
    },
];

// Function to save users to the database
const seedUsers = async () => {
    try {
        for (let userData of users) {
            const { name, email, password, isAdmin, verified } = userData;

            const user = new User({
                name,
                email,
                password, // The password will be hashed automatically by the schema's pre-save middleware
                isAdmin,
                verified,
            });

            await user.save();
            console.log(`User ${name} created successfully`);
        }
        console.log('User seeding complete');
        mongoose.disconnect(); // Disconnect after seeding
    } catch (error) {
        console.error('Error seeding users:', error);
        mongoose.disconnect();
    }
};

// Run the seeder
const runUserSeeder = async () => {
    await connectDB();
    await seedUsers();
};

runUserSeeder();