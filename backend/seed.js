import mongoose from 'mongoose';
import axios from 'axios';
import 'dotenv/config';
import User from './models/user.model.js';

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected for seeding.');

        // This check is important. It should now find 0 users.
        if (await User.countDocuments() > 0) {
            console.log('Database already has data. If you want to re-seed, please clear the users collection first.');
            return mongoose.disconnect();
        }

        console.log('Fetching 50 new users from randomuser.me...');
        const response = await axios.get('https://randomuser.me/api/?results=50&nat=us');

        // This part maps the API data to match YOUR schema perfectly
        const usersToSeed = response.data.results.map(user => ({
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            age: user.dob.age,
            city: user.location.city,
            picture: user.picture.large // This provides the image URL
        }));

        await User.insertMany(usersToSeed);
        console.log('Database seeded successfully with 50 correctly formatted users!');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
    }
};

seedDatabase();