const express = require('express');
const {loginApi, checkSession} = require('../app/controller/temp');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger');

const router = express.Router();

router.get('/api-docs', loginApi);
router.get('/swagger-ui', checkSession);
router.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;