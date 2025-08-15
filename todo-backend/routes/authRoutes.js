const express = require("express");
const { register, login } = require("../controllers/userController");
const { verifyEmail } = require("../controllers/verifyEmailController");
const { forgotPassword } = require("../controllers/forgotPasswordController");
const { resetPassword } = require("../controllers/resetPasswordController");
const { body, validationResult } = require("express-validator");

const router = express.Router();

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

//Registro con validación
router.post('/register', [
    body('name').isString().isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('email').isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validateRequest
], register);

//login con validación
router.post("/login", [
    body("email").isEmail().withMessage("Debe proporcionar un correo electrónico válido"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
    validateRequest
], login);

//Verificación de email
router.get("/verify-email", verifyEmail);

//Olvide mi contraseña
router.post("/forgot-password", [
    body("email").isEmail().withMessage("Debe proporcionar un correo electrónico válido"),
    validateRequest
], forgotPassword);

//Restablecer contraseña
router.post("/reset-password", [
    body("token").notEmpty().withMessage("El token es obligatorio"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    validateRequest
], resetPassword);

module.exports = router;