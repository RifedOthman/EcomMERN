import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import { Product } from '../types/Product';

const HomePage = ()=> {

    const [products, setProducts] =  useState <Product[]>([]); 


    useEffect(()=>{
        fetch("http://localhost:3001/product").then (async(response) =>{
            const data = await response.json(); 
            console.log(data) ; 
            setProducts(data) ;
        })
    })
    return <Container sx= {{mt: 2}}>
        <Grid container spacing = {2 }>
            {products.map(({_id , title , image , price})=> (
                            <Grid item md = {4}>
                                 <ProductCard id={_id} title={title}  image = {image }  price = {price}  />
                             </Grid>

            ))}
          

        </Grid>
        
    </Container>

}
export default HomePage ; 