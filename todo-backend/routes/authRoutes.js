const express = require("express");
const { register, login } = require("../controllers/userController");
const { verifyEmail } = require("../controllers/verifyEmailController");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail);

module.exports = router;