const express = require('express');
const router = express.Router();
const controler = require('../controler/rooms');
const validation = require('../middleware/validations');
const uploadroom= require('../middleware/roomimage')
router.get('/', controler.getRoom);
router.post('/addroom',uploadroom.array('images',5),validation.validroomimage,validation.roomValidator(), controler.addRoom);


module.exports = router;