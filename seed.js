import { Oxygen, fmtDate } from "./db.js";

for (let i = 0; i < 10; i++) {
  const oxygen = new Oxygen({
    createdAt: new Date(fmtDate(Date.now() - i * 1000 * 60 * 60 * 24)),
    value: Math.floor(Math.random() * 100),
  });
  await oxygen.save();
  console.log(`Saved oxygen data: ${oxygen}`);
}

console.log("Seed data created successfully!");

mongoose.disconnect();