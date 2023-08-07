import {ApiResponse,GetLogBookApi,DefaultApi,LogBookApiResponse, Record,CreateRecordApi,DeleteRecordApi} from '../../api/generated'

export interface IUpdateRecord {
    id: number;
    id2: number;
    column: string;
    value: string;
}

export interface ILogBookService {
    GetLogBook(carId:number):Promise<LogBookApiResponse>,
    AddRecord({id,date,journeyFrom,journeyVia, journeyTo,departure, arrival,speedometer, fuel,cost, diets,overnight, methodOfPayment, signature}:Record):Promise<ApiResponse>
    UpdateRecord({id,id2,column, value}:IUpdateRecord):Promise<ApiResponse>;
    DeleteRecord(id:number):Promise<ApiResponse>;
}

export interface ILogBookServiceArgs {
    getLogBookApi:GetLogBookApi,
    recordApi: DefaultApi,
    addRecordApi: CreateRecordApi,
    deleteRecordApi: DeleteRecordApi,
}