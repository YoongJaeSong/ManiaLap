const express = require('express');
const router = express.Router();
const {createStroy, upload, createContent} = require('./routes/boarders/CRUD/controller');
const {stories, story, content} = require('./routes/boarders/util');
const {read, create, update} = require('./routes/boarders/CRUD/database')

// story api
router.get('/stories', stories);
router.post('/stories', upload, createStroy);
router.get('/stories/:story_id', story);


// content
router.get('/stories/:story_id/contents/:content_id', content)
router.post('/content', upload, createContent);


// sequelize test를 위한 api
router.get('/test', read)
    .post('/test', create)
    .put('/test', update);

module.exports = router;