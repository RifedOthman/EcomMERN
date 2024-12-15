import  { cartModel } from "../models/cartModel" ; 
import { IOrderItem, orderModel } from "../models/orderModel";
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
    populateProduct? : boolean ; 
}


export const getActiveCartForUser = async ({userId,populateProduct} : GetActiveCartForUser)=>{

    let cart  ; 
    if (populateProduct) {
        cart = await cartModel
        .findOne({userId,status:"active"})
        .populate('items.product'); 
    } else {
       cart = await cartModel.findOne({userId,status:"active"}); 
    }

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

return {data : await getActiveCartForUser({userId, populateProduct:true}) , statusCide : 201 } ; 
}

interface UpdateItemInCart{
    productId: any ; 
    userId: string ;
    quantity : number ; 
}

export const updateItemToCart = async ({userId, productId, quantity }:UpdateItemInCart)=>{
    const cart = await getActiveCartForUser({userId}) ; 
    
    //existing item that we are going to update 
    const existsInCart = cart.items.find((p)=> p.product.toString() === productId);
    
    if (!existsInCart){
        return {data : "item doesnt exist in cart  !", statusCode:400 } ; 
    }

    const product = await productModel.findById(productId) ; 
    if (!product){
        return {data : "product not found !", statusCode:404 } ;
    } 

    if (product.stock < quantity ){
        return {data : "product stock is less than quantity !", statusCode:400 } ;
    }

    // calculating sum of cart except the one that we will update 
    const otherCartItems = cart.items.filter((p)=> p.product.toString() !== productId )    
    let total = otherCartItems.reduce((sum, product)=> {
        sum += product.quantity * product.unitPrice ; 
        return sum ; 
    },0) 


    //now , we add our existing cart to the sum of cart 
    existsInCart.quantity = quantity ; 

    total += existsInCart.quantity * existsInCart.unitPrice ; 

    cart.totalAmount = total ; 

    await cart.save() ; 

    return {data : await getActiveCartForUser({userId, populateProduct: true }) , statusCode : 201 } ; 
}; 

interface deleteItemFromCart{
    productId: any ; 
    userId: string ; 
} 


export const deleteItemFromCart = async ({userId , productId}:deleteItemFromCart)=> {
    const cart = await getActiveCartForUser({userId}) ; 
    
    const existsInCart = cart.items.find((p)=> p.product.toString() === productId);
    
    if (!existsInCart){
        return {data : "item Doesnt Exists in cart !", statusCode:400 } ; 
    }

    const otherCartItems = cart.items.filter((p)=> p.product.toString() !== productId )    
    const total = otherCartItems.reduce((sum, product)=> {
        sum += product.quantity * product.unitPrice ; 
        return sum ; 
    },0) 

    cart.items = otherCartItems ; 
    
    cart.totalAmount = total ; 
 
    const updateCart = await cart.save() ; 

    return {data : await getActiveCartForUser({userId, populateProduct: true}) , statusCode : 201 } ; 
};


interface clearCart{
    userId: string ; 
}  

export const clearCart = async({userId}:clearCart)=>{
    const cart = await getActiveCartForUser({userId}) ; 
    cart.items= []  ; 
    cart.totalAmount = 0 ;
    const updateCart = await cart.save() ; 
    return {data : updateCart , statusCode : 201 } ; 

}; 
interface checkOut{
    userId:string ; 
    adress : string ; 
}
export const checkout = async ({userId, adress}:checkOut)=>{
    if (!adress ){
        return {data : "adress is required", statusCode : 400 }
    }
    
    const cart = await getActiveCartForUser({userId}); 
  
    const orderItems : IOrderItem[] = [] 
    // looping cart then i create with it an order
    for (const item of cart.items ){
        const product = await productModel.findById(item.product) ;
        if (!product ){
            return {data : "Product not found" , statusCode : 400 } ; 
    }

    

    const orderItem:IOrderItem = {
        productTitle : product.title  ,
        productImage : product.image ,
        quantity : item.quantity , 
        unitPrice: item.unitPrice ,         
    }

    orderItems.push(orderItem) 

    }
    console.log(orderItems) ; 

    const order = await orderModel.create ({
        orderItems , 
        total: cart.totalAmount , 
        adress, 
        userId ,
    }) ; 
    await order.save() ;
    // update cart status to completed : 
    cart.status = "completed" ; 
    await cart.save() ;
    //return data 
    return {data : order , statusCode : 201 } ;

}