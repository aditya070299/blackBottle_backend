const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("authHeader: ", authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log("token: ", token);
    if (err) return res.sendStatus(403);

    req.user = user; // Attach user info to request object
    next();
  });
};

module.exports = authenticateToken;
