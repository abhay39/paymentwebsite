import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './model/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import cors from 'cors';

dotenv.config();
const app=express();
app.use(express.json())
app.use(cors());

const PORT=process.env.PORT || 9000;
const MONGO_URL=process.env.MONGO_URI;

const transporter = nodemailer.createTransport({
    host: 'gmail',
    auth: {
        user: 'abhayguptaak39@gmail.com',
        pass: 'cnxnswlxhsgpsdtb'
    },
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
});

const connect=async()=>{
    try{
        await mongoose.connect(MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Connected to mongoDB")

    }catch(err){
        console.log(err)
    }
}

app.get("/",(req,res)=>{
    res.send("Hello World");
})


app.post("/signUp",async(req,res)=>{
    const {name,mobile,password,email}=req.body;
    try{
        const check=await User.findOne({mobile:mobile})
        if(check){
            res.send("User is already registered")
        }else{
            const otp=String(Math.floor(Math.random() * 9999) + 1);
            const mailOptions=({
                from: "abhayguptaak39@gmail.com",
                to: `${email}`,
                subject: 'Instant Pay Account Verification - OTP Required',
                html: `
                Dear ${name},
                <br/>Thank you for registering an account with Instant Pay, the leading payment website for secure and convenient financial transactions. To ensure the safety and protection of your account, we kindly request you to verify your identity by completing the OTP (One-Time Password) verification process.
                <b>The OTP is ${otp}</b>
                
                <br/>As a valued user, your security is of utmost importance to us. The OTP verification process helps us confirm that you are the legitimate owner of the registered email address and phone number. This additional layer of security ensures that only you have access to your Instant Pay account, preventing unauthorized access and potential fraud.
                
                <br/>To proceed with the OTP verification, please follow these steps:
                
                <br/>1. Log in to your Instant Pay account using your registered email address and password.
                <br/>2. Navigate to the "Account Settings" or "Security Settings" section, where you will find the "OTP Verification" option.
                <br/>3. Select the option to request an OTP.
                
                <br/>Once you've requested the OTP, you will receive a unique numerical code via SMS or email (depending on your preference) to the contact information associated with your account. Please enter this OTP within the designated field on the Instant Pay platform to complete the verification process.
                
                <br/>We highly recommend completing this verification promptly to enjoy the full range of services and benefits available on Instant Pay. In case you face any difficulties or have any questions, our support team is ready to assist you. Simply reach out to our customer service representatives via or visit our Help Center at Instant pay help center.
                
                <br/>Your trust and satisfaction are essential to us, and we want to ensure your experience with Instant Pay is smooth and secure. Thank you for choosing Instant Pay as your preferred payment platform.
                
                <br/><b>Best regards,
                
                <br/>Abhay Kumar Gupta
                <br/>Customer Support Representative
                <br/>Instant Pay</b>`,
            })
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                console.error('Error sending email:', error);
                } else {
                console.log('Email sent:', info.response);
                }
            });
            const hashedPassword=await bcrypt.hash(password,10);

            const user=new User({
                name:name,
                email:email,
                password:hashedPassword,
                mobile:mobile,
                otp:otp,
            });

            user.save().then((data)=>{
                res.status(201).json({
                "message":`OTP has been sent to your ${data.email}. Kindly verify it to get started`,
                "accStatus":"Account is created and you need to verify it to get started",
                "user info":data
            });
            })
        }
    }catch(err){
        throw err;
    }
    res.status(200)
})

app.post("/verifyOTP",async(req,res)=>{
    const {mobile,otp}=req.body;
    // console.log(mobile,otp)
    const userInfo=await User.findOne({mobile:mobile});


    try{
        if(otp==userInfo.otp){
            const token=await jwt.sign({id:userInfo._id},process.env.JWT_SEC,{
                expiresIn:"720h"
            })
            const update=await User.findByIdAndUpdate({
                _id:userInfo._id
            },{
                $set:{
                    isVerified:true,
                }
            })
            {update?(res.status(200).json({
                "message":"Your account has been verified successfully.",
                "token":token
            })):( res.status(308).json({"message":"Wrong OTP provided."}))}
        }else{
            res.status(308).json({"message":"Wrong OTP provided."})
        }
    }catch(err){
        console.log(err.message)
        res.status(308).json({"message":err.message})
    }
})

app.post("/sendMoney",async(req,res)=>{
    let {senderMobile,receiverMobile,amount} = req.body;
    let senderInfo= await User.findOne({ mobile : senderMobile })
    let receiverInfo= await User.findOne({ mobile : receiverMobile });
    
    try{
        if(senderInfo && receiverInfo){
            
            const balanceCheck=senderInfo.walletAmount;
            if(balanceCheck>=amount){
                receiverInfo.walletAmount +=amount;
                senderInfo.walletAmount -=amount;
                //save both user info in db after transaction
                await senderInfo.save();
                await receiverInfo.save();

                const referenceId=Number(Math.floor(Math.random() * 999999999999) + 1);
                const transactionsReceiver={
                    senderName:senderInfo.name,
                    senderMobile:senderInfo.mobile,
                    senderEmail:senderInfo.email,
                    amount:amount,
                    date:new Date(),
                    status:"success",
                    type:'credit',
                    referenceId:referenceId,
                }
                const transactionsSender={
                    receiverName:receiverInfo.name,
                    receiverMobile:receiverInfo.mobile,
                    receiverEmail:receiverInfo.email,
                    amount:amount,
                    date:new Date(),
                    status:"success",
                    type:'debit',
                    referenceId:referenceId,
                }
                const findAndUpdateForReceiver=await User.findByIdAndUpdate({
                    _id:receiverInfo._id
                },{
                    $push:{
                        transactionHistory:transactionsReceiver,
                        incomeDetails:transactionsReceiver
                    }
                })
                const findAndUpdateForSender=await User.findByIdAndUpdate({
                    _id:senderInfo._id
                },{
                    $push:{
                        transactionHistory:transactionsSender,
                        expenseDetails:transactionsSender
                    }
                })

               {findAndUpdateForSender && findAndUpdateForReceiver?( res.status(202).json({'message':"Transaction successful!"})):( res.json({'message':"Transaction Unsuccessful!"}))}
            }else{
                res.status(404).json({"message":"Your balance is less then the sending amount"})
            }
        }else{
            res.status(503).json({'message':'Number is not registered.'})
        }
    }catch(err){
        res.send(err)
    }

})

app.post("/login",async(req,res)=>{
    const {mobile,password}=req.body;
    try{
        const findId=await User.findOne({mobile:mobile});
        if(findId){
            const result=await bcrypt.compare(password,findId.password);
            if(result){
                const token=await jwt.sign({id:findId._id},process.env.JWT_SEC,{
                    expiresIn:"720h"
                })
                res.status(202).json({
                    "message":"Successfully Logged in.",
                    "token":token
                })
            }else{
                res.status(401).json({
                    "message":"Password is wrong."
                })
            }
        }else{
            res.status(406).json({
                "message":"Account is not registered yet."
            })
        }
    }catch(err){
        return err
    }
})

app.post("/userDetails",async(req,res)=>{
    const {token}=req.body;
    try{
        const decoded=await jwt.verify(token,process.env.JWT_SEC);
        const user=await User.findById(decoded.id);
        if(user){
            res.status(200).json({
                userData:user
            })
        }else{
            res.status(404).json({"message":"Not a valid token"})
        }
    }catch(err){
        res.status(404).json({"message":"Not a valid token"})
    }
})
app.listen(PORT,()=>{
    connect()
    console.log(`Server running on port ${PORT}`);
})