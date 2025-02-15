const passport = require("passport");

const verifyCallback = (req, resolve, reject) => (err, user, info) => {
    if (err || info || !user) {
        return reject(new Error("Unauthorized")); // Better error message
    }
    req.user = user;
    resolve();
};

const auth = (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
    })
    .then(() => next())
    .catch((err) => {
        res.status(401).json({ message: "Authentication failed", error: err.message });
    });
};

module.exports = auth;
