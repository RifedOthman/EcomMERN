
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

import AuthProvider from './context/Auth/AuthProvider'
import CartPage from './pages/CartPage'
import ProtectedRoute from './components/ProtectedRoute'
import CartProvider from './context/Cart/CartProvider'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path = "/" element={<HomePage></HomePage>}/>
        <Route path = "/register" element={<RegisterPage></RegisterPage>}/>
        <Route path = "/login" element={<LoginPage></LoginPage>}/>
        <Route element={<ProtectedRoute/>}> 
        <Route path = "/cart" element={<CartPage></CartPage>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  )
}

export default App
