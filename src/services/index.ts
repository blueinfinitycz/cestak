import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import {AuthenticationService} from './authenticationService'
import {CarsService} from './carsService'
import {LogBookService} from './logBookService'
import {LoginApi,LogoutApi,Configuration,GetCarsApi,GetLogBookApi,DefaultApi,CreateRecordApi, DeleteRecordApi} from '../api/generated'
import {API_URL} from '../constants'
import { ERROR_CANCELED } from './constants';
import jwtDecode from 'jwt-decode'


  const getValidity = ():boolean => {
    const access_token = getBearer();
    if(access_token){
      const token:{exp:number}=jwtDecode(access_token);
     const validity:boolean= Date.now() <= token.exp*1000;
     return validity
    }
    
    return false
  }

  const getBearer = () => {
    return sessionStorage.getItem("access_token")
  }

  const refreshToken = () => {
    axios.post('/token',{token:sessionStorage.getItem('refresh_token')})
    .then((res:any) => {
      sessionStorage.setItem("access_token",res.data.access_token)
      // axiosInstance.defaults.headers.common.Authorization=`Bearer ${res.data.access_token}`
    })
  }

  const redirectToLoginPage = () => {
    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("refresh_token")
    window.location.href = '/cestak/login';
    return;
  }

  let _axiosSingleton: AxiosInstance | null = null;
  let _authenticationServiceSingleton:AuthenticationService | null = null
  let _getCarsServiceSingleton:CarsService | null = null
  let _logBookServiceSingleton:LogBookService | null = null
  
  const configuration = new Configuration();
  const getAxiosInstance = (args: { baseUrl: string | any,loginTryDelay: number; loginTries: number}) => {
    const axiosInstance = axios.create({
              baseURL:args.baseUrl,
              withCredentials:true,
              headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  "Content-Type":"application/json",
                  'X-Login-Try-Delay': args.loginTryDelay,
                  'X-Login-Tries': args.loginTries,
              }
          })

          axiosInstance.interceptors.request.use(
            (request:any) => {
              request.withCredentials=true;
              request.headers = {
              Authorization: 'Bearer '+ getBearer()
            };
              return request
            },
            
            (error: AxiosError) => {
        const { data = null, status = null, headers = {} } = error.response || {};
        if (axios.isCancel(error)) {
          throw new Error(ERROR_CANCELED);
        }
        if (status === 401) {
          redirectToLoginPage();
        }
        if (data) throw data;
        return Promise.reject(error);
            },
)
          axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('RESPONSE: ',response)
        return response;
      },
      async(error: AxiosError) => {

        const {data=null,status=null, config=null}=error.response || {}
        const originalRequest = error.config;
        console.log("PARAMS: ",config?.params)
        if (status === 401) {
          redirectToLoginPage();
        }

        if(status===403) {
          
         const refreshTokenCall= axios.post('/token',{token:sessionStorage.getItem('refresh_token')})
          .then((res:any) => {
              sessionStorage.setItem("access_token",res.data.access_token)
              axiosInstance.defaults.headers.common.Authorization=`Bearer ${res.data.access_token}`
              
              const promise:any = originalRequest?.url &&  (originalRequest?.method==="get"?axiosInstance.get(originalRequest?.url):axiosInstance.post(originalRequest?.url,{...config?.params}))
             return new Promise((resolve) => resolve(promise.then((e:any) => e)) )
          })
          return refreshTokenCall
        }


        if (axios.isCancel(error)) {
          throw new Error(ERROR_CANCELED);
        }
      }
)
  return axiosInstance;
  }

    const axiosSingleton = () => {
    if(!_axiosSingleton) {
        _axiosSingleton=getAxiosInstance({baseUrl:API_URL,loginTries:120,loginTryDelay:500});
    }
    return _axiosSingleton;
    }
  
    export const AuthServiceSingleton = ():AuthenticationService | null => {
    const axiosInstance = axiosSingleton();
    console.log('PO AUTH SERVICE SINGLETON: ',axiosInstance)
    if(axiosInstance !==null && _authenticationServiceSingleton === null) {
        const loginApiInstance = new LoginApi(configuration, axiosInstance.defaults.baseURL, axiosInstance)
        const logoutApiInstance = new LogoutApi(configuration, axiosInstance.defaults.baseURL, axiosInstance)
        _authenticationServiceSingleton= new AuthenticationService({
          loginApi:loginApiInstance,
          logoutApi:logoutApiInstance
        });

        return _authenticationServiceSingleton;
    }
    return _authenticationServiceSingleton;
    }


   export const GetCarsSingleton = ():CarsService | null => {
      const axiosInstance = axiosSingleton();
      if(axiosInstance !==null && _getCarsServiceSingleton === null) {
        const carsApiInstance = new GetCarsApi(configuration,axiosInstance.defaults.baseURL,axiosInstance)
        _getCarsServiceSingleton= new CarsService({
          getCarsApi:carsApiInstance
        });
        return _getCarsServiceSingleton
      }
      return _getCarsServiceSingleton
   }

   export const LogBookSingleton = ():LogBookService | null => {
    const axiosInstance = axiosSingleton();
    if(axiosInstance !==null && _logBookServiceSingleton === null) {
      const _recordApiIntance = new DefaultApi(configuration,axiosInstance.defaults.baseURL,axiosInstance)
      const _logBookApiInstance = new GetLogBookApi(configuration,axiosInstance.defaults.baseURL,axiosInstance)
      const _addRecordApiInstance= new CreateRecordApi(configuration,axiosInstance.defaults.baseURL,axiosInstance)
      const _deleteRecordApiInstance= new DeleteRecordApi(configuration,axiosInstance.defaults.baseURL,axiosInstance)
      _logBookServiceSingleton= new LogBookService({
        getLogBookApi: _logBookApiInstance,
        recordApi: _recordApiIntance,
        addRecordApi: _addRecordApiInstance,
        deleteRecordApi:_deleteRecordApiInstance
      });
      return _logBookServiceSingleton
    }
    return _logBookServiceSingleton
 }