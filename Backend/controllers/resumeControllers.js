const fs=require("node:fs");
const path=require("node:path");
const Resume=require("../models/Resume");
const resumeModel = require("../models/Resume");


//@desc Create a new resume
//@route POST /api/resumes
//@access Private
const createResume=async (req,res)=>{
    try {
        const {title}=req.body;

        //default template
        const defaultResumeData={
            profileInfo:{
                profileImg:null,
                profilePreviewUrl:"",
                fullName:"",
                designation:"",
                summary:"",
            },
            contactInfo:{
                email:"",
                phone:"",
                location:"",
                linkedin:"",
                github:"",
                website:"",
            },
            workExperience:[
                {
                    company:"",
                    role:"",
                    startDate:"",
                    endDate:"",
                    description:""
                },
            ],
            education:[
                {
                    degree:"",
                    institution:"",
                    startDate:"",
                    endDate:"",
                },
            ],
            Skills:[{
                name:"",
                progress:""
            },],
            projects:[{
                title:"",
                description:"",
                github:"",
                liveDemo:""
            }],
            certifications:[
                {
                    title:"",
                    issuers:"",
                    year:"",
                }
            ],
            languages:[
                {
                    name:"",
                    progress:0
                },
            ],
            interests:[""]
        }
        
         const newResume=await resumeModel.create({userId:req.user._id,title,...defaultResumeData});
        res.status(201).json(newResume);
    } catch (error) {
      res
      .status(500)
      .json({message:"Failed to create resume",error:error.message});
    }
}


//@desc GET all resumes for logged-in user
//@route GET /api/resumes
//@access Private
const getUserResume=async(req,res)=>{
    try {
        const resumes=await resumeModel.find({userId:req.user._id}).sort({updated:-1});
        res.json(resumes);
    } catch (error) {
         res
      .status(500)
      .json({message:"Failed to get resume",error:error.message});
  
    }
}


//@desc GET single resume by Id
//@route GET /api/resume/:id
//@access Private
const getResumeById=async(req,res)=>{
     try {
       const resume=await resumeModel.findOne({_id:req.params.id,userId:req.user._id})
       if(!resume){
        return status(404).json({message:"Resume not found"})
       }
       res.json(resume)
    } catch (error) {
         res
      .status(500)
      .json({message:"Failed to get resume",error:error.message});
  
    }
};

//@desc update a resume
//@route PUT /api/resumes/:id
//@access Private
const updateResume=async(req,res)=>{
    try {
       const resume=await resumeModel.findOne({_id:req.params.id,userId:req.user._id})
        if(!resume){
        return status(404).json({message:"Resume not found"})
       }
       Object.assign(resume,req.body);
       const savedResume=await resume.save();
       res.json(savedResume);
    } catch (error) {
         res
      .status(500)
      .json({message:"Failed to get resume",error:error.message});
  
    }
};


//@desc  Delete a resume
//@route DELETE /api/resumes/:id
//@access Private
const deleteResume=async(req,res)=>{
    try {
       const resume=await resumeModel.findOne({_id:req.params.id,userId:req.user._id})
        if(!resume){
        return status(404).json({message:"Resume not found"})
       }
       const uploadFolder=path.join(__dirname,'..','uploads');
       const baseUrl=`${req.protocol}://${req.get("host")}`;

       if(resume.thumbnailLink){
        const oldThumbNail=path.join(uploadFolder,path.basename(resume.thumbnailLink))
        if(fs.existsSync(oldThumbNail)){
            fs.unlinkSync(oldThumbNail)
        }
       }

       if(resume.profileInfo?.profilePreviewUrl){
        const oldProfile=path.join(uploadsFolder,path.basename(resume.profileInfo.profilePreviewUrl));
        if(fs.existsSync(oldProfile)){
            fs.unlinkSync(oldProfile)
        }
       }
       const deleted=await resumeModel.findOneAndDelete({_id:req.params.id,userId:req.user._id});
         
       if(!deleted){
        return res.status(404).json({message:"Resume not found or unauthorized"})
       }
       res.json({message:"Resume deleted successfully"});
    } catch (error) {
         res
      .status(500)
      .json({message:"Failed to delete resume",error:error.message});
  
    }
}


module.exports={
    createResume,
    getUserResume,
    getResumeById,
    updateResume,
    deleteResume
}