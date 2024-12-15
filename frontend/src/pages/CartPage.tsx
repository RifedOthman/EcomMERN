import {  Container, Typography } from "@mui/material"
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup'; 
import Box from '@mui/material/Box';


const CartPage = ()=> {
    const {cartItems, totalAmount} = useCart() ; 



return ( 
<Container fixed sx= {{mt: 2}}>
    <Typography>
        Cart Page
    </Typography>
<Box display = "flex" flexDirection="column" gap={4} > 
    {cartItems.map((item) => (
        <Box display = 'flex ' flexDirection='row' justifyContent="space-between" alignItems="center" 
        sx={{border : 1 , borderColor: "f2f2f2" , borderRadius: 5 
        }} > 
            <img src={item.Image} width={158}></img>
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
        <Button>-</Button>
        <Button>+</Button>
        </ButtonGroup>
        <Button>Remove item </Button>
    
        </Box>

        
    ))}
    </Box>
</Container>
) ; 
        
};

export default CartPage