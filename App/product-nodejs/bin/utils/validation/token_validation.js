const jwt = require("jsonwebtoken");
require("dotenv").config();
const logger = require("../logger/log");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(403).json({
      status: "error",
      message: "You are not authorize",
    });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;

    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Invalid Token",
    });
    logger.error(err);
  }
};

module.exports = verifyToken;
