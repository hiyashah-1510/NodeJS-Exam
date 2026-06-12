const Comment = require("../models/Comment");

const Recipe = require("../models/Recipe");

exports.addComment = async (req, res) => {

    const comment = await Comment.create({

        message: req.body.message,

        recipeId: req.params.id,

        userId: req.user.id
    });

    await Recipe.findByIdAndUpdate(
        req.params.id,
        {
            $push: {
                comments: comment._id
            }
        }
    );

    res.redirect(`/recipe/${req.params.id}`);
};