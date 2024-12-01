import express from "express" ; 
import { getActiveCartForUser } from "../services/cartService";

const router = express.Router() ; 

router.get('/', async (req , res)=>{
        //NEED JWT USER ID 
    const cart = await getActiveCartForUser({userId:"XX"}) ; 
    res.status(200).send(cart) ; 
    
})