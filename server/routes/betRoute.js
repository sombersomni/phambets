const router = require('express').Router();
const db = require('../db');
const { getErrorMessage } = require('../utils/errors');

router.route('/bet')
.post(async (req, res) => {
    console.log(req.body);
    const { id, name, type, amount, numOfBets } = req.body;
    try {
        await db.placeBet(id, name, type, amount, numOfBets);
        res.send('Your bet was successfully placed!');
    } catch(err) {
        console.log(err);
        const errMessage = getErrorMessage(err.code);
        res.send(errMessage);
    }

})
module.exports = router;