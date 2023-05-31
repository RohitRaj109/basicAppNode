import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    phone:{type:Number,},
    userName:{type:String,},
    password:{type:String,required:true,trim:true},
    password_confirmation:{type:String,required:true,trim:true}
})
const UserModel = mongoose.model("basicApps",userSchema)
export default UserModel