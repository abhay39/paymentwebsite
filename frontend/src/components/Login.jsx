import React, { useContext, useState } from 'react'
import axios from 'axios'
import {Link, useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Authinication} from '../auth/authState'

const Login = () => {
    const [password,setPassword]=useState(0)
    const [mobile,setMobile]=useState(0)
    const location=useLocation();

    const {user,setUser}=useContext(Authinication);


    const loginNow=async()=>{        
        const response=await fetch("http://localhost:5000/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            },
            body:JSON.stringify({
                "mobile":mobile,
                "password":password
            })
        })
        const statusCode=response.status;
        const data=await response.json();
        console.log(data)
        
        if(statusCode===202){
            const token=data.token
            localStorage.setItem("token",token)
            const message=data.message;
            toast.success(message)
            setTimeout(()=>{
                setUser(true)
            },1000)
        }else if(statusCode===401){
            let passwordError=data.message
            toast.error(passwordError)
        }        
        else if(statusCode===406){
            let mobileNumberError=data.message
            toast.error(mobileNumberError)
        }        
        
    }

  return (
    <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100vh'
    }}>
        <div style={{backgroundColor:'black',width:'40%',color:'white',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <h1 style={{
            fontSize:35,fontWeight:'900'
        }}>Instant Pay</h1>
        </div>
        <div style={{backgroundColor:'white',width:'60%',height:'100vh',display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center'}}>
        <h1 style={{
            fontSize:35,fontWeight:'900'
        }}>Login</h1>
        
        

        <div style={{
            padding:10,
            marginTop:20,
            borderRadius:20,
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            color:'white',
            backgroundColor:'gray'
        }}>
            {/* form */}
            
            <div style={{padding:10,alignItems:'center'}}>
                <label>Mobile Number: </label>
                <input onChange={(text)=>setMobile(text.target.value)} style={{
                    padding:5,outline:'none',margin:10,color:'green',fontWeight:'500',fontSize:18,backgroundColor:'#EAEAEA',borderRadius:10
                }} type='number' placeholder='Enter your mobile number'/>
            </div>
            <div style={{padding:10,alignItems:'center'}}>
                <label>Password:</label>
                <input onChange={(text)=>setPassword(text.target.value)} style={{
                    padding:5,outline:'none',margin:10,color:'green',fontWeight:'500',fontSize:18,backgroundColor:'#EAEAEA',borderRadius:10
                }} type='password' placeholder='Enter your password'/>
            </div>
            <button style={{
                backgroundColor:'red',
                padding:10,
                borderRadius:15,
                fontSize:18,fontWeight:'600',
            }} onClick={loginNow}>Login</button>
            <h1>Don't Have an account? <Link to="/signup" style={{color:'black',textDecoration:'underline'}}>SignUp Now</Link></h1>
        </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login