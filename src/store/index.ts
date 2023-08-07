import { configureStore,Reducer, Store } from '@reduxjs/toolkit'
import { Dispatch, Middleware, MiddlewareAPI } from 'redux'
// import { ResultType } from '@remix-run/router/dist/utils';
import AuthReducer from './authReducer';
import LogBookReducer from './logBookReducer';
import CarsReducer from './carsReducer';

export const myLoggingMiddleware = (_: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
    // Here you have access to `action.type` and `action.payload`
    console.log('LOGGING TYPE: ', action.type, 'LOG PAYLOAD: ',action.payload, 'LOG API: ',_)
    
    // You should always do this at the end of your middleware
    return next(action)
  }

const store = configureStore({
    reducer: {
        auth:AuthReducer,
        cars:CarsReducer,
        logBook:LogBookReducer
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat(myLoggingMiddleware),
    
})

// type ReducerFromStore<T> = T extends Store<infer S, infer A> ? Reducer<S, A> : never
// export type IDocumentState = ReducerFromStore<typeof store>;
export type RootState = ReturnType<typeof store.getState>
// export const StoreState =  store.getState()
// export type AppDispatch=typeof store.dispatch

export default store