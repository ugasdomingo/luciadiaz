//Import tools
import app from './app';
import { connect } from './database';

//Main function
const main = async () => {
    //Connect to database
    await connect();
    //Start
    app.listen(app.get('port'));
    console.log('Server on port ', app.get('port'));
};

//Call main function
main();
