// seed.js
import mongoose from 'mongoose';
import axios from 'axios';
import 'dotenv/config'; // Modern way to load .env
import User from './models/user.model.js'; // Note the .js extension

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected for seeding.');

        if (await User.countDocuments() > 0) {
            console.log('Database already seeded. Exiting.');
            return mongoose.disconnect();
        }

        const response = await axios.get('https://randomuser.me/api/?results=50&nat=us');
        const usersToSeed = response.data.results.map(user => ({
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            age: user.dob.age,
            city: user.location.city,
            picture: user.picture.large
        }));

        await User.insertMany(usersToSeed);
        console.log('Database seeded successfully with 50 users!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
    }
};

seedDatabase();