// Import tools
import { Schema, model } from "mongoose";

//Create Regiter Schema
const registerSchema = new Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  description: {
    type: String,
    required: true
  }
})


export default model('Register', registerSchema);