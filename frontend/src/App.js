import React, { useEffect, useState } from 'react'
import SignUp from './components/SignUp'
import VerifyOTP from './components/verifyOTP'
import Login from './components/Login'
import Home from './components/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
} from "react-router-dom";
import {Authinication} from './auth/authState';
import TopNav from './components/TopNav'

const App = () => {
  const getData=()=>{
    const le=localStorage.getItem("userState")
    if(le){
      setUser(JSON.parse(le))
    }
    else{
      setUser(false)
    }
  }
  
  useEffect(()=>{
    getData()
  })

  const [user,setUser]=useState(false)
  const [data,setData]=useState("")
  const URL="http://localhost:5000"

  return (
    <Authinication.Provider value={{user, setUser,data,setData,URL}}>
      <Router>
        <div>

          <Routes>
            {user?
            (<>
            <Route path='/' element={<Home />} />
            <Route path='/otpverification' element={<VerifyOTP />} />
            </>)
            :
            (<>
              <Route path='/' element={<Login />} />
              <Route path='/signUp' element={<SignUp />} />
              
            </>)
            }
          </Routes>
        </div>
      </Router>
    </Authinication.Provider>
  )
}

export default App