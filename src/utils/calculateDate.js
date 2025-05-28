const rgxNumber = /\b\d+\b/;
const rgxTime = /(d[ií]a[s]?|mes(es)?|año[s]?)/i;

export function calculatePastDate(dateString) {
  if (dateString && !isNaN(Date.parse(dateString))) {
    return new Date(dateString).toISOString();
  }

  const numberMatch = dateString.match(rgxNumber);
  const timeMatch = dateString.match(rgxTime);

  if (!numberMatch || !timeMatch) {
    console.error("[ERROR] Invalid format.");
    return null;
  }
  const number = parseInt(numberMatch[0], 10);
  const time = timeMatch[0].toLowerCase();

  let newDate = new Date();

  if (time.includes("día") || time.includes("dia")) {
    newDate.setDate(newDate.getDate() - number);
  } else if (time.includes("mes")) {
    newDate.setMonth(newDate.getMonth() - number);
  } else if (time.includes("año")) {
    newDate.setFullYear(newDate.getFullYear() - number);
  } else {
    console.error("[ERROR] Unrecognized time unit.");
    return null;
  }
  return newDate.toISOString();
}