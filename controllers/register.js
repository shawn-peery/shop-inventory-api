const User = require("../data/schemas/users.schema");

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

      const registeredUser = new User(body);

      registeredUser.save().then(() => {
        res.status(200).json(registeredUser);
      });
    })
    .catch((err) => {
      console.log(`Request resulted in error:`);
      console.log(err);
      res.status(400).send(err);
    });
};
