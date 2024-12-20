const express = require("express");

const { createUser } = require("../controllers/userSignupController");
const { userLogin } = require("../controllers/userLoginController");

const router = express.Router();

router.post("/usersignup", createUser);
router.post("/userlogin", userLogin);
module.exports = router;
