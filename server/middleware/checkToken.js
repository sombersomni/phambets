const { verifyToken } = require('../utils/tokens');

function checkToken(req, res, next) {
    //get the token from the header if present
    console.log(req.headers["x-access-token"]);
    const token = req.body.token || req.headers["x-access-token"] || req.headers["authorization"];
    //if no token found, return response (without going to the next middelware)
    // if (!token) return res.status(401).send("Access denied. No token provided.");
    console.log(token, 'token here');
    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (e) {
        //if invalid token
        res.status(400).send("Invalid token.");
    }
}

module.exports = checkToken;