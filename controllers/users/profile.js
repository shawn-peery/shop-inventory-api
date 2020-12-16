const jwt = require("jsonwebtoken");

exports.profile = (req, res) => {
  console.log("HELLO");

  var decoded = jwt.decode(res.locals.token);

  console.log("decoded");
  console.log(decoded);
};
