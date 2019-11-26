const router = require('express').Router();
const loginRouter = require('./loginRoute');

router.use(loginRouter);
module.exports = router;