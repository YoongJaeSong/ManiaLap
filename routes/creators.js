const express = require('express');
const {applyCreators, registerCreators} = require('../app/controller/creators');
const {uploads} = require('../app/controller/multer');

const router = express.Router();

// 작가 신청
router.post('/apply', uploads, applyCreators);
// 작가 등록
router.post('/register',uploads, registerCreators);

module.exports = router;