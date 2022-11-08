/**
* This will have the logic to route the request to different controllers
*/

// Requiring The Authentication Middlewear
const authjwt = require("../middlewares/authjwt");
const userController = require("../controllers/user.controller");



module.exports = (app) => {

    /**
     * Define the route for getting all users for a particular company
     * 
     * GET /crm/api/v1/users -> auth controller sign up method
     */
    app.get("/crm/api/v1/users", [authjwt.verifytoken, authjwt.isCompanyAdmin], userController.getUsers);

    app.get("/crm/api/v1/users/:id", [authjwt.verifytoken], userController.getSingleUser);

    app.put("/crm/api/v1/users/:id" , [authjwt.verifytoken], userController.updateUser);
}