const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (req.user && allowedRoles.includes (req.user.role)) {
            next();
        } else {
            res.status(403).json({ message: " Access denied" });
        }

    };
};

module.exports = roleMiddleware;