const express = require('express');
const {getHashtags} = require('../app/controller/hashtags');

const router = express.Router();

router.get('/', getHashtags);

module.exports = router;