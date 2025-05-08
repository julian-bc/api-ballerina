import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const oxygenSchema = new mongoose.Schema({
  createdAt: { 
    type: Date, 
    default: () => new Date().now().toISOString() 
  },
  value: { 
    type: Number, 
    required: true 
  }
}, { versionKey: false });

export const Oxygen = mongoose.model("Oxygen", oxygenSchema);