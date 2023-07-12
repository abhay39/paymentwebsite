import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Authinication } from '../auth/authState';

const SignUp = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [mobile,setMobile]=useState(0)
    const navigation=useNavigate()
    const {user,setUser}=useContext(Authinication);

    const signUp=async()=>{        
        const response=await axios.post(`http://localhost:5000/signUp`,{
            "name":name,"email":email,"password":password,"mobile":mobile
        })
        
        toast.success(response.data.message)
        toast.warn(response.data.accStatus)
        setTimeout(()=>{
            navigation("/")
        })
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
        }}>Create account</h1>

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
            <ToastContainer />
            {/* form */}
            <div style={{padding:10,alignItems:'center'}}>
                <label>Name:</label>
                <input onChange={(text)=>setName(text.target.value)} style={{
                    padding:5,outline:'none',margin:10,color:'green',fontWeight:'500',fontSize:18,backgroundColor:'#EAEAEA',borderRadius:10
                }} type="text" placeholder='Enter your name'/>
            </div>
            <div style={{padding:10,alignItems:'center'}}>
                <label>Email:</label>
                <input onChange={(text)=>setEmail(text.target.value)} style={{
                    padding:5,outline:'none',margin:10,color:'green',fontWeight:'500',fontSize:18,backgroundColor:'#EAEAEA',borderRadius:10
                }} type='email' placeholder='Enter your email id'/>
            </div>
            <div style={{padding:10,alignItems:'center'}}>
                <label>Password:</label>
                <input onChange={(text)=>setPassword(text.target.value)} style={{
                    padding:5,outline:'none',margin:10,color:'green',fontWeight:'500',fontSize:18,backgroundColor:'#EAEAEA',borderRadius:10
                }} type='password' placeholder='Enter your password'/>
            </div>
            <div style={{padding:10,alignItems:'center'}}>
                <label>Mobile:</label>
                <input onChange={(text)=>setMobile(text.target.value)} style={{
                    padding:5,outline:'none',margin:10,color:'green',fontWeight:'500',fontSize:18,backgroundColor:'#EAEAEA',borderRadius:10
                }} type='number' placeholder='Enter your mobile number'/>
            </div>

                <button style={{
                    backgroundColor:'red',
                    padding:10,
                    borderRadius:15,
                    fontSize:18,fontWeight:'600',
                }} onClick={signUp}>Sign up</button>
                <br/>
                <h1>Already Have an account? <Link to="/" style={{color:'black',textDecoration:'underline'}}>Login Now</Link></h1>
                
        </div>
        </div>
    </div>
  )
}

export default SignUp