const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_KEY;

module.exports = (req, res, next) => {
  const token = req.header('auth');
  if (token) {
    
  }
};
