const router = require('express').Router();
const loginRouter = require('./loginRoute');
const signUpRouter = require('./signUpRoute');
const betRouter = require('./betRoute');

router.use(loginRouter, signUpRouter, betRouter);
module.exports = router;