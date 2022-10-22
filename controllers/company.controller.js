//







// Company Creation Post Controller
exports.postComanyCreation=(req,res)=>{
    try {
       // Getting The Values From The Requested Body
       const companyName=req.body.companyName;
       const companyEmail=req.body.companyEmail;
       const totalUsers=req.body.totalUsers;
      
       if(companyName!==undefined && companyEmail!==undefined && totalUsers!==undefined){

        res.send({mag:"New Company Created",status:200})
       }else{
        res.send({mag:"Kindly Enter all the Fields",status:204})
       }


        
    } catch (error) {
        // Sending The Error as a Response
        res.send({msg:"You Do not have the Permission to access this",status:401});
    }
}