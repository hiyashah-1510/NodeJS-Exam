const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= Register Page =================

exports.registerPage = (req, res) => {
    res.render("register");
};

// ================= Login Page =================

exports.loginPage = (req, res) => {
    res.render("login");
};

// ================= Register User =================

exports.registerUser = async (req, res) => {

    try {

        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.send("Email Already Registered");
        }

        const hashPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            role: req.body.role || "user"
        });

        res.redirect("/login");

    } catch (err) {

        console.log(err);

        res.send("Registration Error");
    }
};

// ================= Login User =================

exports.loginUser = async (req, res) => {

    try {

        console.log("Login Data:", req.body);

        const user = await User.findOne({
            email: req.body.email
        });

        console.log("User Found:", user);

        if (!user) {
            return res.send("Invalid Email");
        }

        const match = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!match) {
            return res.send("Invalid Password");
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            "recipe_secret_key",
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true
        });

        res.redirect("/recipes");

    } catch (err) {

        console.log(err);

        res.send("Login Error");
    }
};

// ================= Logout =================

exports.logoutUser = (req, res) => {

    res.clearCookie("token");

    res.redirect("/login");
};

// ================= Forgot Password Page =================

exports.forgotPasswordPage = (req, res) => {

    res.render("forgotPassword");
};

// ================= Forgot Password =================

exports.forgotPassword = async (req, res) => {

    try {

        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.send("User Not Found");
        }

        const hashPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        user.password = hashPassword;

        await user.save();

        res.redirect("/login");

    } catch (err) {

        console.log(err);

        res.send("Password Reset Error");
    }
};