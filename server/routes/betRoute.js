const router = require('express').Router();

router.route('/bet')
.post((req, res) => {
    console.log(req.body);
    res.send('success');

})
module.exports = router;