/**
 * This will have the logic to route the request to different controllers
 */

// Requiring The Authentication Middlewear
const authjwt = require("../middlewares/authjwt");
const companyController = require("../controllers/company.controller");

const fileConfig = require("../configs/file.config");
const multer = require("multer");
const storeImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileConfig.companyUrl)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})
const upload = multer({ storage: storeImage })


module.exports = (app) => {
  /**
  * Define the route for creating Companies
  * 
  * POST /crm/api/v1/companies -> Comapny controller createComany method
  * 
  */
  app.post("/crm/api/v1/companies", [authjwt.verifytoken, authjwt.isAdmin, upload.single('image')], companyController.createComany)
  
  /**
  * Define the route to get all Companies
  * 
  * GET /crm/api/v1/companies -> Company controller getComanies method
  */
  app.get("/crm/api/v1/companies", [authjwt.verifytoken, authjwt.isAdmin], companyController.getComanies);

}