//Import tools
import app from './app';
import { connect } from './database';

//Main function

connect();
app.listen(process.env.PORT as string);
console.log(('Server is running on port: ' + process.env.PORT) as string);
