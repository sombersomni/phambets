const router = require('express').Router();
const { getErrorMessage, validateUser } = require('../utils/errors');
const db = require('../db');

router.route('/signup')
.post(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const { username, email, password } = req.body;
    try {
        await db.addUser(username, email, password);
        res.send('signup was successful');
    } catch(err) {
        const errMessage = getErrorMessage(err.code, username);
        res.status(401).send(errMessage);
    }
})

module.exports = router;