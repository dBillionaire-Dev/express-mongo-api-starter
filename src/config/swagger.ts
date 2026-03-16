import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog API",
            version: "1.0.0",
            description: "API documentation for a backend heavy full CRUD API, built to learn Node.js with Express using TypeScript and MongoDB",
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
    },

    apis: ["./src/routes/*.ts"], // where swagger reads route docs
};

export const swaggerSpec = swaggerJsdoc(options);
