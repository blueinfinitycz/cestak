import { Express} from "express"
import { authorizeToken } from "../../services/auth";
import { removeCar,updateCar,createCar,getParticularCar,getCars } from "../../controllers";


const route = (app:Express) => {
    
        // get list of all available cars
        // app.get('/cars',authorizeToken,async(req,res:Response) => {
        app.get('/cars',getCars)
    
            // get particular car by id - admin section - for later updates
        // app.get('/cars/:id',authorizeToken,getParticularCar
        app.get('/cars/:id',getParticularCar)
    
            // create new car - admin section
        // app.post('/cars/', authorizeToken,createCar)
        app.post('/cars/',createCar)
    
            // update particular car by object of car properties - admin section
        // app.patch('/cars', authorizeToken,updateCar)
        app.patch('/cars',updateCar)
    
            // remove car(s) by array of id's
        // app.delete('/cars', authorizeToken,removeCar)
        app.delete('/cars',removeCar)
}

export default route;