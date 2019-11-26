const router = require('express').Router();
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../utils/tokens');
const db = require('../db');

router.route('/login')
    .post(async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await db.findUser(username);
            if (user) {
                const passes = await bcrypt.compare(password, user.password);
                if (passes) {
                    const { id } = user;
                    const token = generateToken(id, username);
                    console.log(token);
                    res.set('x-auth-token', token)
                    res.send({ id, username });
                } else {
                    throw new Error("Password is invalid. Try again!");
                }
            } else {
                throw new Error("User doesn't exist. Try again!");
            }

        } catch (err) {
            console.log(err);
            if (err.message) {
                res.status(401).send(err.message);
            }
        }
    })

module.exports = router;