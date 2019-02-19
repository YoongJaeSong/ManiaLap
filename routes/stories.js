const express = require('express');
const {getStories, createStory, getStory} = require('../app/controller/stories');
const {createContent, getContent, getContents} = require('../app/controller/contents');
const {uploads} = require('../app/controller/multer');

const router = express.Router();

router.get('/', getStories);
router.post('/', uploads, createStory);
router.get('/:storyId', getStory);

router.get('/:storyId/contents', getContents);
router.get('/:storyId/contents/:contentId', getContent);
router.post('/:storyId/contents', uploads, createContent);

module.exports = router;
