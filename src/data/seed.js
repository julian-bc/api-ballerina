import mongoose from "mongoose";
import { Oxygen } from "./db.js";

for (let i = 0; i < 20; i++) {
  const oxygen = new Oxygen({
    createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
    value: Math.floor(Math.random() * 100)
  });
  await oxygen.save();
  console.log(`Saved oxygen data: ${oxygen}`);
}

console.log("Seed data created successfully!");

mongoose.disconnect();