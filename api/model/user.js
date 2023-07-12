import mongoose from "mongoose";

const Users=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:Number,
        default:"",
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
    },
    walletAmount:{
        type:Number,
        default:0,
    },
    incomeDetails:{
        type:[{}],
        default:[]
    },
    transactionHistory:{
        type:[{}], //array of objects with keys amount and date
        default:[]
    },
    expenseDetails:{
        type:[{}],
        default:[]
    }
},{timestamps:true})

export default mongoose.model("User",Users)