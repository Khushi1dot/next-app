import mongoose from 'mongoose'

export default async function connection() {
    if (mongoose.connection.readyState >= 1) return; // already connected

    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
}
