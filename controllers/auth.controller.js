/**
 * This file will have the logic to signup and signin users
 */
const User = require("../models/user.model");
const Company = require("../models/company.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");

const mailingService = require("../utils/mailingService");


/**
 * Create a function to allow the user to sign
 * POST /crm/api/v1/signup  , router should call the below method
 */
exports.signup = async (req, res) => {
    try {
        const companyToBeUpdated = await Company.findOne({ _id: req.companyId });
        if (companyToBeUpdated.currentUsers >= companyToBeUpdated.totalUsers) {
            return res.status(403).send({ massage: "You have reached the max number of Users, Please contact admin for upgradation", status: 403 });
        }

        const userObj = {
            name: req.body.name,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            password: bcrypt.hashSync(req.body.password, 8),
            userType: req.body.userType,
            company: req.companyId
        }
        if (req.body.userType == 'MANAGER') {
            userObj['responsibility'] = [req.body.responsibleProject];
        }
        const savedUser = await User.create(userObj);

        companyToBeUpdated.currentUsers += 1;
        companyToBeUpdated.employees.push(savedUser._id);
        await companyToBeUpdated.save();

        const sub = 'Welcome to Adosy CRM';
        const body = `Welcome Mr. ${savedUser.name},\n
        To access please go to our website and login using the following credentials:\n
        email: ${savedUser.email} \n
        password: ${password} \n
        Please change your password as soon as you login. And feel free to contact us for any enquire. \n
        `
        mailingService.sendMail(sub, body, savedCompany.companyEmail);

        const postResponse = {
            name: savedUser.name,
            email: savedUser.email,
            mobileNo: savedUser.mobileNo,
            userType: savedUser.userType,
            userStatus: savedUser.userStatus,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        }
        res.status(200).send({ postResponse, massage: "User created successfully", status: 200 });
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
                message: "email passed is not correct"
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

        const resObject = {
            _id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email,
            userType: userSaved.userType,
            userStatus: userSaved.userStatus,
            image: userSaved.image,
            createdAt: userSaved.createdAt,
            accessToken: token
        }
        if (userSaved.userType != 'ADMIN') {
            const companyDetails = await Company.findOne({ _id: userSaved.company });
            resObject['companyDetails'] = companyDetails;
        }

        res.status(200).send(resObject);

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