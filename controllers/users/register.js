const User = require("../../data/schemas/users.schema");

const JWT_KEY = process.env.JWT_KEY;
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const body = req.body;

  User.findOne({ username: body.username })
    .then((result) => {
      if (result) {
        // The email already exists
        res.status(400).send("This email already exists");
        return false; // Email already exists. Don't handle registration
      }
      return true; // Email doesn't exist. Handle registration
    })
    .then((handleRegistration) => {
      if (!handleRegistration) {
        return;
      }

      if (req.body.role === undefined) {
        req.body.role = "user";
      }

      const registeredUser = new User(body);

      registeredUser.save().then(async () => {
        // Attach Token
        const token = await jwt.sign(
          { _id: registeredUser._id, role: req.body.role },
          JWT_KEY
        );
        res.set("auth", token);
        res.set("Access-Control-Expose-Headers", "auth");
        res.status(200).json(registeredUser);
      });
    })
    .catch((err) => {
      console.log(`Request resulted in error:`);
      console.log(err);
      res.status(400).send(err);
    });
};
