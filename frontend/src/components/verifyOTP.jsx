import React, { useContext, useState } from 'react'
import axios from 'axios'
import {useLocation, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Authinication} from '../auth/authState'

const VerifyOTP = () => {
    const [otp,setOtp]=useState(0)
    const location=useLocation();

    const {user,setUser}=useContext(Authinication);

    const mobileNumber=location.state.mobile;
    const navigation=useNavigate()


    const signUp=async()=>{        
        const response=await fetch("http://localhost:5000/verifyOTP",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            },
            body:JSON.stringify({
                "mobile":mobileNumber,
                "otp":otp
            })
        })

        const statusCode=response.status;
        const data=await response.json();

        if(statusCode===200){
            const message=data.message
            toast.success(message);
            navigation("/")
        }else if(statusCode===308){
            const message=data.message
            toast.error(message);
        }
    }
    console.log(mobileNumber)

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
        }}>Verify OTP</h1>
        
        

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
                <label>OTP:</label>
                <input onChange={(text)=>setOtp(text.target.value)} style={{
                    padding:5,outline:'none',margin:10,color:'green',fontWeight:'500',fontSize:18,backgroundColor:'#EAEAEA',borderRadius:10
                }} type='number' placeholder='Enter your otp'/>
            </div>
            <button style={{
                backgroundColor:'red',
                padding:10,
                borderRadius:15,
                fontSize:18,fontWeight:'600',
            }} onClick={signUp}>Verify OTP</button>
            
        </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default VerifyOTP