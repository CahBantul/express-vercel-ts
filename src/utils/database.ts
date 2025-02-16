import mongoose from 'mongoose';
require('dotenv').config();

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI as string;
        if (!mongoURI) {
            throw new Error(
                'MongoDB connection URI is not defined in environment variables'
            );
        }

        await mongoose.connect(mongoURI, {});

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
