import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

export const ISO8601 = (date) => {
  return new Date(date).toISOString();
}

const oxygen = new mongoose.Schema({
  createdAt: { type: Date, default: ISO8601(Date.now()) },
  value: { type: Number, required: true },
}, { versionKey: false });

export const Oxygen = mongoose.model("Oxygen", oxygen);