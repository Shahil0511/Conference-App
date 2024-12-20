const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

// Admin login logic
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Compare the password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Respond with success message and admin info
    res.status(200).json({
      message: "Login successful.",
      admin: {
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { adminLogin };
