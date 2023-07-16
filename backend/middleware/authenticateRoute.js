const jwt = require("jsonwebtoken");

const authenticateRoute = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization Token Required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.SECRET);

    if (!decode) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = decode;
    console.log(decode);
    next();
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const hasRole = (roles) => {
  return (req, res, next) => {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }
    const lowercasedRoles = roles.map((role) => role.toLowerCase());

    if (!req.user || !req.user.role) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    // Convert the user's role to lowercase
    const userRoleLowercased = req.user.role.toLowerCase();

    // Check if the user's role (converted to lowercase) is included in the allowed roles array (also converted to lowercase)
    if (!lowercasedRoles.includes(userRoleLowercased)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    next();
  };
};

const isOwner = (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ error: "U" });
  }
  if (req.params.id !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};
module.exports = { authenticateRoute, hasRole, isOwner };
