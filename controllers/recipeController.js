const Recipe = require("../models/Recipe");

// All Recipes
exports.recipeList = async (req, res) => {

    const recipes = await Recipe.find()
        .populate("createdBy");

    res.render("recipeList", {
        recipes
    });
};

// Add Recipe Page
exports.recipeForm = (req, res) => {
    res.render("recipeForm");
};

// Add Recipe
exports.addRecipe = async (req, res) => {

    await Recipe.create({

        title: req.body.title,

        ingredients: req.body.ingredients,

        instructions: req.body.instructions,

        image: req.file.filename,

        createdBy: req.user.id

    });

    res.redirect("/recipes");
};

// My Recipes
exports.myRecipes = async (req, res) => {

    const recipes = await Recipe.find({
        createdBy: req.user.id
    });

    res.render("myRecipes", {
        recipes
    });
};

// Recipe Details
exports.recipeDetails = async (req, res) => {

    const recipe = await Recipe.findById(req.params.id)

        .populate("createdBy")

        .populate({
            path: "comments",
            populate: {
                path: "userId"
            }
        });

    res.render("recipeDetails", {
        recipe
    });
};

exports.deleteRecipe = async (req, res) => {

    const recipe = await Recipe.findById(req.params.id);

    if (
        recipe.createdBy.toString() !== req.user.id &&
        req.user.role !== "admin"
    ) {
        return res.send("Access Denied");
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.redirect("/recipes");
};

exports.editRecipePage = async (req, res) => {

    const recipe = await Recipe.findById(req.params.id);

    if (
        recipe.createdBy.toString() !== req.user.id &&
        req.user.role !== "admin"
    ) {
        return res.send("Access Denied");
    }

    res.render("editRecipe", { recipe });
};

exports.updateRecipe = async (req, res) => {

    const recipe = await Recipe.findById(req.params.id);

    if (
        recipe.createdBy.toString() !== req.user.id &&
        req.user.role !== "admin"
    ) {
        return res.send("Access Denied");
    }

    let updateData = {
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    };

    if (req.file) {
        updateData.image = req.file.filename;
    }

    await Recipe.findByIdAndUpdate(
        req.params.id,
        updateData
    );

    res.redirect("/recipes");
};