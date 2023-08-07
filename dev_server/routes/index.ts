import { Express } from "express";
import { Parent,Child } from "../db";

import AuthRoute from "./api/auth.route";
import CarsRoute from "./api/cars.route";
import LogBookRoute from "./api/logbook.route";
import CompanyRoute from "./api/company.route"

function routes(app:Express){
    AuthRoute(app);
    CarsRoute(app);
    LogBookRoute(app);
    CompanyRoute(app);
 

    app.get('/prd/:id',async(req,res) => {
            const {id} = req.params
            const child = await Child.findOne({where: { id}})
            let parent:any;
            if(child){   
                parent = await Parent.findOne({where: {id:child.parentId+1}})
                if(parent) {
                    res.status(200).json({child:{name:child.name},parent: {name:parent.name}})
                }else{
                    res.status(404).json({err: 'this parent doesnot exist'})    
                }
                
            }else{
                res.status(404).json({err: 'this child doesnot exist'})
            }
    })

}

export default routes;