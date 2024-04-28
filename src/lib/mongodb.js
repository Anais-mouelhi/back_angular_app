import mongoose from 'mongoose';

export async function connectToDatabase() {
    const URI = process.env.MONGODB_URI;
    
    if (mongoose.connection.readyState) {
        console.log("Already connected to database");
        return mongoose;
    }

    try {
        await mongoose.connect(URI);
        return mongoose;
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error; // Lève une exception pour indiquer l'échec de la connexion
    }
}

