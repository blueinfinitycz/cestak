import {Request,Response} from 'express'
import { Company} from "../db";
import {Op} from 'sequelize'

export const getCompanies = async(req:Request,res:Response) => {
    const data= await Company.findAll({where: {exist:1}})
    res.status(200).json(data)
}
export const getParticularCompany = async(req:Request,res:Response) => {
    const {id} = req.params
    const data= await Company.findAll({where: {id,exist:1}})
    res.status(200).json(data)
}

export const createCompany = async(req:Request,res:Response) => {
    const {name} = req.body
        console.log('COMPANY CALLED !!', name)
        const data= await Company.create({name,exist:1})
        console.log("POST COMPANYT: ", data)
        if(data) {
            const data= await Company.findAll()
            res.status(200).json(data)
        }
}

export const updateCompany = async(req:Request,res:Response) => {  
    const {id,name} = req.body
   const updateDataCompany= await Company.update({name},{where: {id}})
   
    if(updateDataCompany) {
        const data= await Company.findAll({where:{exist:1}})
        res.status(200).json(data)
    }
}

export const removeCompany = async(req:Request,res:Response) => {
    const {ids}=req.body
    const removedItems = await Company.update({exist:0} ,{where:{id:{[Op.or]:ids.split(',')}}})
    if(removedItems) {
        const data= await Company.findAll({where: {exist:1}})
        res.status(200).json(data)
    }
}

