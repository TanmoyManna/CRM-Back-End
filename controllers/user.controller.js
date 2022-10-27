const User = require("../models/user.model");

const fileDelete = require("../utils/deletefiles");
const objConverter = require("../utils/objectConverter");
/**
 * This file will have the logic for all operations related to Users
 */

exports.getUsers = async (req, res) => {
    try {
        const allUsers = await User.find({company : req.companyId});
        let postResponse = objConverter.userResponse(allUsers);
        res.status(200).send({ allUsers:postResponse, message: "Successfully fetched all Companies", status: 200 });
    } catch (err) {
        console.log("Error while fetching Companies ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}