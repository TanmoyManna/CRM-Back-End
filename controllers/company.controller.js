// Requiring The Company Model
const companyCollection=require("../models/company.model");








// Company Creation Post Controller
exports.postComanyCreation=async (req,res)=>{
    try {
       // Getting The Values From The Requested Body
       const companyName=req.body.companyName;
       const companyEmail=req.body.companyEmail;
       const totalUsers=req.body.totalUsers;
       const companyCode=Math.floor((Math.random() *10+Date.now()));
       const image=req.file.path;
      
       if(companyName!==undefined && companyEmail!==undefined && totalUsers!==undefined){
        
  // Creating The Object From Company Collection
        const companyObj=new companyCollection({
            companyName:companyName,
            companyEmail:companyEmail,
            totalUsers:totalUsers,
            image:image,
            companyCode:companyCode
        })
        console.log("done");
        // Saving The Data inside Company Model
        const saveCompany=await companyObj.save();
   
        if(saveCompany.companyName===companyName){
            res.send({mag:"New Company Created",status:200})   // In The Case Where Company has been Created
        }else{
            res.send({mag:"Unable to create the Company",status:500})
        }

        
       }else{
        res.send({mag:"Kindly Enter all the Fields",status:204})
       }


        
    } catch (error) {
        // Sending The Error as a Response
        res.send({msg:"You Do not have the Permission to access this",status:401});
    }
}