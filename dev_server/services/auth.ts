const jwt = require('jsonwebtoken')
require('dotenv').config()

   export  const createToken = (username:string,expiration:number | null=null) => {
        console.log("create token")
        let access_token:string

        if(expiration!==null) {
            access_token=jwt.sign({name:username},process.env.ACCESS_TOKEN_SECRET,{expiresIn: `${expiration}s`})
        }else{
            access_token=jwt.sign({name:username},process.env.ACCESS_TOKEN_SECRET)
        }
        return access_token;
       }

    export const authorizeToken = (req:any,res:any, next:any) => {
        // console.log("verifikace tokenu")
        // console.log("REQ BODY: ",req.body)
        const authHeader =  req.headers['authorization']
        // console.log('AUTH HEADER: ',authHeader)
        const token= authHeader && authHeader.split(' ')[1]
        // console.log('TOKEN: ',token)
        if(token===null) return res.status(401).json({Error:'no token is available'})
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err:any,user:any) => {
     
    if(err) {
        console.log('ERR JWT VERIFY COMPARISON: ', JSON.stringify(err))
        return res.status(403).json({msg:'neplatny token'}) 
    }
    req.user=user;
    next()
        })   
    }

    export const refreshToken = (username:string) => {
        const access_token=jwt.sign({name:username},process.env.REFRESH_TOKEN_SECRET)
        return access_token;
    }