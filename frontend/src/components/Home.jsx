import React, { useContext, useEffect, useState } from 'react'
import { Authinication } from '../auth/authState';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import {GiMoneyStack} from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  localStorage.setItem("userState",true)

  const tokenId=localStorage.getItem("token");
  const {data,setData}=useContext(Authinication)
  const navigation=useNavigate()

  const [receiverNumber,setReceiverNumber]=useState()
  const [amount,setAmount]=useState()

  const getUserDetails=async()=>{
    const response=await fetch("http://localhost:5000/userDetails",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body:JSON.stringify({
            "token":tokenId,
        })
    })
    const datas=await response.json();
    const statusCode=response.status;
    if(statusCode===200){
      setData(datas.userData)
      const isVerified=datas.userData.isVerified;
      const mobileNum=datas.userData.mobile;
      if(isVerified===false){
         navigation("/otpverification",{
          state:{
            "mobile":mobileNum
          }
         })
      }
    }
  }
  const sendMoney=async()=>{
    const response=await fetch("http://localhost:5000/sendMoney",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body:JSON.stringify({
            "senderMobile":data.mobile,
            "receiverMobile":receiverNumber,
            "amount":amount,
        })
    })
    const datas=await response.json();
    const statusCode=response.status;
    const message=datas.message;
    if(statusCode===202){
      toast.success(message)
      setAmount("")
      setReceiverNumber("")
    }else{
      toast.error(message)
    }
  }

  
  useEffect(()=>{
    getUserDetails()
  })

  return (
    <div style={{height:'100vh'}}>
      <TopNav image={data.image}/>
      <ToastContainer />
      <div style={{backgroundColor:'#A9AABC',padding:20,height:'100%'}}>

        <div style={{backgroundColor:'red',width:'100%',padding:20,borderRadius:20,display:'flex',alignItems:'center',justifyContent:'space-around'}}>
          <div style={{alignItems:'center',justifyContent:'center',width:'30%',display:'flex',flexDirection:'column'}}>
            <BsFillArrowUpRightCircleFill color='white'  size={80}/>
            <h1 style={{fontSize:30,fontWeight:'600',color:'white'}}>Send Money</h1>
          </div>
          <div style={{alignItems:'center',justifyContent:'center',width:'30%',display:'flex',flexDirection:'column',color:'yellow'}}>
            <GiMoneyStack color='yellow'  size={80}/>
            <h1 style={{fontSize:30,fontWeight:'600',color:'yellow'}}>Wallet Amt : Rs. {parseFloat(data.walletAmount?.toFixed(3))}</h1>
          </div>
          <div style={{display:'grid',placeItems:'center'}}>
            <input value={receiverNumber}  onChange={(text)=>setReceiverNumber(text.target.value)} type='number' placeholder='Enter the mobile number' style={{
              padding:10,borderRadius:20,width:'100%'
            }}/>
            <input  value={amount} onChange={(text)=>setAmount(text.target.value)} type='number' placeholder='Enter amount' style={{
              padding:10,borderRadius:20,width:'100%',marginTop:10
            }}/>
            <div>
              <button onClick={sendMoney} style={{backgroundColor:'green',padding:20,color:'white',borderRadius:30,marginTop:15,fontSize:22,fontWeight:'500'}}>Send Money</button>
            </div>
          </div>
        </div>

          <h1 style={{fontSize:35,fontWeight:'600',color:'green'}}>Transactions History of {data.name}:</h1>
            <div>
                <table>
                  <tr>
                    <th>S.No</th>
                    <th>Ref. No.</th>
                    <th>Received by / Send by</th>
                    <th>Receiver mobile / Send mobile </th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Transaction Type</th>
                    <th>Date</th>
                  </tr>
                  {data.transactionHistory?.length>0?(data.transactionHistory.map((item,index)=>{
                    const mongoTime=new Date(item.date);
                    const localDate=mongoTime.toLocaleDateString()
                    const localtime=mongoTime.toLocaleTimeString()
              return(
                    <tr>
                      <td>{index+1}</td>
                      <td>{item.referenceId}</td>
                      <td>{item.receiverName || item.senderName}</td>
                      <td>{item.receiverMobile || item.senderMobile}</td>
                      <td>{item.amount}</td>
                      <td>{item.status}</td>
                      <td>{item.type}</td>
                      <td>{localDate} {localtime}</td>
                    </tr>
              )
            })):(<h1 style={{fontSize:30,fontWeight:'600',color:'red'}}>No Transactions is done yet😒😒😒</h1>)}
            </table>
            </div>
      </div>
    </div>
  )
}

export default Home