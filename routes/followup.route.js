/**
 * This will have the logic to route the request to different controllers
 */

// Requiring The Authentication Middlewear
const authjwt = require("../middlewares/authjwt");
const followUpController = require("../controllers/followup.controller");


module.exports = (app) => {
  /**
  * Define the route for creating leads
  * 
  * POST /crm/api/v1/followups -> Follow Up Controller createFollowUp method
  * 
  */
  app.post("/crm/api/v1/followups", [authjwt.verifytoken, authjwt.isCompanyAdminOrUser], followUpController.createFollowUp )
  
  /**
  * Define the route to get all leads
  * 
  * GET /crm/api/v1/followups -> Follow Up Controllerr getFollowUp method
  */
  app.get("/crm/api/v1/followups", [authjwt.verifytoken, authjwt.isCompanyAdminOrUser], followUpController.getFollowUp);

}