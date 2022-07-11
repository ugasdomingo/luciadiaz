//Tools Import 
import mongoose from 'mongoose'; 


//Connect to MongoDB 
export const startConnection = async () => {
  try {
    const db = await mongoose.connect('mongodb+srv://db_user_silicit:eZsoeZPr5KPd9Q29@cluster0.l0syt.mongodb.net/lucia_db');
    console.log ('Connected to ' + db.connections[0].name)
  } catch (error) {
    console.error(error);
  }
}