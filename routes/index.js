const express = require('express');

const router = express.Router();

//passport auth for header token verification
//const passport = require('passport');
//passport.authenticate('jwt', { session: false})

router.use('/room', require('./roomRoutes'));

router.use('/users', require('./usersRoutes'));
module.exports = router;