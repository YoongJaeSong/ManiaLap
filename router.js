const express = require('express');
const {createStroy, upload, createContent, cancelImage} = require('./routes/boarders/CRUD/controller');
const {getStories, getStory, getContent} = require('./routes/boarders/util');
const {checkSession, loginApi} = require('./routes/temp');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const router = express.Router();

/*
    swagger-ui에 들어가기 전에 비밀번호를 확인하고
    들어가게 하기위한 middle ware
 */
router.get('/api-docs', loginApi);
router.get('/swagger-ui', checkSession);
router.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// story api
router.get('/stories', getStories);
router.post('/stories',upload, createStroy);
router.get('/stories/:storyId', getStory);


// content
router.get('/stories/:storyId/contents/:contentId', getContent)
router.post('/stories/:storyId/contents', upload, createContent);

module.exports = router;