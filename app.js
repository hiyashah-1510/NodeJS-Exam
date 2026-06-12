const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const commentRoutes = require("./routes/commentRoutes");

// Middleware
const userMiddleware = require("./middleware/userMiddleware");

const app = express();

// Database
connectDB();

// View Engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Current Logged-in User Middleware
app.use(userMiddleware);

app.use(express.static("public"));

// Routes
app.use("/", authRoutes);
app.use("/", recipeRoutes);
app.use("/", commentRoutes);

// Default Route
app.get("/", (req, res) => {
    res.redirect("/login");
});

// Server
app.listen(9007, () => {
    console.log("Server Started on Port 9007");
});