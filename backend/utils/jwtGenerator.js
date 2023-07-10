const jwt = require("jsonwebtoken");

const generateJWT = (payload, secretKey) => {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: "3d" });
    return token;
  } catch (error) {
    throw new Error("Error generating JWT: " + error.message);
  }
};

module.exports = generateJWT;
