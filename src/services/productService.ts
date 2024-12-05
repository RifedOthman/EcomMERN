import productModel from "../models/productModel"; 

export const getAllProducts = async ()=> {
    return await productModel.find(); 
};

export const seedInitialProducts = async ()=> {
    const products = [
        { title: "SONY",image:"https://m.media-amazon.com/images/I/61-rQj6wZnL.jpg", price: 10.99 , stock: 100},
        { title: "ACER",image:"https://m.media-amazon.com/images/I/61-rQj6wZnL.jpg", price: 10.99 , stock: 100}
        
    ]; 

    const existingProducts = await getAllProducts(); 
    if (existingProducts.length === 0 ){
        await productModel.insertMany(products)
    }


}

