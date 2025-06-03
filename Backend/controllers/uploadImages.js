const fs=require("fs");
const path=require("path");
const resumeModel=require("../models/Resume");
const upload=require("../middlewares/uploadMiddleware");

const uploadResumeImages=async (req,res)=>{
    try {
        upload.fields([{name:'thumbnail'},{name:'profileImage'}])(req,res,async(err)=>{
            if(err){
                return res.status(400).json({message:"File upload failed",error:err.message});
            }
            const resumeId=req.params.id;
            const resume=await Resume.findOne({_id:resumeId,userId:req.user._id});
            if(!resume){
                return res.status(404).json({message:"Resume not found or unauthoried"});
            }
            const uploadsFolder=path.join(__dirname,"..","uploads");
            const baseUrl=`${req.protocol}://set${req.get("host")}`;

            const newThumbnail=req.files.Thumbnail?.[0];;
            const newProfileImage=req.files.profileImage?.[0];

            //If new thumbnail uploaded,delete old one
            // If (newThumbnail && resume.thumbnailLink )
            if(newThumbnail){
                if(resume.thumbnailLink){
                    const oldthumbnail=path.join(uploadsFolder, path.join(resume.thumbnailLink));
                    if(fs.existsSync(oldthumbnail)) fs.unlinkSync(oldthumbnail);
                }
                resume.thumbnailLink=`${baseUrl}/uploads/${newThumbnail.filename}`
            }
     


        //if new profile image uploaded, delete old one
        
        if(newProfileImage){
            if(resume.profileInfo?.profilePreviewUrl){
                const oldProfile=path.join(uploadsFolder,path.basename(resume.profileInfo.profilePreviewUrl))
                if(fs.existsSync(oldProfile))fs.unlinkSync(oldProfile)
            }
        resume.profileInfo.profilePreviewUrl=`${baseUrl}/uploads/${newProfileImage.filename}`;
        }
        await resumeModel.save();
        res.status(200).json({
            message:"Images Upload successfully",
            thumbnailLink:resume.thumbnailLink,
            profilePreviewUrl:resume.profileInfo.profilePreviewUrl
        })
           })   
    } catch (error) {
        console.error("Error uploading images:",error);
        res.status(500).json({message:"Failed to upload image",error:error.message});
    }
}

module.exports={uploadResumeImages}