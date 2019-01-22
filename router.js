const express = require('express');
const router = express.Router();
const {boardUpload, upload, createThumbnail, test} = require('./routes/boarders/CRUD/controller');
const {boardlist, imagelist} = require('./routes/boarders/util');

// thumbnail 내려주는 api
router.get('/boardlist',boardlist);

// 해당 story images를 내려주는 api
router.get('/boardlist/:standard', imagelist);


// image uploads 요청
router.post('/boards/images', upload, boardUpload);
// thumbnail 만드는 api
router.get('/create', createThumbnail);


module.exports = router;