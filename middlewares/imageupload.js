// Requiring The Multer
const multer=require("multer");
const path=require("path");

// Requiring The Destination From file.config.js ,which is inside configs
const fileConfig=require("../configs/file.config")

// Creating The Storage Engine
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
 cb(null,fileConfig.renderUrl)
    },
    filename:(req,file,cb)=>{

         cb(null,Date.now()+""+file.originalname)
    }
})

 const upload=multer({
   storage:storage,

})

module.exports=upload;