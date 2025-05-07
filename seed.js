import mongoose from "mongoose";
import { Oxygen, ISO8601 } from "./db.js";

for (let i = 0; i < 10; i++) {
  const oxygen = new Oxygen({
    createdAt: new Date(ISO8601(Date.now() - i * 1000 * 60 * 60 * 24)),
    value: Math.floor(Math.random() * 100),
  });
  await oxygen.save();
  console.log(`Saved oxygen data: ${oxygen}`);
}

console.log("Seed data created successfully!");

mongoose.disconnect();