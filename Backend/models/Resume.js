const mongoose=require("mongoose");
const { applyTimestamps } = require("./User");

const resumeSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}, 
    title:{type:String,required:true},
    thumbnailLink:{type:String},
    template:{theme:String,ColorPalette:[String]},
    profileInfo:{profileViewUrl:String,fillName:String,designation:String,summary:String},
    contactInfo:{email:String,phone:String,location:String,linkedin:String,github:String,website:String},
    workExperience:[{company:String,role:String,startDate:String,endDate:String,description:String}],
    education:[{degree:String,Institution:String,startDate:String,endDate:String}],
    skills:[{name:String,progress:Number}],
    projects:[{title:String,description:String,github:String,liveDemo:String}],
    certification:[{title:String,issuer:String,year:String}],
    language:[{name:String,progress:Number}],
    interests:[String],
    },
{
    timestamps:{createdAt:"createdAt",updatedAt:"updatedAt"}
}
);

const resumeModel=mongoose.model("Resume",resumeSchema);
module.exports=resumeModel;