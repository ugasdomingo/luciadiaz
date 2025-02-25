//Import tools
import mongoose from 'mongoose';

//Connect to database
export const connect = async () => {
    try {
        const db: any = await mongoose.connect(process.env.DATABASE as string);
        console.log(`Connected to ${db.connections[0].name} `);
    } catch (error) {
        console.log('Error connecting to database', error);
    }
};
