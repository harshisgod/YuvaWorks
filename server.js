const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://raghav5119052023:raghav5119052023@cluster0.yuxddxw.mongodb.net/yuvaworks?retryWrites=true&w=majority', {
    dbName: 'yuvaworks'
})
.then(() => {
    console.log('✅ Successfully connected to MongoDB.');
})
.catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message);
});

// Monitor database connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    profilePic: String,
    authProvider: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/api/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Google OAuth route handler
app.post('/auth/google', async (req, res) => {
    try {
        const { email, firstName, lastName, profilePic } = req.body;
        
        // Check if user exists
        let user = await User.findOne({ email });
        
        if (!user) {
            // Create new user if doesn't exist
            user = new User({
                firstName,
                lastName,
                email,
                profilePic,
                authProvider: 'google'
            });
            await user.save();
        }
        
        res.status(200).json({ 
            message: 'Google authentication successful',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePic: user.profilePic
            }
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({ message: 'Authentication failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
