const User = require("../models/user.model");

// const fileDelete = require("../utils/deletefiles");
const objConverter = require("../utils/objectConverter");
/**
 * This file will have the logic for all operations related to Users
 */

exports.getUsers = async (req, res) => {
    try {
        const allUsers = await User.find({ company: req.companyId });
        let postResponse = objConverter.userResponse(allUsers);
        res.status(200).send({ allUsers: postResponse, message: "Successfully fetched all Companies", status: 200 });
    } catch (err) {
        console.log("Error while fetching Companies ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}

exports.getSingleUser = async (req, res) => {
    try {
        const Users = await User.findOne({ _id: req.params.id });
        console.log(Users);
        // let postResponse = objConverter.userResponse(allUsers);
        res.status(200).send({ data: Users, message: "Successfully fetched all User", status: 200 });
    } catch (err) {
        console.log("Error while fetching Companies ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}


exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).send({
                message: "User with the given id to be updated is not found",
                status: 404
            });
        }
        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email ? req.body.email : user.email;
        user.mobileNo = req.body.mobileNo ? req.body.mobileNo : user.mobileNo;

        // name: req.body.name,
        // email: req.body.email,
        // mobileNo: req.body.mobileNo,        
        // userType: req.body.userType,
        // company: req.companyId
        // password: bcrypt.hashSync(req.body.password, 8),


        const updatedUser = await user.save();
        const postResponse = {
            name: updatedUser.name,
            email: updatedUser.email,
            mobileNo: updatedUser.mobileNo,
            userType: updatedUser.userType,
            userStatus: updatedUser.userStatus,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
        }
        res.status(200).send({ postResponse, massage: "User updated successfully", status: 200 });
    } catch (err) {
        console.log("Error while update the user ", err.message);
        res.status(500).send({
            message: "Internal Server error while updating the record",
            status: 500
        });
    }
}