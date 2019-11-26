const router = require('express').Router();

router.route('/login')
.post((req, res) => {
    console.log(req.body);
    res.send('login sucessful');
})

module.exports = router;