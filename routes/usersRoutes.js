const express = require('express');
const router = express.Router();
const controler = require('../controler/users');
const validation = require('../middleware/validations');
const auth = require('../config/auth');
const uploadprofile = require('../middleware/uploadimg');

router.post('/signin', validation.loginValidator(), controler.userSign);
router.post('/signup' ,uploadprofile.single('image'),validation.imagevalid,validation.registerValidator(), controler.userSignup);

router.get('/logout',controler.logOut)

module.exports = router;