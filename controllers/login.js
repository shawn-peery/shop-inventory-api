const User = require("../data/schemas/users.schema");
const JWT_KEY = process.env.JWT_KEY;
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const body = req.body;

  try {
    const user = await User.findOne({ username: body["username/email"] });
    const email = await User.findOne({ email: body["username/email"] });

    if (!user && !email) {
      res.status(400).send("Couldn't authenticate you.");
      return;
    } else if (!user) {
      user = email;
    }

    user.comparePassword(body.password, async function (err, isMatch) {
      if (err) {
        console.error("Error receiving request. Error:");
        console.error(err);
        res.status(400).send(err);
      }

      console.log(`${body.password}:`, isMatch);

      // Attach Token
      const token = await jwt.sign({ _id: user._id, role: user.role }, JWT_KEY);
      res.set("auth", token);
      res.set("Access-Control-Expose-Headers", "auth");
      res.send({ msg: "Successfully Logged In" });
    });
  } catch (err) {
    console.error("Error receiving request. Error:");
    console.error(err);
    res.status(400).send(err);
  }
};
