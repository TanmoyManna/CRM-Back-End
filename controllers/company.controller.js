







// Company Creation Post Controller
exports.postComanyCreation=(req,res)=>{
    try {
        res.send({mag:"New Company Created",status:200})
    } catch (error) {
        // Sending The Error as a Response
        res.send({msg:"You Do not have the Permission to access this",status:401});
    }
}