/**
 * This will have the logic to route the request to different controllers
 */

// Requiring The Authentication Middlewear
const authjwt = require("../middlewares/authjwt");
const leadController = require("../controllers/lead.controller");


module.exports = (app) => {
  /**
  * Define the route for creating leads
  * 
  * POST /crm/api/v1/leads -> Lead controller createLead method
  * 
  */
  app.post("/crm/api/v1/leads", [authjwt.verifytoken, authjwt.isCompanyAdminOrUser], leadController.createLead )
  
  /**
  * Define the route to get all leads
  * 
  * GET /crm/api/v1/leads -> Lead controller getLeads method
  */
  app.get("/crm/api/v1/leads", [authjwt.verifytoken, authjwt.isCompanyAdminOrUser], leadController.getLeads);

}