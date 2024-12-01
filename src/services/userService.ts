import userModel from "../models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export const register = async ({firstName,lastName,email,password}:RegisterParams) => {
  const findUser = await userModel.findOne({email});

  if (findUser) {
    return { data:"user already exists ! ",statusCode:400 };
  }

  const hashedPassword = await bcrypt.hash(password,10)
  const newUser = new userModel({
    email,password: hashedPassword,firstName,lastName
  })
  await newUser.save()
  return { data: generateJWT({firstName,lastName,email}),statusCode:200 } ; 
}


interface LoginParams{
    email: string;
    password: string;
}

export const login = async ({email,password}: LoginParams)=>{

    const findUser = await userModel.findOne({email})

    if (!findUser){
        return { data:"user not found  ",statusCode:400 };
    }

    const passwordMatch = await bcrypt.compare(password,findUser.password) ; 
    if (!passwordMatch){
        return { data:"Incorrect paasword ",statusCode:400 };
    }else 
    return {data : generateJWT({email,firstName: findUser.firstName , lastName: findUser.lastName}), statusCode: 200 } ;
}


const generateJWT = (data: any)=> {
    return jwt.sign(data, '|Qq2idD}X%eF,LZ}Kk%>AfJ4r>*o<CvK')
}