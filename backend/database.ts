//Tools Import 
import mongoose from 'mongoose';


//Connect to MongoDB 
export const startConnection = async () => {
  try {
<<<<<<< HEAD
    const db = await mongoose.connect(process.env.DATABASE as string);
=======
    const db = await mongoose.connect(process.env.DB_CONNECTION);
>>>>>>> 7a209ff3bdd19f5da48ad8329e758fc7eace2d15
    console.log ('Connected to ' + db.connections[0].name)
  } catch (error) {
    console.error(error);
  }
}
