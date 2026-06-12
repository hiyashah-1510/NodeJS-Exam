const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({

    title: String,

    ingredients: String,

    instructions: String,

    image: String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Recipe",
    recipeSchema
);