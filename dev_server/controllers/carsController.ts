import { Request,Response } from "express"
import { Cars} from "../db";
import {Op} from 'sequelize'

export const getCars = async(req:Request,res:Response) => {
    const data = await Cars.findAll({where: {exist:1}})
    res.status(200).json(data)
}

export const getParticularCar = async(req:any,res:Response) => {
    // get particular car info with logbook info
    const {id}=req.params;
    console.log('LOG BOOK get params: ',id)

    const data =
    {
        carInfo: {
            owner: 'Madal Bal a.s',
            responsiblePerson: 'Viharin Rosa',
            vehicleBrand: 'Škoda Octavia III',
            spz: '1AB8978',
            typeOfPhm: {id:'1',name:'Benzin'},
            speedometerCurrentState: '150000',
            vinCode: 'badfds893313',
            category: {id:'1',name:'osobní'},
            yearOfManufacture: '1987',
            technicalLicenseNumber: '79879464631313',
            engineCapacity: '4569',
            tankVolume: '45',
            companyCenter: '',
            averageConsumption: '5',
            validityOfRoadStamp: '05/01/2024',
            appointmentOfServiceVisits: '08/07/2022',
            termStk: '08/07/2022',
            serviceAccordingToKm: '08/07/2022',
            serviceAccordingToMonth: '08/07/2022',
            dateOfAcquisition: '08/07/2022',
            dateOfWithdrawal: '',
            speedometerAtTheTimeOfPurchase: '100000',
            insurance: 'VZP',
            greenCardNumber: '78979 46497789',
            leasingCompany: 'Druzstvo Madal Bal..nemame na chleba',
            creditCard: 'CCS karat'
        },
        logBook: [
            {
                id: '1',
                date: '1.12.1989',
                journeyFrom:'Praha',
                journeyVia: 'Karlovy Vary',
                journeyTo: 'Most',
                departure: '9:00',
                arrival: '18:00',
                speedometer:'325 000',
                fuel:'556,56',
                cost: 22900,
                diets: '2000',
                overnight: '5000',
                methodOfPayment: 'hotovost',
                signature: 'apaguha vesely'
            },
            {
                id: '2',
                date: '1.12.1989',
                journeyFrom:'Praha',
                journeyVia: 'Karlovy Vary',
                journeyTo: 'Most',
                departure: '9:00',
                arrival: '18:00',
                speedometer:'325 000',
                fuel:'556,56',
                cost: 22900,
                diets: '2000',
                overnight: '5000',
                methodOfPayment: 'ccs karta',
                signature: 'apaguha vesely'
            },
        ]    
    }
    res.status(200).json(data)
}

export const createCar = async(req:Request,res:Response) => {
    const newCarData = req.body;
        const newCar= await Cars.create({...newCarData,exist:1})
        
        if(newCar){
            const data = await Cars.findAll({where:{exist:1}})
            res.status(200).json(data)
        }
}

export const updateCar  = async(req:Request,res:Response) => {
    const updatedData = req.body
    console.log("BODY: ", updatedData)
    const updateCars = await Cars.update({...updatedData},{where:{id:updatedData.id}})
    if(updateCars) {
        const data = await Cars.findAll({where:{exist:1}})
        res.status(200).json(data)
    }
}

export const removeCar = async(req:Request,res:Response) => {
    const {ids}=req.body
    const removedItems = await Cars.update({exist:0} ,{where:{id:{[Op.or]:ids.split(',')}}})
    if(removedItems) {
        const data= await Cars.findAll({where: {exist:1}})
        res.status(200).json(data)
    }
}