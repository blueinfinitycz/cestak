import { Express } from "express"
import {login,logout,token} from '../../controllers'
const route = (app:Express) => {
    app.post('/login',login)
    app.get('/logout',logout)
    app.post('/token',token)
}

export default route;