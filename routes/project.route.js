/**
 * This will have the logic to route the request to different controllers
 */

// Requiring The Authentication Middlewear
const authjwt = require("../middlewares/authjwt");
const projectController = require("../controllers/project.controller");

const fileConfig = require("../configs/file.config");
const multer = require("multer");
const storeImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileConfig.projectUrl)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})
const upload = multer({ storage: storeImage })


module.exports = (app) => {
  /**
  * Define the route for creating Projects for a company
  * 
  * POST /crm/api/v1/projects -> Project Controller createProjects Method
  * 
  */
  app.post("/crm/api/v1/projects", [authjwt.verifytoken, authjwt.isCompanyAdmin, upload.single('image')], projectController.createProjects)
  
  /**
  * Define the route to get all Projects of a particular company
  * 
  * GET crm/api/v1/projects -> pPoject Controller getProjects method
  */
  app.get("/crm/api/v1/projects", [authjwt.verifytoken, authjwt.isCompanyAdmin], projectController.getProjects);

}