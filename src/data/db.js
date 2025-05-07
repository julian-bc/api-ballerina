import mongoose from "mongoose";
import dotenv from "dotenv";
import { metrics } from "../utils/metrics.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const sensorSchema = new mongoose.Schema({
  createdAt: { 
    type: Date, 
    default: () => new Date().now().toISOString() 
  },
  value: { 
    type: Number, 
    required: true 
  },
  metric: { 
    type: String, 
    enum: Object.values(metrics), 
    required: true 
  }
}, { versionKey: false });

export const Sensors = mongoose.model("Sensors", sensorSchema);

export const filterByDateAndMetric = (date, metric) => {
  const start = new Date(date);
  const end = new Date();
  
  return Sensors.find({
    createdAt: { $gte: start, $lte: end },
    metric: metric
  });
}