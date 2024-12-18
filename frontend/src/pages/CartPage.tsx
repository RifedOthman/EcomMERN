import {  Container, Typography } from "@mui/material"
import { useCart } from "../context/Cart/CartContext";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup'; 
import Box from '@mui/material/Box';


const CartPage = ()=> {
    const {cartItems, totalAmount , updateItemInCart , deleteItemInCart, clearCart} = useCart() ; 
    
    const handleQuantity = (productId: string , quantity : number ) =>{
        if (quantity <= 0) {return ;}

        updateItemInCart(productId, quantity)
    } ; 

    const handleRemoveItem = (productId: string ) => {
        deleteItemInCart(productId) ; 
    }
    

    

return ( 
<Container fixed sx= {{mt: 2}}>
    
   
     {cartItems.length ?   
     <>
     <Typography>
     Cart Page
 </Typography>
     <Box display = 'flex' flexDirection='column' gap={4} > 
        {cartItems.map((item) => (
            <Box 
            display = 'flex ' 
            flexDirection='row' 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{
                border : 1 , borderColor: "f2f2f2" , borderRadius: 5 
            }} > 
                <img src={item.image} width={158}></img>
                <Typography>
                {item.title}  
                </Typography>
                <Typography>
                    {item.quantity}
                X 
                    {item.unitPrice}
                    $
                </Typography>

            <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={() =>  handleQuantity(item.productId, item.quantity -1 ) }>-</Button>
            <Button onClick={() => handleQuantity(item.productId, item.quantity +1 )}>+</Button>
            </ButtonGroup>
            <Button onClick={()=> {
                handleRemoveItem(item.productId)
            }}> Remove item </Button>
        
            </Box>

            
        ))}

        <Box>
            <Typography variant='h4' >
                Total Amount : {totalAmount.toFixed(2) +" $"}
            </Typography>
            <Box display="flex" flexDirection='row' justifyContent="space-between" > 
            <Typography variant='h4'>
            <Button onClick={()=> {
                clearCart()
            }}> Clear ALL </Button>
            </Typography>
        </Box>
        </Box>
        </Box> </> : <Typography> Cart is Empty Please ADD ITEMS </Typography> }
        
</Container>
) ; 
        
};

export default CartPage