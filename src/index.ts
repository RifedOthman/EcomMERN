import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";

const app = express();
const port = 3001;

app.use(express.json())

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MONGOO connected ! YEY"))
  .catch((err) => console.log("FAILED TO CONNECT MONGO", err));

  //seed products
  seedInitialProducts(); 


app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/cart',cartRoute)

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port} `)
});

