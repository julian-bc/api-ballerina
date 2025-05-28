import mongoose from "mongoose";
import { collections } from "./db.js";

for (const key in collections) {
  const schema = collections[key];

  console.log(`[🌱 SEED] Seeding collection: ${key}`);

  for (let i = 0; i < 10; i++) {
    const document = new schema({
      date: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
      value: Math.floor(Math.random() * 100)
    });
    await document.save();
    console.log(`[🌱 SEED] Saved data in ${key}: ${document}`);
  }
}

console.log("[🌱 SEED] Seed data created successfully!");

mongoose.disconnect();