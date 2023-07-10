// Function to generate a unique numerical string
async function generateNumericalString() {
  const timestamp = Date.now().toString();
  const random = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number

  return timestamp + random.toString();
}

module.exports = generateNumericalString;
