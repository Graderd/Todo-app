const express = require("express");
const { register, login } = require("../controllers/userController");
const { verifyEmail } = require("../controllers/verifyEmailController");
const { forgotPassword } = require("../controllers/forgotPasswordController");
const { resetPassword } = require("../controllers/resetPasswordController");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;