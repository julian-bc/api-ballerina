export const filterByDate = (date, schema) => {
  const start = new Date(date);

  console.log("Filtering data from:", start);
  // Assuming the end date is the current date
  const end = new Date();
  
  return schema.find({
    date: { $gte: start, $lte: end }
  });
}