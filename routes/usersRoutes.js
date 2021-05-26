const express = require('express');
const router = express.Router();
const controler = require('../controler/users');
const validation = require('../config/validations');
const auth = require('../config/auth');
const upload = require('../controler/uploadimg');

router.post('/signin', validation.loginValidator(), controler.userSign);
router.post('/signup' ,upload.single('image'),validation.registerValidator(), controler.userSignup);

router.get('/logout',controler.logOut)

module.exports = router;