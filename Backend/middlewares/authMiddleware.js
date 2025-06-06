const jwt=require("jsonwebtoken");
const userModel = require("../models/User");


//Middleware to protect routes
const protect=async (req,res,next)=>{
    try {
        let token=req.headers.authorization;
        if(token && token.startsWith("Bearer")){
            token=token.split(" ")[1] //Extract token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
             req.user=await userModel.findById(decoded.id).select("-password");
            next();
        }
        else{
            res.status(401).json({message:"Not authorized ,no token"})
        }
    } catch (error) {
        res.status(401).json({message:"Token Failed",error:error.message})
    }
}

module.exports={protect};