const mongoose=require("mongoose");

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{})
        console.log("MongoDb connected");
    } catch (error) {
        console.log("Error connecting to MongoDb:",error);
        process.exit(1)
        
    }
}
module.exports=connectDb