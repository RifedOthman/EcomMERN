import express, { Response } from "express" ; 
import { addItemToCart, getActiveCartForUser, updateItemToCart } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";


const router = express.Router() ; 

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
  });


router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const {productId , quantity } = req.body
    const response = await addItemToCart({ userId , productId , quantity});
    res.status(res.statusCode).send(response.data);
  });

  router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const {productId , quantity } = req.body
    const response = await updateItemToCart({ userId , productId , quantity});
    res.status(res.statusCode).send(response.data);
  });

export default router ;