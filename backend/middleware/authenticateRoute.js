const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate routes by verifying JWT.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const authenticateRoute = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token is required." });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

/**
 * Middleware to check if the user has the required role(s).
 * @param {string|string[]} roles - The role(s) to check against.
 * @returns {Function} The middleware function.
 */
const hasRole = (roles) => {
  return (req, res, next) => {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }
    const lowercasedRoles = roles.map((role) => role.toLowerCase());

    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ error: "Unauthorized. User role is missing." });
    }

    const userRoleLowercased = req.user.role.toLowerCase();
    if (!lowercasedRoles.includes(userRoleLowercased)) {
      return res
        .status(403)
        .json({ error: "Unauthorized. Insufficient role privileges." });
    }

    next();
  };
};

/**
 * Middleware to check if the user is the owner based on the ID in the request params.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const isOwner = (req, res, next) => {
  if (!req.user) {
    return res
      .status(403)
      .json({ error: "Unauthorized. User is not authenticated." });
  }
  if (req.params.id !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Unauthorized. User is not the owner." });
  }
  next();
};

module.exports = { authenticateRoute, hasRole, isOwner };
