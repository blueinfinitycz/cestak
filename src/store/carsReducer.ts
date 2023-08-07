import { createSlice, createAsyncThunk, PayloadAction  } from '@reduxjs/toolkit'
import { GetCarsSingleton } from '../services';
import {CarsService} from '../services/carsService'
import {GetCarsApiResponse} from '../api/generated'
import {RootState} from '../store'

interface IState {
  carsData: GetCarsApiResponse;
  status?:'loading' | '' | undefined;
  error?:string,
}

const initialState :IState = {
    carsData: {},
    status:'',
    error:''
}

interface IActionCars {
    type:string;
    payload:GetCarsApiResponse;
}

export const getCarsApi = createAsyncThunk('cars',async() => {
    const _cars:CarsService | null = GetCarsSingleton()
    const res =  await _cars?.GetCars();
     return res 
})


const carsSlice = createSlice({
    name: 'cars',
    initialState ,
    reducers: {
        carsAction : {
            reducer:(state,action:PayloadAction<IState | any>)=> {
                state.carsData=action.payload.carsData
            }, 
            prepare:() => {
                return {payload:{carsData:null,status:'',error:''}}
            }
        }
    },
    extraReducers(builder) {
        builder
        // GET ALL AVAILABLE CARS
        .addCase(getCarsApi.pending, (state, action) => {
            console.log("LOADING CARS API")
            state.status= 'loading'
        })
        .addCase(getCarsApi.fulfilled,(state,action:PayloadAction<IState | any>) => {
            state.status='';
            
            console.log('getCarsApi.fulfilled: ',action.payload)

            if(action.payload !==undefined) {
                state.carsData=action.payload.cars
            }
             
        })
        .addCase(getCarsApi.rejected,(state,action) => {
            console.log("getCarsApi API REJECTED") 
            state.status='';
            state.error=action.error.message;
        })
    },
})

export const isLoadingCars=(state:RootState) => state.cars.status
export const carsDataSelector=(state:RootState) => state.cars.carsData
// export const {logBookAction}=carsSlice.actions;
export default carsSlice.reducer;

