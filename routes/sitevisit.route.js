/**
 * This will have the logic to route the request to different controllers
 */

// Requiring The Authentication Middlewear
const authjwt = require("../middlewares/authjwt");
const siteVisitController = require("../controllers/sitevisit.controller");


module.exports = (app) => {
  /**
  * Define the route for creating leads
  * 
  * POST /crm/api/v1/sitevisits -> Site Visit Controller createSiteVisit method
  * 
  */
  app.post("/crm/api/v1/sitevisits", [authjwt.verifytoken, authjwt.isCompanyAdminOrUser], siteVisitController.createSiteVisit )
  
  /**
  * Define the route to get all leads
  * 
  * GET /crm/api/v1/sitevisits -> Site Visit Controllerr getSiteVisit method
  */
  app.get("/crm/api/v1/sitevisits", [authjwt.verifytoken, authjwt.isCompanyAdminOrUser], siteVisitController.getSiteVisit);

}