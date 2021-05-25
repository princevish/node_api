const express = require('express');
const router = express.Router();
const controler = require('../controler/rooms');
const validation = require('../config/validations');

router.get('/', controler.getRoom);
router.post('/addroom', validation.roomValidator(), controler.addRoom);


module.exports = router;