export const filterByDate = (date, schema) => {
  const start = new Date(date);
  const end = new Date();
  
  return schema.find({
    date: { $gte: start, $lte: end }
  });
}