const express = require('express');

const router = express.Router();

router.use('/', require('./usersroute'));

module.exports = router;