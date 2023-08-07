import {LoginApi,LoginApiResponse,LogoutApi,ApiResponse} from '../../api/generated'

export interface IAuth {
    username: string;
    password: string;
}

export interface IAuthenticationService {
    AuthLogin({username,password}:IAuth): Promise<LoginApiResponse>;
    AuthLogout():Promise<ApiResponse>
}

export interface IAuthServiceArgs {
    loginApi:LoginApi,
    logoutApi:LogoutApi
}