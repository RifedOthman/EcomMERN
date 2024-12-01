import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

const app = express();
const port = 3001;

app.use(express.json())

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MONGOO connected ! YEY"))
  .catch((err) => console.log("FAILED TO CONNECT MONGO", err));


app.use('/user',userRoute)

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port} `)
});

