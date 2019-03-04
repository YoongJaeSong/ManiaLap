const express = require('express');
const {getCreatorProfile} = require('../app/controller/profile');

const router = express.Router();

router.get('/',getCreatorProfile);

module.exports = router;