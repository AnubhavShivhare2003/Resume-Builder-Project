const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userModel = require("../models/User");


//Generate JWT Token
const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"7D"})
};

//@desc Register a new User
//@route POST/api/auth/register
//@access Public

const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        //Check if user already exists

        const userExists=await userModel.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        //Hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        //Create new user
        const user=await userModel.create({name,email,password:hashedPassword,profileImageUrl:req.body.profileImageUrl||null});
        res.status(201).json({_id:user._id,
            name:user.name,
            email:user.email,
        profileImageUrl:user.profileImageUrl,
        token:generateToken(user._id)});
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
}


//@desc Login User
//@route POST/api/auth/profile
//@access  Public
const loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
            const user=await userModel.findOne({email});
            if(!user){
                return res.status(500).json({message:"Invalid email or password"})
            }
              //compare Password;
              const isMatch=await bcrypt.compare(password,user.password);
              if(!isMatch){
                return res.status(500).json({message:"Invalid email or password"})
              }
              
             
              //Return user data with Jwt;
              res.json({_id:user._id,
                name:user.name,
                email:user.email,
                profileImageUrl:user.profileImageUrl,
                token:generateToken(user._id)
              })
    } catch (error) {
       res.status(500).json({message:"Server error",error:error.message})   
       console.log(error) 
    }
}

//@desc GET user profile
//@route GET /api/auth/profile
//@access Private (Requires Jwt)
const getUserProfile=async (req,res)=>{
    try {
       const user=await userModel.findById(req.user.id).select("-password") ;
       if(!user){
        return res.status(404).json({message:"User not found"});
       }
       res.json(user);
    } catch (error) {
       res.status(500).json({message:"Server error",error:error.message})    
    }
}

module.exports={registerUser, loginUser, getUserProfile}