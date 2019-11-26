const router = require('express').Router();
const generateToken = require('../utils/generateToken');

router.route('/login')
.post((req, res) => {
    console.log(req.body);
    const { username } = req.body;
    const id = 'AUx332y290';
    const token = generateToken(id);
    res.header('x-auth-token', token)
        .send({ id, username });
})

module.exports = router;