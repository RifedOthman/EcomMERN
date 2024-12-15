import { Box, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

const CartPage = ()=> {
    const {token} =  useAuth() ; 
    const {cartItems, totalAmount} = useCart() ; 
    const [,setError] = useState('') ;



return ( 
<Container sx= {{mt: 2}}>
    <Typography>
        Cart Page
    </Typography>

    {cartItems.map((item) => (
        <Box> 
            {item.title} 
        </Box>
    ))}
</Container>
) ; 
        
};

export default CartPage