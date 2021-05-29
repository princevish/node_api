const express = require('express');
const router = express.Router();
const controler = require('../controler/rooms');
const validation = require('../middleware/validations');
const uploadroom = require('../middleware/uploadimg')
router.get('/', controler.getRoom);
router.post('/addroom', uploadroom.array('images',4),validation.roomValidator(), controler.addRoom);


module.exports = router;