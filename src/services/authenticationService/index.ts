import {IAuth, IAuthenticationService, IAuthServiceArgs} from './types'
import {LoginApi,LoginApiResponse,ApiResponse, LogoutApi} from '../../api/generated'

export class AuthenticationService implements IAuthenticationService {
    _loginApiInstance:LoginApi;
    _logoutApiInstance:LogoutApi;

    constructor({loginApi,logoutApi}:IAuthServiceArgs){
        this._loginApiInstance=loginApi;
        this._logoutApiInstance=logoutApi;
    }

    public async AuthLogin({ username, password }: IAuth): Promise<LoginApiResponse> {
        console.log('login axios: ',username,password)
        try {
        const res = await this._loginApiInstance.loginPost(username,password);
         return {
            userId: res.data.userId,
            displayName: res.data.displayName,
            email:res.data.email,
            access_token:res.data.access_token,
            refresh_token:res.data.refresh_token
         };
        }catch(ex){
            console.log("AUTH LOGIN: ",ex)
            throw ex;
        }
    }

    public async AuthLogout(): Promise<ApiResponse> {
        try {
            const res = await this._logoutApiInstance.logoutGet();
             return {
                message:res.data.message
             };
            }catch(ex){
                console.log("AUTH LOGOUT: ",ex)
                throw ex;
            }
    }
}