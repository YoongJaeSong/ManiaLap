const express = require('express');
const {uploads} = require('../app/controller/multer');
const {createContent} = require('../app/controller/contents');

const router = express.Router();

router.post('/', uploads, createContent);

module.exports = router;