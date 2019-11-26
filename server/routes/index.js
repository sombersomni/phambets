const router = require('express').Router();
const loginRouter = require('./login');

router.use(loginRouter);
module.exports = router;