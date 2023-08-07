import {GetCarsApiResponse,GetCarsApi} from '../../api/generated'

export interface ICarsService {
    GetCars():Promise<GetCarsApiResponse>;
}

export interface ICarsServiceArgs {
    getCarsApi:GetCarsApi,
}