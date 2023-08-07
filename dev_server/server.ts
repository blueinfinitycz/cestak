import { AddressInfo } from 'net';
import swaggerDocs from './swagger';
import routes from './routes';
import https from 'https'
import SQLZ from './db';
const fs = require('fs')
const app = require('./app')

const server_options = {
    key:fs.readFileSync(`${__dirname}/key.pem`),
    cert:fs.readFileSync(`${__dirname}/cert.pem`)
  }
   async function sequelizeAuthentication() {
  await SQLZ.authenticate()
}

const https_server = https.createServer(server_options,app).listen(4005,()=> {  
    const { port } = https_server.address() as AddressInfo;
    routes(app)
    swaggerDocs(app)
    console.log('AUTH JWT-TOKEN-SERVER RUNNING AT PORT: ',port);
    sequelizeAuthentication().then(() => {
      console.log('SEQUELIZE AUTHENTICATION OK !!!','MODELS: ', SQLZ.models)
    }
      ).catch((e:any) => console.log('SEQUELIZE AUTH ERROR: ',e))
})

