
// import axios from '../api/axios';
import axios from './axios'
import useAuth from './useAuth';

const useRefreshToken = () => {
    // const { setAuth } = useAuth();

        const refreshToken = async () => {
            const res=  await axios.post('/token',{token:sessionStorage.getItem('refresh_token')})
            return res.data
        }
        return refreshToken;


    // const refresh = async () => {
    //     const response = await axios.get('/refresh', {
    //         withCredentials: true
    //     });
    //     setAuth(prev => {
    //         console.log(JSON.stringify(prev));
    //         console.log(response.data.accessToken);
    //         return { ...prev, accessToken: response.data.accessToken }
    //     });
    //     return response.data.accessToken;
    // }
    // return refresh;
};

export default useRefreshToken;