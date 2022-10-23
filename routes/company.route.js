/**
 * This will have the logic to route the request to different controllers
 */


 const companyController=require("../controllers/company.controller");

 // Requiring The Authentication Middlewear
 const authjwt=require("../middlewares/authjwt");

 // Reuring The Image Uploading Middlewear
 const upload=require("../middlewares/imageupload")
 
 module.exports = (app) => {
 
 
       /**
     * Define the route for creating Project
     * 
     * POST /crm/api/v1/auth/company -> Comapny Creation Method
     * 
     */
      
       app.post("/crm/api/v1/auth/company",authjwt.verifytoken,authjwt.isAdmin,authjwt.isAdminOrOwner,upload.single('profileImage'),companyController.postComanyCreation)
 }