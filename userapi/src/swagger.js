const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'User API for the project',
    },
    servers: [
        {
          url: "http://localhost:3000",
        },
    ]
  },
  apis: ['./routes/user.js'],
  
};

const specs = swaggerJsdoc(options);

module.exports = specs;
