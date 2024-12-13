import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef , useState} from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [error,setError] = useState("")
    const emailRef = useRef<HTMLInputElement>(null); 
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate() ; 

    const {login}  = useAuth() ; 
    
    const onSubmit = async() => {
        const email = emailRef.current?.value ; 
        const password = passwordRef.current?.value ;


        if ( !email || !password ) {
          return ; 
        }

        const response = await fetch (`${BASE_URL}/user/login` , {
            method: "POST", 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email , password 
            })
        });

        if (!response.ok ){
            setError("unable to login USER ! try diffenent credentials ") ; 
            return ; 

        }
        const token = await response.json() ; 

        if (!token){
          setError("incorrect token")
          return ; 
        }

        login(email,token);
        navigate("/") ; 


    }
    return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }} >

        <Typography variant="h6" paddingBottom={4}>WELCOME</Typography>
        <Box sx={{display : "flex"  , flexDirection:"column" , gap : 2 , border : 2 , borderColor: "#f5f5f5" , p:2,  boxShadow: '0 0 1px ' }}>
            <TextField inputRef={emailRef} label="Email Name" name ="email "> </TextField>            
            <TextField inputRef={passwordRef} label="Password" name ="password " type = "password"> </TextField> 
            <Button variant ='contained' onClick={onSubmit}> Login</Button>
            {error && <Typography sx= {{color : "red "}}>{error}</Typography> }  
        </Box>
        
      </Box>
    </Container>
  );
};
export default LoginPage;
