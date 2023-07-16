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
    next();
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const hasRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    next();
  };
};

const isOwner = () => {
  return (req, res, next) => {
    if (req.user.role === "admin") {
      next();
    } else if (req.params.id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    } else {
      next();
    }
  };
};
module.exports = { authenticateRoute, hasRole, isOwner };
