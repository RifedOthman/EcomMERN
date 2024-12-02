import { NextFunction, Response,Request } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExtendRequest } from "../types/extendedRequest";
const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {

  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
     res.status(403).send("No authorization header");
     return ; 
  } const token = authorizationHeader.split(" ")[1];

  if (!token) {
     res.status(403).send("No token");
     return ; 
  }
//payload has the data crypted inside
jwt.verify(token,"|Qq2idD}X%eF,LZ}Kk%>AfJ4r>*o<CvK", async (err, payload) => {
  if (err) {
     res.status(403).send("Invalid token");
     return ; 
  }
  if (!payload) {
    res.status(403).send("Invalid Payload");
    return; 
 }
  //const userPayload = payload as any ;
  const userPayload = payload as {
    email: String,
    firstName: String,
    lastName: String,
  };
  //fetch user from database based on the payload
  const user = await userModel.findOne({ email: userPayload.email });
  req.user = user;
  next();
});

};

export default validateJWT;
