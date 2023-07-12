import React, { useContext } from 'react'
import {IoMdNotifications} from 'react-icons/io'
import {AiFillSetting} from 'react-icons/ai'
import { Authinication } from '../auth/authState'

const TopNav = (props) => {

    const {user,setUser}=useContext(Authinication)
    
  return (
    <div style={{height:50,backgroundColor:'white',display:'flex',justifyContent:'space-between',padding:10,alignItems:'center',}}>
        <div>
            <img src={require('./logo.png')} alt='logo' style={{height:40,width:80,marginTop:-5,borderRadius:15}}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-around'}}>
            <h1 style={{marginLeft:30,cursor:'pointer'}}>Dashboard</h1>
            <h1 style={{marginLeft:30,cursor:'pointer'}}>Invoices</h1>
            <h1 style={{marginLeft:30,cursor:'pointer'}}>Wallet</h1>
            <h1 style={{marginLeft:30,cursor:'pointer'}}>Help</h1>
            <div style={{backgroundColor:'gray',alignItems:'center',justifyContent:'center',padding:5,borderRadius:20,marginLeft:30,cursor:'pointer'}}>
                <IoMdNotifications size={20} color='white'/>
            </div>
            <div style={{backgroundColor:'gray',alignItems:'center',justifyContent:'center',padding:5,borderRadius:20,marginLeft:30,cursor:'pointer'}}>
                <AiFillSetting size={20} color='white'/>
            </div>
            <div style={{backgroundColor:'gray',alignItems:'center',justifyContent:'center',padding:5,borderRadius:20,marginLeft:30,cursor:'pointer'}} onClick={()=>{
                localStorage.removeItem('token')
                localStorage.removeItem('userState')
                setUser(false)
            }}>
                <img src={props.image} style={{
                    height:20,width:20,borderRadius:50
                }}/>
            </div>
            
        </div>
        
    </div>
  )
}

export default TopNav