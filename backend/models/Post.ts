//Import tools
import { Schema, model } from "mongoose";


//Create Post Schema
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  img: {
    type: String,
  },
  body: {
    type: String,
    required: true
  }/* ,
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ] */
}, {
  versionKey: false
});


export default model('Post', postSchema)