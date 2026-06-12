const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({

    message: {
        type: String,
        required: true
    },

    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Comment",
    commentSchema
);