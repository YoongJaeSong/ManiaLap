const express = require('express');
const {getDesignerProfile} = require('../app/controller/profile');

const router = express.Router();

router.get('/',getDesignerProfile);

module.exports = router;