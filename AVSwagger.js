const swaggerJSDoc = require('swagger-jsdoc');

let swaggerDefinition = {
    info: {
        title: 'Hello World',
        version: '1.0.0',
        description: 'A sample API',
    },
    host: 'localhost:3000',
    basePath: '/',
};

let options = {
    swaggerDefinition: swaggerDefinition,
    apis: [
        'routes/*/*.js'
    ]
};

let swaggerSpec = module.exports.swaggerSpec = swaggerJSDoc(options);