import { createSlice, createAsyncThunk, PayloadAction  } from '@reduxjs/toolkit'
import { LogBookSingleton } from '../services';
import {LogBookService} from '../services/logBookService'
import {LogBookApiResponse, Record} from '../api/generated'
import {RootState} from '../store'

interface IState {
  logBookData: LogBookApiResponse;
  status?:'loading' | '' | undefined;
  error?:string,
}

const initialState :IState = {
    logBookData: {},
    status:'',
    error:''
}

interface IActionLogBook {
    type:string;
    payload:LogBookApiResponse;
}

export const getLogBookApi = createAsyncThunk('logBook',async(carId:number) => {
    const _logBook:LogBookService | null = LogBookSingleton()
    const res =  await _logBook?.GetLogBook(carId);
     return res 
})

export interface IAddRecord {
    record:Record
}

export const addRecordApi = createAsyncThunk('addRecord',async({id,date,journeyFrom,journeyVia, journeyTo,departure, arrival,speedometer, fuel,cost, diets,overnight, methodOfPayment, signature}:Record) => {
    const _record:LogBookService | null = LogBookSingleton()
    const res =  await  _record?.AddRecord({id,date,journeyFrom,journeyVia, journeyTo,departure, arrival,speedometer, fuel,cost, diets,overnight, methodOfPayment, signature})
     return res
})

export interface IUpdateRecord {
    id: number;
    id2: number;
    column: string;
    value: string;
}

export const updateRecordApi = createAsyncThunk('updateRecord',async({id,id2,column,value}:IUpdateRecord) => {
    const _record:LogBookService | null = LogBookSingleton()
    const res =  await  _record?.UpdateRecord({id,id2,column,value})
     return res
})


export const deleteRecordApi = createAsyncThunk('deleteRecord',async(id:number) => {
    const _record:LogBookService | null = LogBookSingleton()
    const res =  await  _record?.DeleteRecord(id)
     return res
})



const logBookSlice = createSlice({
    name: 'logBook',
    initialState ,
    reducers: {
        logBookAction : {
            reducer:(state,action:PayloadAction<IState | any>)=> {
                state.logBookData=action.payload.logBook
            }, 
            prepare:() => {
                return {payload:{logBookData:null,status:'',error:''}}
            }
        }
    },
    extraReducers(builder) {
        builder
        // GET ALL AVAILABLE CARS
        .addCase(getLogBookApi.pending, (state, action) => {
            console.log("LOADING LOG BOOK API")
            state.status= 'loading'
        })
        .addCase(getLogBookApi.fulfilled,(state,action:PayloadAction<IState | any>) => {
            state.status='';
            
            console.log('logBookSlice.fulfilled: ',action.payload)

            if(action.payload !==undefined) {
                state.logBookData=action.payload
            }
             
        })
        .addCase(getLogBookApi.rejected,(state,action) => {
            console.log("LOGBOOK API REJECTED: ", action.error)
            state.status='';
            state.error=action.error.message;
        })

       // ADD RECORD
        
        .addCase(addRecordApi.pending, (state, action) => {
            console.log("addRecordApi loading API")
            state.status= 'loading'
        })
        .addCase(addRecordApi.fulfilled,(state,action) => {
            state.status='';
            console.log('addRecordApi.fulfilled: ',action.payload)
        })
        .addCase(addRecordApi.rejected,(state,action) => {
            console.log("addRecordApi API REJECTED")
            state.status='';
            state.error=action.error.message;
        })

         // UPDATE RECORD
         
         .addCase(updateRecordApi.pending, (state, action) => {
            console.log("addRecordApi loading API")
            state.status= 'loading'
        })
        .addCase(updateRecordApi.fulfilled,(state,action) => {
            state.status='';
            console.log('updateRecordApi.fulfilled: ',action.payload)
        })
        .addCase(updateRecordApi.rejected,(state,action) => {
            console.log("updateRecordApi API REJECTED")
            state.status='';
            state.error=action.error.message;
        })

        // DELETE RECORD

        .addCase(deleteRecordApi.pending, (state, action) => {
            console.log("addRecordApi loading API")
            state.status= 'loading'
        })
        .addCase(deleteRecordApi.fulfilled,(state,action) => {
            state.status='';
            console.log('updateRecordApi.fulfilled: ',action.payload)
        })
        .addCase(deleteRecordApi.rejected,(state,action) => {
            console.log("updateRecordApi API REJECTED")
            state.status='';
            state.error=action.error.message;
        })
    },
})

export const isLoadingLogBook=(state:RootState) => state.logBook.status
export const logBookDataSelector=(state:RootState) => state.logBook.logBookData
export const {logBookAction}=logBookSlice.actions;
export default logBookSlice.reducer;

