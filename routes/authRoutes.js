const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const checkGuest = require("../middleware/checkGuest");

// Register

router.get(
    "/register",
    checkGuest,
    authController.registerPage
);

router.post(
    "/register",
    authController.registerUser
);

// Login

router.get(
    "/login",
    checkGuest,
    authController.loginPage
);

router.post(
    "/login",
    authController.loginUser
);

// Logout

router.get(
    "/logout",
    authController.logoutUser
);

// Forgot Password

router.get(
    "/forgot-password",
    authController.forgotPasswordPage
);

router.post(
    "/forgot-password",
    authController.forgotPassword
);

module.exports = router;