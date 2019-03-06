const express = require('express');
const {applyCreators, registerCreators, doubleCheckSns, doubleCheckBrand, doubleCheckNickname} = require('../app/controller/creators');
const {uploads} = require('../app/controller/multer');

const router = express.Router();

// 작가 신청
router.post('/apply', uploads, applyCreators);
// 작가 등록
router.post('/register', uploads, registerCreators);
// sns 중복확인
router.get('/sns/check', doubleCheckSns);
// brand name 중복 확인
router.get('/brand', doubleCheckBrand);
// 작가 활동 명 중복 확인
router.get('/nickname', doubleCheckNickname);
// sns정보 가져오기
router.get('/sns', getSns);

module.exports = router;