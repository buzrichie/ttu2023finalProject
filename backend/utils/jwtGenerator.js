const jwt = require("jsonwebtoken");

/**
 * Generate a JWT (JSON Web Token) using the provided payload and secret key.
 * @param {Object} payload - The payload to be included in the JWT.
 * @param {string} secretKey - The secret key used to sign the JWT.
 * @returns {string} The generated JWT.
 * @throws {Error} If there is an error generating the JWT.
 */
const generateJWT = (payload, secretKey) => {
  try {
    const expiresIn = "3d"; // Set the expiration time for the JWT (e.g., 3 days)
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    throw new Error(`Error generating JWT: ${error.message}`);
  }
};

module.exports = generateJWT;
