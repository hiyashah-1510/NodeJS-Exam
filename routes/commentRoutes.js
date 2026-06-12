const express = require("express");

const router = express.Router();

const commentController = require("../controllers/commentController");

const checkAuthentication = require("../middleware/authMiddleware");

router.post(
    "/comment/:id",
    checkAuthentication,
    commentController.addComment
);

module.exports = router;