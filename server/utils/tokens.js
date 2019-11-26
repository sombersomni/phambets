const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET || 'secret';
function generateToken(id, username, isAdmin = false) {
    return jwt.sign({ id, username, isAdmin }, secret);
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

module.exports = { generateToken, verifyToken };