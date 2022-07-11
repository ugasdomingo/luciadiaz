// Import tools
import { Schema, model } from "mongoose";

//Create Regiter Schema
const registerSchema = new Schema({
  date: {
    types: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})


export default model('Register', registerSchema);