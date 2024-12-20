const express = require("express");

const { createAdmin } = require("../controllers/adminSignupController");
const { adminLogin } = require("../controllers/adminLoginController");

const router = express.Router();

router.post("/adminsignup", createAdmin);
router.post("/adminlogin", adminLogin);

module.exports = router;
