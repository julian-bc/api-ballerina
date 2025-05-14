export const filterByDate = (date, schema) => {
  const start = new Date(date);
  const end = new Date();
  
  return schema.find({
    createdAt: { $gte: start, $lte: end }
  });
}