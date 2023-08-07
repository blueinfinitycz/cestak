import { Express, Request, Response } from "express";
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const swaggerSpec= YAML.load('swagger.yaml');

function swaggerDocs(app:Express) {
    //swagger page
    app.use('/swagger-rest-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Docs in JSON format
    app.get('docs.json', (req:Request,res:Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

export default swaggerDocs;