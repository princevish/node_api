const express = require('express');
const router = express.Router();
const controler = require('../controler/users');
const validation = require('../middleware/validations');
const auth = require('../config/auth');
const uploadimg = require('../middleware/uploadimg');

router.post('/signin', validation.loginValidator(), controler.userSign);
router.post('/signup' ,uploadimg.single('image'),validation.registerValidator(), controler.userSignup);

router.get('/logout',controler.logOut)

module.exports = router;