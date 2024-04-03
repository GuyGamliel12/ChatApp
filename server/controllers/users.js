const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

    if (!emailRegex.test(email))
      throw "Email is not supported from your domain.";
    if (password.length < 6)
      throw "Password must be at least 6 characters long.";

    const userExists = await User.findOne({ email });

    if (userExists) throw "User with the same email already exists.";

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({
      message: "User [" + name + "] registered successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.toString(),
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw "Email and Password did not match.";

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw "Email and Password did not match.";

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({
      message: "User logged in successfully!",
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: error.toString(),
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.json({
      message: "User logged out successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.toString(),
    });
  }
};
