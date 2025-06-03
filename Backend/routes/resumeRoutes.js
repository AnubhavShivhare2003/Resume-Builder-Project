const express=require("express");

const {createResume,getUserResume,getResumeById,updateResume,deleteResume}=require("../controllers/resumeControllers");
const {protect}=require("../middlewares/authMiddleware");
 const {uploadResumeImages}=require("../controllers/uploadImages")

const router=express.Router();


router.post("/",protect,createResume); //Create Resume
router.get("/",protect,getUserResume);  //Get Resume
router.get("/:id",protect,getResumeById); //Get Resume by Id
router.put("/:id",protect,updateResume); //Update Resume
 router.put("/:id/upload-images",protect,uploadResumeImages); 
router.delete("/:id",protect,deleteResume)//Delete Resume

module.exports=router;