import {ILogBookServiceArgs,  ILogBookService, IUpdateRecord} from './types'
import {ApiResponse,DefaultApi,GetLogBookApi,LogBookApiResponse, Record,CreateRecordApi,DeleteRecordApi} from '../../api/generated'

export class LogBookService implements ILogBookService {
    _getBookApiInstance:GetLogBookApi;
    _addRecordApiInstance:CreateRecordApi;
    _deleteRecordApiInstance:DeleteRecordApi;
    _recordApiInstance:DefaultApi

    constructor({getLogBookApi,recordApi,addRecordApi,deleteRecordApi}:ILogBookServiceArgs){
        this._getBookApiInstance=getLogBookApi;
        this._recordApiInstance=recordApi;
        this._addRecordApiInstance=addRecordApi;
        this._deleteRecordApiInstance=deleteRecordApi;
    }

    public async GetLogBook(carId:number): Promise<LogBookApiResponse> {
        try {
            const res = await this._getBookApiInstance.carsCarIdGet(carId)
             return {
                carInfo:res.data.carInfo,
                logBook:res.data.logBook
             };
    
            }catch(ex){
                console.log("AUTH LOGIN: ",ex)
                throw ex;
            }
    }
  
    public async AddRecord({id,date,journeyFrom,journeyVia, journeyTo,departure, arrival,speedometer, fuel,cost, diets,overnight, methodOfPayment, signature}:Record): Promise<ApiResponse> {
        try {
            const res = await this._addRecordApiInstance.recordPost(id,date,journeyFrom,journeyVia, journeyTo,departure, arrival,speedometer, fuel,cost, diets,overnight, methodOfPayment, signature)
             return {
                message:'ok'
             };
    
            }catch(ex){
                console.log("AUTH LOGIN: ",ex)
                throw ex;
            }
    }

    public async UpdateRecord({id,id2,column,value}:IUpdateRecord): Promise<ApiResponse> {
        try {
            const res = await this._recordApiInstance.recordIdPut(id,id2, column,value);
             return {
                message:res.data.message
             };
    
            }catch(ex){
                console.log("AUTH LOGIN: ",ex)
                throw ex;
            }
    }

    public async DeleteRecord(id:number): Promise<ApiResponse> {
        try {
            const res = await this._deleteRecordApiInstance.recordIdDelete(id)
            console.log("DELETE RECORD :", res.data)
             return {
                message:res.data.message
             };
    
            }catch(ex){
                console.log("AUTH LOGIN: ",ex)
                throw ex;
            }
    }
}