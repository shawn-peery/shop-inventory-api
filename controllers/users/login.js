const User = require("../../data/schemas/users.schema");
const JWT_KEY = process.env.JWT_KEY;
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const body = req.body;

  try {
    const user = await User.findOne({
      $or: [
        { username: body["username/email"] },
        { email: body["username/email"] },
      ],
    });

    if (!user) {
      res.status(400).send("Couldn't authenticate you.");
      return;
    }

    user.comparePassword(body.password, async function (err, isMatch) {
      if (err) {
        console.error("Error receiving request. Error:");
        console.error(err);
        res.status(400).send(err);
        return;
      }

      if (!isMatch) {
        console.error("INVALID CREDENTIALS!");
        res.status(400).send(err);
        return;
      }

      // Attach Token
      const token = await jwt.sign({ _id: user._id, role: user.role }, JWT_KEY);
      res.set("auth", token);
      res.set("Access-Control-Expose-Headers", "auth");
      res.json(user);
    });
  } catch (err) {
    console.error("Error receiving request. Error:");
    console.error(err);
    res.status(400).send(err);
  }
};
