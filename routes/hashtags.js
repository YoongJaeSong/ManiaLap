const express = require('express');
const {autoHashtags, getHashtags} = require('../app/controller/hashtags');

const router = express.Router();

router.get('/', getHashtags);
router.get('/auto', autoHashtags);

module.exports = router;