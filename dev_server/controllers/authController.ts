import { Request, Response } from "express";
import {Credentials,Employe,Positions} from '../db'
const {createToken,refreshToken} = require('../services/auth')
const jwt = require('jsonwebtoken')

export const login = async(req:Request,res:Response) => {
    const {username,password}=req.body
    console.log('LOGIN SERVER:', 'username: ', username, 'password: ',password)
    const credentialsCorrect = Credentials.findOne({where:{login:username,password,exist:1}})
    
    if(credentialsCorrect) {
        const user = await Employe.findOne({where: {id:credentialsCorrect.id}})
        if(user){
           res.status(200).json(user)
            // const positionData = await Positions.findOne({where: {id:user.id}})
            
            // if(positionData){
            //     console.log("POSITION DATA: ")
            //     res.status(200).json(positionData)
            // }else{
            //     res.status(404).json({err:'there is not known data about user position'})
            // }

            // const data = {
            //     name:  user.first_name+ ' '+user.last_name,
            //     position: '',
            //     role: '',
            //     telefon: '',
            //     company: '',
            // }

            // res.status(200).json(data)
        }else{
            res.status(404).json({err: 'cannot find user based on credentials'})
        }
    }else{

    }

    const access_token=createToken(username,2)
    const refresh_token=refreshToken(username)
    const data={
        role: "user",
        userId:1,
        displayName:'robert chytil',
        email:'robertchytil@gmail.com',
        access_token,
        refresh_token
    }
    res.status(200).json(data)
    }


export const logout = (req:Request,res:Response) => {
    // code for logout
    console.log('LOGOUT')
    console.log("verifikace tokenu")
    const authHeader =  req.headers['authorization']
    console.log('AUTH HEADER: ',authHeader)
    const token= authHeader && authHeader.split(' ')[1]
    console.log('TOKEN: ',token)
    res.status(200).json({message:"logout success"})
    }

export const token  = (req:Request,res:Response) => {
    const refreshTokenStr =req.body.token
    console.log('REFRESH TOKEN ZASLANY V BODY: ', refreshTokenStr)
    
    if(refreshTokenStr===undefined) return res.status(401).json({msg:'nebyl poslat zadny refresh token'})
            
                jwt.verify(refreshTokenStr,process.env.REFRESH_TOKEN_SECRET, (err:any, user:any) => {
                    if(err) return res.status(403);
                    console.log('REFRESH TOKEN USER NAME: ', JSON.stringify(user))
                        const access_token = createToken(user.name,30)
                        res.json({access_token})
                })
    }