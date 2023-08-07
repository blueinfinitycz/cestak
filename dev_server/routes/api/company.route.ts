import { Express} from "express"
import { authorizeToken } from "../../services/auth";

import { getCompanies,getParticularCompany,createCompany,updateCompany,removeCompany } from "../../controllers";

const route = (app:Express) => {
     // retrieve all available companies data from db
    //  app.get('/company',authorizeToken, getCompanies)
     app.get('/company',getCompanies)

        // get particular company for later update - admin section
    // app.get('/company/:id',authorizeToken, getParticularCompany)
    app.get('/company/:id', getParticularCompany)

        // create new company
    // app.post('/company', authorizeToken,async(req,res:Response) => {
    app.post('/company', createCompany)

        // update particular company by id and name
    // app.patch('/company',authorizeToken,updateCompany)  
    app.patch('/company',updateCompany)
        
        // remove array of companies by setting param in db table company "exist" to "0" receiving array of ids' values every company ex json: {ids: "1,10,23"}
    // app.delete('/company',authorizeToken,async(req,res:Response) => {
    app.delete('/company',removeCompany)
}

export default route;