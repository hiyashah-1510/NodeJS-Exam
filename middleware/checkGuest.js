const checkGuest = (req, res, next) => {

    if (req.cookies.token) {
        return res.redirect("/recipes");
    }

    next();
};

module.exports = checkGuest;