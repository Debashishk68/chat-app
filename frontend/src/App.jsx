import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
// import SignUp from './routes/Singnup'
// import SignInScreen from './routes/Signin'
import Dashboard from './routes/Dashboard'
import LoginPage from './routes/LoginPage'
import RegisterPage from './routes/RegisterPage'
import Logout from './routes/Logout'

const App = () => {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/signup' element={<SignUp/>}/> */}
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path=":id/logout" element = {<Logout/>}/>

      </Routes>
   </Router>
  )
}

export default App