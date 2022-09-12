/**
 * This will have the logic to route the request to different controllers
 */

 const authController = require("../controllers/auth.controller");


 module.exports = (app)=>{
 
     /**
      * Define the route for sign up
      * 
      * POST /crm/api/v1/auth/signup -> auth controller sign up method
      */
     app.post("/crm/api/v1/auth/signup" , authController.signup);


      /**
      * Define the route for sign in
      * 
      * POST /crm/api/v1/auth/signin -> auth controller sign up method
      */
       app.post("/crm/api/v1/auth/signin" , authController.signin);
 
 }