const express = require('express');
const {
    getMaxListeners
} = require('../../models/usersModel');
const controler=require('../../controler/users');
const router = express.Router();

router.post('/sign',controler.loginValidator(),controler.userSign );

router.post('/signup',controler.registerValidator(), controler.userSignup);

module.exports = router;