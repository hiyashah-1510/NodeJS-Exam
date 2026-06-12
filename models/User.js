const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },

    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }]

});

module.exports = mongoose.model(
    "User",
    userSchema
);