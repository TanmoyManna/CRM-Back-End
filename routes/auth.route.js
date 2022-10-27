/**
* This will have the logic to route the request to different controllers
*/

// Requiring The Authentication Middlewear
const authjwt = require("../middlewares/authjwt");
const authController = require("../controllers/auth.controller");



module.exports = (app) => {

    /**
     * Define the route for sign up
     * 
     * POST /crm/api/v1/auth/signup -> auth controller sign up method
     */
    app.post("/crm/api/v1/auth/signup", [authjwt.verifytoken, authjwt.isCompanyAdmin], authController.signup);


    /**
    * Define the route for sign in
    * 
    * POST /crm/api/v1/auth/signin -> auth controller login up method
    */
    app.post("/crm/api/v1/auth/login", authController.login);



    /**
    * Define the route for creating the Admin
    * 
    * POST /crm/api/v1/auth/admin -> auth controller login up method
    */
    app.post("/crm/api/v1/auth/admin", authController.makeAdmin);



}