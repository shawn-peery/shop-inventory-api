const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_KEY;

module.exports = async (req, res, next) => {
  if (req === undefined) {
    console.error("Received request is undefined");
  }
  const token = req.header("auth");

  if (token) {
    try {
      const decoded = await jwt.verify(token, JWT_KEY);
      res.locals.token = token;
      next();
      return;
    } catch (err) {
      console.error("Invalid JWT token");
      res
        .status(401)
        .send(
          "You must be logged in to see this page! Please send a authorization token!"
        );
      return;
    }
  }

  res
    .status(401)
    .send(
      "You must be logged in to see this page! Please send a authorization token!"
    );
};
