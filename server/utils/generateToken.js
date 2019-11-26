const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET || 'secret';
function generateToken(id, isAdmin = false) {
 return jwt.sign({ id, isAdmin }, secret);
}

module.exports = generateToken