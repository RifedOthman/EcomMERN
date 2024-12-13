
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

import AuthProvider from './context/Auth/AuthProvider'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path = "/" element={<HomePage></HomePage>}/>
        <Route path = "/register" element={<RegisterPage></RegisterPage>}/>
        <Route path = "/login" element={<LoginPage></LoginPage>}/>

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
