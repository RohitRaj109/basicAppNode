
import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    static userRegistration = async (req,res)=>{
        const {name,email,phone,userName, password} = req.body
        const user = await UserModel.findOne({email:email})
        if(user){
            res.send({"success":false, "message":"email already exist"})
        }else{
            if(name && email && password ){
         
                  try{
                    const salt = await bcrypt.genSalt(12);
                    const hashPassword = await bcrypt.hash(password,salt);
                    const doc = new UserModel({
                        name:name,
                        email:email,
                        phone:phone,
                        userName:userName,
                        password:hashPassword,
                    })
                    await doc.save()
                    const saved_user = await UserModel.findOne({email:email})
                    //generate jwt token
                    const token = jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                    res.status(200).send({'success':true,message:"Registration successfully complited",token:token})
                  }catch(err){
                    res.send({success:false,"message":err})
                  }
               
            }else{
                res.send({success:false,"message":"all fields are required" })
            }
        }
    }
    static userLogin = async (req,res)=>{
         try{
            const {email,password} = req.body;
            if(email && password){
                const user = await UserModel.findOne({email:email});
                if(user != null){
                    const isMatch= await bcrypt.compare(password, user.password)
                    if(user.email === email && isMatch ){
                       
                        
                    //generate jwt token
                    const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                   
                        res.send({success:true,message:'login success',token:token})
                    }else{
                        res.send({success:false,message:'email or password is wrong'})
                    }
                }else{
                    res.send({success:false,message:'you are not registered with us'})
                }
            }else{
                res.send({success:false,message:'all fields are required'})
            } 
         }catch(err){
            
            res.send({success:false,message:'unable to login'})
         }
    }
    static loggedUser = async (req,res)=>{
        res.send({user:req.user})
    }
}
    export default UserController