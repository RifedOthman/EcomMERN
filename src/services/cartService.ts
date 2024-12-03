import  { cartModel } from "../models/cartModel" ; 
import productModel from "../models/productModel";



interface CreateCartForUser{
    userId:string ; 

}

const createCartForUser= async ({userId} : CreateCartForUser)=>{
    const cart = await cartModel.create({userId,totalAmount : 0})
    await cart.save(); 
    return cart ; 
}

interface GetActiveCartForUser{
    userId: string ;
}


export const getActiveCartForUser = async ({userId} : GetActiveCartForUser)=>{

    let cart = await cartModel.findOne({userId,status:"active"}); 

    if (!cart){
        cart = await createCartForUser ({userId}) ; 
    }
    return cart ; 
}

interface addItemToCart{
    productId: any ; 
    userId: string ;
    quantity : number ; 
}

export const addItemToCart = async ({userId, productId, quantity }:addItemToCart)=>{
    const cart = await getActiveCartForUser({userId}) ; 
    
    const existsInCart = cart.items.find((p)=> p.product.toString() === productId);
    
    if (existsInCart){
        return {data : "item already exist in cart !", statusCode:400 } ; 
    }

    const product = await productModel.findById(productId) ; 

    if (!product){
        return {data : "product not found !", statusCode:404 } ;
    }

    if (product.stock < quantity ){
        return {data : "product stock is less than quantity !", statusCode:400 } ;
    }
   
cart.items.push({
    product: productId,
    unitPrice: product.price ,
    quantity: quantity 
    })

cart.totalAmount += product.price * quantity  ; 

const updateCart = await cart.save() ; 

return {data : updateCart , statusCide : 201 } ; 
}