const jwt = require("jsonwebtoken");
const User = require('../models/user');
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token){
        return res.status(401).json({ message: " No Token, authorization denied" });

    }

    // jika ada token
    try {
        // verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error){
        res.status(401).json({ message: "Token is not valid" });
    };
}
module.exports = authMiddleware;
