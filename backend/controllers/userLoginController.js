const bcrypt = require("bcrypt");
const User = require("../models/User");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the admin by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Compare the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Respond with success message and admin info
    res.status(200).json({
      message: "Login successful.",
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { userLogin };
