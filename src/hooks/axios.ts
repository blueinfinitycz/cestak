import axios from "axios"
import {API_URL} from '../constants'

export default axios.create({
    baseURL:API_URL
})

export const axiosPrivate = axios.create({
    baseURL:API_URL,
    withCredentials:true,
    headers: {
            'X-Requested-With': 'XMLHttpRequest',
            "Content-Type":"application/json"
            }
})

// export const useAxios = (args:{baseUrl:string}) => {

//     const axiosInstance = axios.create({
//         baseURL:args.baseUrl,
//         withCredentials:true,
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest',
//             "Content-Type":"application/json"
//         }
//         })
//     return {axiosInstance}
// }


