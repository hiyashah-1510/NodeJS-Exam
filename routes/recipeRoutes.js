const express = require("express");

const router = express.Router();

const recipeController = require("../controllers/recipeController");

const checkAuthentication = require("../middleware/authMiddleware");

const isAdmin = require("../middleware/roleMiddleware");

const upload = require("../config/multer");

// ================= All Recipes =================

router.get(
    "/recipes",
    checkAuthentication,
    recipeController.recipeList
);

// ================= Add Recipe =================

router.get(
    "/recipe/add",
    checkAuthentication,
    recipeController.recipeForm
);

router.post(
    "/recipe/add",
    checkAuthentication,
    upload.single("image"),
    recipeController.addRecipe
);

// ================= My Recipes =================

router.get(
    "/my-recipes",
    checkAuthentication,
    recipeController.myRecipes
);

// ================= Recipe Details =================

router.get(
    "/recipe/:id",
    checkAuthentication,
    recipeController.recipeDetails
);

// ================= Edit Recipe =================

router.get(
    "/recipe/edit/:id",
    checkAuthentication,
    recipeController.editRecipePage
);

router.post(
    "/recipe/update/:id",
    checkAuthentication,
    upload.single("image"),
    recipeController.updateRecipe
);

// ================= Delete Recipe =================

router.get(
    "/recipe/delete/:id",
    checkAuthentication,
    isAdmin,
    recipeController.deleteRecipe
);

module.exports = router;