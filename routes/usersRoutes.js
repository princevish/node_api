const express = require('express');
const router = express.Router();
const controler = require('../controler/users');
const validation = require('../config/validations');


router.post('/signin', validation.loginValidator(), controler.userSign);
router.post('/signup', validation.registerValidator(), controler.userSignup);

module.exports = router;