const express = require('express');
const {getProfile} = require('../app/controller/profile');

const router = express.Router();

router.get('/',getProfile);

module.exports = router;