import express from "express"; 
import { login,register } from "../services/userService";

const router = express.Router(); 


router.post('/register', async (request,response)=>{
    try {

        const {firstName,lastName,email,password} = request.body; 
        const result = await register({firstName,lastName,email,password})
    
        response.status(result.statusCode).send(result.data)
        
    }catch (err){
        response.status(500).json({message: 'Internal Server Error'});
    }
   
})

router.post('/login', async (request,response)=>{
    try {
        const {email,password} = request.body; 
        const result = await login({email,password})
        response.status(result.statusCode).send(result.data)
    }catch (err){
        response.status(500).json({message: 'Internal Server Error'});
    }
})

export default router ;