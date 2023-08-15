import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import __dirname from "../utils.js";

const swaggerOptions = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Documentación API",
            version: "1.0.0",
            description: "Definición de endopoints de la API"
        }
    },
    apis:[`${path.join(__dirname, './docs/**/*.yaml')}`]
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);