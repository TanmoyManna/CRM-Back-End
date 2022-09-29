/**
 * This file will have the logic to signup and signin users
 */
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");



/**
 * Create a function to allow the user to sign
 * POST /crm/api/v1/signup  , router should call the below method
 */
exports.signup = async (req, res) => {
    try {
        const userObj = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            userType: req.body.userType,
        }
        if (userObj.userType == "TELECALLER") {
            userObj.userStatus = "PENDING";
        }
        const savedUser = await User.create(userObj);

        const postResponse = {
            name: savedUser.name,
            email: savedUser.email,
            userType: savedUser.userType,
            userStatus: savedUser.userStatus,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        }
        res.status(201).send(postResponse);
    } catch (err) {
        console.log("Error while registering user ", err.message);
        res.status(500).send({
            message: "Some internal server error"
        })
    }
}


/**
 * Create a function to allow the user to login
 * POST /crm/api/v1/login  , router should call the below method
 */
exports.login = async (req, res) => {
    try {
        const emailFromReq = req.body.email;
        const passwordFromReq = req.body.password;

        const userSaved = await User.findOne({ email: emailFromReq });

        if (!userSaved) {
            return res.status(401).send({
                message: "User id passed is not correct"
            });
        }

        /**
         * Ensure that the password passed is valid
         * 
         * we are getting plain text password
         * in DB we have encrypted password .. bcrypt
         */
        const isValidPassword = bcrypt.compareSync(passwordFromReq, userSaved.password);

        if (!isValidPassword) {
            return res.status(401).send({
                message: "Incorrect password!...."
            });
        }


        if (userSaved.userStatus != "APPROVED") {
            return res.status(403).send({
                message: "User is not approved for the login"
            })
        }

        /**
         * We need to generate the access token ( JWT based )
         */
        const token = jwt.sign(
            { id: userSaved._id },
            authConfig.secret,
            { expiresIn: "2h" }
        )

        res.status(200).send({
            _id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email,
            userType: userSaved.userType,
            userStatus: userSaved.userStatus,
            createdAt: userSaved.createdAt,
            accessToke: token
        });

    } catch (err) {
        console.log("Error while login ", err.message);
        res.status(500).send({
            message: "Internal server error"
        })
    }

}





/**
 * Create a function to create the admin user
 * POST /crm/api/v1/admin  , router should call the below method
 */
exports.makeAdmin = async (req, res) => {
    try {
        const userObj = {
            name: "Admin",
            email: "admin@admin.com",
            password: bcrypt.hashSync("Admin@1234", 8),
            userType: "ADMIN"
        };

        const savedUser = await User.create(userObj);

        const postResponse = {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone,
            userType: savedUser.userType,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt,
        };

        res.status(200).send({ data: postResponse, status: 200 });
    } catch (err) {
        console.log("Error while registering user ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
};