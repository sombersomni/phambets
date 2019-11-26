const router = require('express').Router();
const generateToken = require('../utils/tokens');
const db = require('../db');

router.route('/login')
.post(async (req, res) => {
    const { username } = req.body;
    const user = await db.findUser(username);
    if (user) {
        const { id } = user;
        const token = generateToken(id);
        console.log(token);
        res.header('x-auth-token', token)
            .send({ id, username });
    } else {
        res.status(422).send("User not found");
    }
})

module.exports = router;