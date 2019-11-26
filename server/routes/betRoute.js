const router = require('express').Router();

router.route('/bet')
.post((req, res) => {
    console.log(req.body);
})
module.exports = router;