const express = require('express');
const router = express.Router();
const controler = require('../controler/rooms');
const validation = require('../config/validations');
const upload = require('../controler/uploadimg')
router.get('/', controler.getRoom);
router.post('/addroom',upload.single('images'), validation.roomValidator(), controler.addRoom);


module.exports = router;