const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/home', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const co =req.cookies.key;
    res.status(201).json({
        message: co
    })
});
router.use('/room', require('./roomRoutes'));

router.use('/users', require('./usersRoutes'));
module.exports = router;