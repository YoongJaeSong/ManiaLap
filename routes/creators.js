const express = require('express');
const {applyCreators, registerCreators, doubleCheckSns, getSns} = require('../app/controller/creators');
const {uploads} = require('../app/controller/multer');

const router = express.Router();

// 작가 신청
router.post('/apply', uploads, applyCreators);
// 작가 등록
router.post('/register', uploads, registerCreators);
// sns 중복확인
router.get('/sns/check', doubleCheckSns);
// sns정보 가져오기
router.get('/sns', getSns);

module.exports = router;