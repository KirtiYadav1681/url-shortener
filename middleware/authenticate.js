const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "jwttokensecret");
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error("User not found or invalid token.");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Authentication failed" });
  }
};
