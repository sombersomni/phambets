const router = require('express').Router();
const loginRouter = require('./loginRoute');
const betRouter = require('./betRoute');

router.use(loginRouter, betRouter);
module.exports = router;