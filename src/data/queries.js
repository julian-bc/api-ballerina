import { Oxygen } from "./db.js";

export const filterByDate = (date) => {
  const start = new Date(date);
  const end = new Date();
  
  return Oxygen.find({
    createdAt: { $gte: start, $lte: end }
  });
}