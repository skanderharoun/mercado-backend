const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = async function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ error: "No token provided, authorization denied" });
        return;
    }
    try {
        const verifiedAndDecoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = verifiedAndDecoded.userId;
        const user = await User.findById(userId);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid/Expired token" });
    }
}
