const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // ✅ FIX 1: normalize email
    email = email.toLowerCase().trim();

    // ✅ DEBUG (optional)
    console.log("Registering:", email);

    // ✅ FIX 2: check properly
    const exists = await User.findOne({ email: email });
    if (exists) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // save user
    const user = await User.create({
      name,
      email,
      password: hashed
    });

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // ✅ SAME FIX HERE
    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid login" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid login" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};