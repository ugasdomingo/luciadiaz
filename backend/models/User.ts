//Import tools
import { Schema, model } from "mongoose";

//Create User Schema
const userSchema = new Schema ({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mail: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
})


export default model('User', userSchema);