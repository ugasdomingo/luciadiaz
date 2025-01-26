//Import tools
import mongoose from 'mongoose';

//Connect to database
export const connect = async () => {
    try {
        const db: any = await mongoose.connect(process.env.DATABASE as string);
        console.log(`Connected to ${db.connection[0]} database`);
    } catch (error) {
        console.log('Error connecting to database', error);
    }
};
