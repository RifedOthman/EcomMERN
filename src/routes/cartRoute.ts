import express, { Response } from "express" ; 
import { getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";


const router = express.Router() ; 

router.get("/", validateJWT, async (req, res) => {
    const userId = (req as any).user?._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
  });

  
export default router ;