import {ICarsService,  ICarsServiceArgs} from './types'
import {GetCarsApi,GetCarsApiResponse} from '../../api/generated'

export class CarsService implements ICarsService {
    _carsApiInstance:GetCarsApi;

    constructor({getCarsApi}:ICarsServiceArgs){
        this._carsApiInstance=getCarsApi;
    }

    public async GetCars(): Promise<GetCarsApiResponse> {
        try {
        const res = await this._carsApiInstance.getCarsGet()
        console.log("GET DOCS:", res.data)
         return {
            cars:res.data.cars
         };

        }catch(ex){
            console.log("AUTH LOGIN: ",ex)
            throw ex;
        }
    }
}