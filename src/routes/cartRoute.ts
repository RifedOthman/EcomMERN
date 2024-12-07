import express, { Response } from "express" ; 
import { addItemToCart, getActiveCartForUser, updateItemToCart ,deleteItemFromCart,clearCart,checkout} from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";


const router = express.Router() ; 

router.get("/", validateJWT, async (req: ExtendRequest, res) => {

  try {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart); 
  }catch (err){
    res.status(500).send({ message: "Error fetching cart" });
  }
  });


router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const {productId , quantity } = req.body
    const response = await addItemToCart({ userId , productId , quantity});
    res.status(res.statusCode).send(response.data);
  }catch (err){
    res.status(500).send({ message: "Error adding item to cart" });
  }
  });

  router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
    try{  const userId = req?.user?._id;
      const {productId , quantity } = req.body
      const response = await updateItemToCart({ userId , productId , quantity});
      res.status(res.statusCode).send(response.data);}
      catch(err){
        res.status(500).send({ message: "Error updating item in cart" });
      }
  
  });

  router.delete("/items/:productId", validateJWT, async (req: ExtendRequest, res) => {
    try{
      const userId = req?.user?._id;
      const { productId } = req.params ; 
      const response = await deleteItemFromCart({ userId , productId });
      res.status(res.statusCode).send(response.data);
    }catch(err){
      res.status(500).send({ message: "Error deleting item from cart" });
    }
   
  });

  router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
    try{
      const userId = req?.user?._id;
      const response = await clearCart({ userId });
      res.status(res.statusCode).send(response.data);
    }catch(err){
      res.status(500).send({ message: "Error Something wrong ! " });
    }
  
  });


  router.post("/checkout", validateJWT, async(req:ExtendRequest, res)=>{
    try {
      const userId = req?.user?._id;
      const {adress} = req.body ; 
      console.log(adress)  ;
      const response = await checkout({userId,adress}) ; 
      res.status(res.statusCode).send(response.data);
    
    }catch(err){
      res.status(500).send({ message: "Error Something wrong ! " });
    }
     
  
  })

export default router ;

