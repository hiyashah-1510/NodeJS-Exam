const jwt = require("jsonwebtoken");

const userMiddleware = (req, res, next) => {

    const token = req.cookies.token;

    if (token) {

        try {

            const decoded = jwt.verify(
                token,
                "secretKey"
            );

            res.locals.currentUser = decoded;

        } catch (err) {

            res.locals.currentUser = null;
        }

    } else {

        res.locals.currentUser = null;
    }

    next();
};

module.exports = userMiddleware;