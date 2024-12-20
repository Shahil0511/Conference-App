const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

const createAdmin = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    // Validate input fields
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Email already exists in Admin." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = new Admin({
      email,
      name,
      password: hashedPassword,
    });

    await newAdmin.save();

    // Respond with success message
    res.status(201).json({
      message: "Admin created successfully.",
      admin: {
        email: newAdmin.email,
        name: newAdmin.name,
      },
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { createAdmin };
