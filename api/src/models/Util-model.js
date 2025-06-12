import { Schema, model } from "mongoose";

const utilSchema = new Schema(
    {
       last_histoty_number: {
           type: Number,
           default: 1000,
           min: 1000
       } 
    }
)

export const Util = model('Util', utilSchema);
