import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const oxygenSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    default: () => new Date().now().toISOString() 
  },
  value: { 
    type: Number, 
    required: true 
  }
}, { versionKey: false });

const temperatureSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: () => new Date().now().toISOString()
  },
  value: {
    type: Number,
    required: true
  }
}, { versionKey: false });

const Temperature = mongoose.model("Temperature", temperatureSchema);
const Oxygen = mongoose.model("Oxygen", oxygenSchema);

export const collections = {
  "oxygen": Oxygen,
  "temperature": Temperature
};

export const sensorTypes = Object.keys(collections);