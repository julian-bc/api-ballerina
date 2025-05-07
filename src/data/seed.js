import mongoose from "mongoose";
import { Sensors } from "./db.js";
import { metrics } from "../utils/metrics.js";

for (let i = 0; i < 20; i++) {
  const sensor = new Sensors({
    createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
    value: Math.floor(Math.random() * 100),
    metric: metrics[Object.keys(metrics)[Math.floor(Math.random() * Object.keys(metrics).length)]]
  });
  await sensor.save();
  console.log(`Saved oxygen data: ${sensor}`);
}

console.log("Seed data created successfully!");

mongoose.disconnect();