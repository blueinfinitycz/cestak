import { createSlice, createAsyncThunk, PayloadAction  } from '@reduxjs/toolkit'
import { AuthServiceSingleton } from '../services';
import {AuthenticationService} from '../services/authenticationService'
import {LoginApiResponse} from '../api/generated'
import {RootState} from './index'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { API_URL } from '../constants';

interface IState {
  user:LoginApiResponse;
  isLogged:boolean;
  status?:'loading' | '' | undefined;
  error?:string,
  accessToken?:string;
  refreshToken?:string;
}

interface LoginState {
    username:string;
    password:string;
}

const initialState :IState = {
    user: {},
    isLogged:false,
    status:'',
    error:''
}

interface IAction {
    type:string;
    payload:LoginApiResponse;
}

// Thunk function



// export const apiSlice = createApi({
//     reducerPath:'api',
//     baseQuery: fetchBaseQuery({baseUrl:API_URL}),
//     endpoints: (builder) => ({
//         // getAllRecords: builder.query<LoginApiResponse,void>({
//         //     query: () => '/getAllDocs',
//         // }),
//         login: builder.mutation({
//             query: (credentials) => ({
//             url: '/login',
//             method: 'POST',
//             body: credentials
//             })
//         })
//     })
// })



export const authLogin = createAsyncThunk('login',async(credentials:LoginState) => {
    console.log('AUTH ACTION')
    const auth:AuthenticationService | null = AuthServiceSingleton()
    const res =  await  auth?.AuthLogin({...credentials})
     return res
})

export const authLogout = createAsyncThunk('logout',async() => {
    const auth:AuthenticationService | null = AuthServiceSingleton()
    const res =  await  auth?.AuthLogout()
     return res
})


const authSlice = createSlice({ 
    name: 'auth',
    initialState ,
    reducers: {
        logInAction : {
            reducer:(state,action:PayloadAction<IState | any>)=> {
                console.log("REDUCER LOGIN:", action.payload)
            state.isLogged=action.payload.isLogged;
            state.user=action.payload.user;
            }, 
            // tohle je fce, ktera filtruje data a vysledek preposle do 'reduceru' vyse
            prepare:({username,password}:LoginState) => {
                console.log('prepare: ',username, password)
                return {payload:{user:{},status:'',error:''}}
            }
        },
        logOutAction(state,action) {state.isLogged=false}
    },
    extraReducers(builder) {
        builder
        .addCase(authLogin.pending, (state, action) => {
            state.status= 'loading'
        })
        .addCase(authLogin.fulfilled,(state,action) => {
            state.status='';
            console.log('AUTH LOGIN FULLFILLED: ',action.payload)
            state.user={
                userId:action.payload?.userId,
                displayName:action.payload?.displayName,
                email: action.payload?.email
            };
            state.accessToken=action.payload?.access_token;
            state.refreshToken=action.payload?.refresh_token;
            state.isLogged=true;
            // sessionStorage.setItem("isLogged","1")

            if(action.payload?.access_token) {
                sessionStorage.setItem("access_token",action.payload?.access_token)
            }

            if(action.payload?.refresh_token) {
                sessionStorage.setItem("refresh_token",action.payload?.refresh_token)
            }
            
        })
        .addCase(authLogin.rejected,(state,action) => {
            state.status='';
            state.error=action.error.message;
        })
        .addCase(authLogout.pending, (state, action) => {
            state.status= 'loading'
        })
        .addCase(authLogout.fulfilled, (state, action) => {
            state.status='';
            state.isLogged=false;
            sessionStorage.removeItem("access_token")
            sessionStorage.removeItem("refresh_token")
            sessionStorage.removeItem("isLogged")
            console.log('AUTH LOGOUT FULLFILLED: ',action.payload)
        })
        .addCase(authLogout.rejected, (state, action) => {
            state.status='';
            state.error=action.error.message;
        })
    },
})

export const isLoadingAuth=(state:RootState) => state.auth?.status
export const authUser=(state:RootState) => state.auth.user
export const isLogged=(state:RootState) => state.auth.isLogged
export const accessToken=(state:RootState) => state.auth.accessToken
export const refreshToken=(state:RootState) => state.auth.refreshToken
export const {logInAction,logOutAction}=authSlice.actions;
export default authSlice.reducer;
