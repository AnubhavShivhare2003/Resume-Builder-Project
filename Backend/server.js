require("dotenv").config();
const express=require("express")
const cors=require("cors");
const path=require("path");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes=require("./routes/resumeRoutes")
const app=express();


//Middleware to handle CORS
app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        methods:["GET","POST","DELETE","PUT"],
        allowedHeaders:["Content-type","Authorization"]
    })
);

//Connect Database
connectDb()


//Middleware 
app.use(express.json());


//Routes
app.use("/api/auth",authRoutes)
app.use("/api/resume",resumeRoutes)

//Serve uploads folder 
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{
    setHeaders:(res,path)=>{
        res.set("Access-Contro-Allow-Origin","http://localhost:5173")
    }
}))
//Start Server
const PORT=process.env.PORT ||5000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT: ${PORT} `)
})